// src/pages/SurveyTaking.jsx
// ============================================================================
// Public survey-taking component with:
//   - Real API integration via PublicAPI (fetch + submit)
//   - Client-side conditional branching logic (logicRules + defaultNextQuestionId)
//   - Navigation history stack with reset on answer change
//   - Required question validation before navigation
//   - Invited flow (token-based) + Anonymous flow support
//   - Session progress saving
// ============================================================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  MdArrowBack, MdArrowForward, MdCheck, MdStar, MdStarBorder,
} from 'react-icons/md';
import { FaClock, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './SurveyTaking.css';
import PublicAPI from '../api/publicApi';

const SurveyTaking = () => {
  const { surveyId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isInvitedFlow = Boolean(token);
  const navigate = useNavigate();

  // ── Core State ─────────────────────────────────────────────────
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // ── Time Tracking (analytics) ─────────────────────────────
  const [startedAt, setStartedAt] = useState(null);

  // ── Branching Navigation State ─────────────────────────────────
  // navigationStack tracks the ordered list of question indices the user
  // has visited. This enables correct "Previous" behavior through branches.
  const [navigationStack, setNavigationStack] = useState([0]);
  // stackPosition points to the current position within the navigation stack
  const [stackPosition, setStackPosition] = useState(0);

  // ── O(1) Question ID → Index Lookup ────────────────────────────
  const questionIndexMap = useMemo(() => {
    if (!survey?.questions) return {};
    const map = {};
    survey.questions.forEach((q, i) => {
      // Support both _id and id formats
      const qId = (q._id || q.id || '').toString();
      if (qId) map[qId] = i;
    });
    return map;
  }, [survey]);

  // ── Helper: get normalized question ID ─────────────────────────
  const getQuestionId = useCallback((question) => {
    return (question?._id || question?.id || '').toString();
  }, []);

  // ── Fetch Survey from API ──────────────────────────────────────
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);

        const endpoint = token
          ? `/surveys/responses/invited/${token}`
          : `/surveys/public/${surveyId}`;

        const response = await PublicAPI.get(endpoint);
        const surveyInfo = response.data?.survey || response.data?.data || response.data;

        if (!surveyInfo || !surveyInfo.questions?.length) {
          setSurvey(null);
          return;
        }

        setSurvey(surveyInfo);
      } catch (error) {
        console.error("Failed to fetch survey:", error);
        setSurvey(null);
      } finally {
        setLoading(false);
      }
    };

    if (surveyId || token) fetchSurvey();
  }, [surveyId, token]);

  // ── Current Question (derived from navigation stack) ───────────
  const currentQuestionIndex = navigationStack[stackPosition] ?? 0;
  const question = survey?.questions?.[currentQuestionIndex] ?? null;
  const totalQuestions = survey?.questions?.length ?? 0;

  // ── Email regex for client-side validation ─────────────────────
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ── Answer Handling with Navigation Stack Reset ────────────────
  // When user changes an answer, truncate any forward history to prevent
  // stale branching paths from corrupting navigation.
  const handleResponse = useCallback((questionId, answer) => {
    setResponses(prev => {
      const prevAnswer = prev[questionId];
      const answerChanged = JSON.stringify(prevAnswer) !== JSON.stringify(answer);

      if (answerChanged) {
        // Truncate forward navigation history — the path ahead may change
        setNavigationStack(prev => prev.slice(0, stackPosition + 1));
      }

      return { ...prev, [questionId]: answer };
    });

    // Auto-save progress to session storage (include updatedAt for version check)
    sessionStorage.setItem(`survey-${surveyId}`, JSON.stringify({
      surveyId,
      surveyUpdatedAt: survey?.updatedAt || survey?.updatedDate || null,
      responses: { ...responses, [questionId]: answer },
      currentQuestion: stackPosition
    }));
  }, [stackPosition, surveyId, responses, survey]);

  // ── Rule Evaluator (with defensive trimming) ─────────────────
  const evaluateRule = useCallback((rule, answer) => {
    if (!rule || !rule.condition || answer === undefined || answer === null) return false;

    const { operator, value } = rule.condition;
    // Defensive trimming: prevent "Yes " vs "Yes" mismatches
    const answerStr = (Array.isArray(answer) ? answer.join(',') : String(answer)).trim();
    const valueStr = String(value).trim();

    switch (operator) {
      case 'equals':
      case 'is':
        return answerStr === valueStr;
      case 'not_equals':
      case 'is_not':
        return answerStr !== valueStr;
      case 'contains':
        return answerStr.toLowerCase().includes(valueStr.toLowerCase());
      case 'greater_than':
        return Number(answer) > Number(value);
      case 'less_than':
        return Number(answer) < Number(value);
      case 'in':
        return Array.isArray(answer) && answer.includes(value);
      default:
        return false;
    }
  }, []);

  // ── Branching Logic: Determine Next Question ───────────────────
  const resolveNextQuestionIndex = useCallback(() => {
    if (!question || !survey) return currentQuestionIndex + 1;

    const qId = getQuestionId(question);
    const currentAnswer = responses[qId];
    const rules = question.logicRules || [];

    // 1. Evaluate logic rules in order
    for (const rule of rules) {
      if (evaluateRule(rule, currentAnswer)) {
        const targetId = (rule.targetQuestionId || '').toString();
        if (targetId && questionIndexMap[targetId] !== undefined) {
          return questionIndexMap[targetId];
        }
      }
    }

    // 2. Check defaultNextQuestionId
    if (question.defaultNextQuestionId) {
      const defaultIdx = questionIndexMap[question.defaultNextQuestionId.toString()];
      if (defaultIdx !== undefined) return defaultIdx;
    }

    // 3. Fall back to sequential order
    return currentQuestionIndex + 1;
  }, [question, survey, responses, currentQuestionIndex, questionIndexMap, getQuestionId, evaluateRule]);

  // ── Required Question Validation ───────────────────────────────
  const isCurrentQuestionAnswered = useCallback(() => {
    if (!question) return false;
    const qId = getQuestionId(question);
    const answer = responses[qId];
    if (answer === undefined || answer === null || answer === '') return false;
    if (Array.isArray(answer) && answer.length === 0) return false;

    // Email-type: validate format beyond just "non-empty"
    if (question.type === 'email' && typeof answer === 'string') {
      return EMAIL_REGEX.test(answer.trim());
    }

    return true;
  }, [question, responses, getQuestionId]);

  const canProceed = useCallback(() => {
    if (!question) return false;
    return !question.required || isCurrentQuestionAnswered();
  }, [question, isCurrentQuestionAnswered]);

  // ── Navigation: Next ───────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (!canProceed()) {
      Swal.fire('Required', 'Please answer this question before continuing.', 'warning');
      return;
    }

    const nextIdx = resolveNextQuestionIndex();

    // Safety guard: prevent infinite loops (e.g. Q1→Q2→Q1 misconfiguration)
    if (navigationStack.length > totalQuestions) {
      const sequential = currentQuestionIndex + 1;
      if (sequential < totalQuestions) {
        setNavigationStack(prev => [...prev.slice(0, stackPosition + 1), sequential]);
        setStackPosition(prev => prev + 1);
      } else {
        // We're at the end — submit
        handleSubmit();
      }
      return;
    }

    if (nextIdx >= 0 && nextIdx < totalQuestions) {
      setNavigationStack(prev => [...prev.slice(0, stackPosition + 1), nextIdx]);
      setStackPosition(prev => prev + 1);
    } else {
      // Past the end — submit
      handleSubmit();
    }
  }, [canProceed, resolveNextQuestionIndex, stackPosition, currentQuestionIndex, totalQuestions, navigationStack.length]);

  // ── Navigation: Previous ───────────────────────────────────────
  const handlePrevious = useCallback(() => {
    if (stackPosition > 0) {
      setStackPosition(prev => prev - 1);
    }
  }, [stackPosition]);

  // ── Is this the last question? ─────────────────────────────────
  const isLastQuestion = useMemo(() => {
    if (!question || !survey) return false;
    const nextIdx = resolveNextQuestionIndex();
    return nextIdx >= totalQuestions;
  }, [question, survey, resolveNextQuestionIndex, totalQuestions]);

  // ── Submit Survey ──────────────────────────────────────────────
  const handleSubmit = async () => {
    // Prevent double submission on spam-click
    if (submitting) return;

    if (question?.required && !isCurrentQuestionAnswered()) {
      Swal.fire('Required', 'Please answer this question before submitting.', 'warning');
      return;
    }

    try {
      setSubmitting(true);

      const formattedAnswers = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const responseData = {
        answers: formattedAnswers,
        isAnonymous: !token,
      };

      // Attach time tracking analytics
      const submittedAt = new Date().toISOString();
      if (startedAt) {
        responseData.startedAt = startedAt;
        responseData.submittedAt = submittedAt;
        responseData.totalDurationMs = new Date(submittedAt) - new Date(startedAt);
      }

      const endpoint = token
        ? `/surveys/responses/invited/${token}`
        : `/surveys/responses/anonymous/${surveyId}`;

      await PublicAPI.post(endpoint, responseData);

      // Clear saved progress and mark as completed
      // Use token for invited flows (surveyId is 'respond' for all token URLs)
      const completionKey = token || surveyId;
      sessionStorage.removeItem(`survey-${surveyId}`);
      sessionStorage.setItem(`survey-${completionKey}-completed`, 'true');

      await Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: survey?.thankYouPage?.message || 'Your response has been submitted successfully.',
        confirmButtonText: 'Continue',
      });

      // Redirect if needed
      if (survey?.thankYouPage?.redirectUrl) {
        window.location.href = survey.thankYouPage.redirectUrl;
      } else {
        navigate('/surveys');
      }
    } catch (err) {
      console.error('Submission error:', err);
      const errorMsg = err.response?.data?.message || 'There was a problem submitting your response. Please try again.';
      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMsg,
        confirmButtonText: 'OK',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Progress ───────────────────────────────────────────────────
  const progress = totalQuestions > 0 ? ((stackPosition + 1) / totalQuestions) * 100 : 0;

  // ── Restore saved progress (with version mismatch check) ──────
  useEffect(() => {
    if (!survey) return; // Wait until survey is loaded to compare updatedAt

    const savedProgress = sessionStorage.getItem(`survey-${surveyId}`);
    if (savedProgress) {
      try {
        const prog = JSON.parse(savedProgress);

        // Version mismatch — survey was updated after respondent started
        const surveyTimestamp = survey.updatedAt || survey.updatedDate || null;
        if (prog.surveyUpdatedAt && surveyTimestamp && prog.surveyUpdatedAt !== surveyTimestamp) {
          sessionStorage.removeItem(`survey-${surveyId}`);
          return; // Discard stale progress silently
        }

        if (prog.surveyId === surveyId) {
          Swal.fire({
            title: 'Continue Survey?',
            text: 'We found your previous progress. Would you like to continue where you left off?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Continue',
            cancelButtonText: 'No, Start Over'
          }).then((result) => {
            if (result.isConfirmed) {
              setResponses(prog.responses || {});
              setStackPosition(prog.currentQuestion || 0);
            }
            sessionStorage.removeItem(`survey-${surveyId}`);
          });
        }
      } catch (e) {
        sessionStorage.removeItem(`survey-${surveyId}`);
      }
    }
  }, [surveyId, survey]);

  // ── Check completion flag on mount ───────────────────────────
  useEffect(() => {
    // Use token for invited flows (surveyId is 'respond' for all token URLs)
    const completionKey = token || surveyId;
    if (sessionStorage.getItem(`survey-${completionKey}-completed`)) {
      setAlreadySubmitted(true);
    }
  }, [surveyId, token]);

  // ── Render: Question Input ─────────────────────────────────────
  const renderQuestion = (q) => {
    if (!q) return null;
    const qId = getQuestionId(q);
    const currentAnswer = responses[qId];

    switch (q.type) {
      // ── Rating (star-based) ──
      case 'rating':
        return (
          <div className="rating-options flex gap-2 justify-content-center my-4">
            {(q.options?.length > 0 ? q.options : [1, 2, 3, 4, 5]).map((rating) => (
              <button
                key={rating}
                type="button"
                className="btn p-0 border-0 bg-transparent"
                onClick={() => handleResponse(qId, rating)}
              >
                {currentAnswer >= rating ? (
                  <MdStar size={32} className="text-warning" />
                ) : (
                  <MdStarBorder size={32} className="text-muted" />
                )}
              </button>
            ))}
          </div>
        );

      // ── NPS ──
      case 'nps':
        return (
          <div className="nps-scale">
            <div className="flex justify-content-between align-items-center mb-3">
              <small className="text-muted">Not likely</small>
              <small className="text-muted">Extremely likely</small>
            </div>
            <div className="flex justify-content-center gap-2 flex-wrap">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  type="button"
                  className={`btn btn-sm ${currentAnswer === score ? 'btn-primary' : 'btn-outline-secondary'}`}
                  style={currentAnswer === score ? { backgroundColor: survey.themeColor, borderColor: survey.themeColor } : { minWidth: '40px' }}
                  onClick={() => handleResponse(qId, score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        );

      // ── Likert Scale ──
      case 'likert':
        return (
          <div className="question-options">
            {(q.options || ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']).map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`q${qId}_${index}`}
                  name={`question_${qId}`}
                  checked={currentAnswer === option}
                  onChange={() => handleResponse(qId, option)}
                />
                <label className="form-check-label" htmlFor={`q${qId}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      // ── Scale ──
      case 'scale':
        return (
          <div className="flex justify-content-center gap-2 flex-wrap my-4">
            {(q.options?.length > 0 ? q.options : [1, 2, 3, 4, 5]).map((val) => (
              <button
                key={val}
                type="button"
                className={`btn btn-sm ${currentAnswer === val ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={currentAnswer === val ? { backgroundColor: survey.themeColor, borderColor: survey.themeColor } : {}}
                onClick={() => handleResponse(qId, val)}
              >
                {val}
              </button>
            ))}
          </div>
        );

      // ── Single Choice (radio) ──
      case 'radio':
      case 'single_choice':
        return (
          <div className="question-options">
            {(q.options || []).map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`q${qId}_${index}`}
                  name={`question_${qId}`}
                  checked={currentAnswer === option}
                  onChange={() => handleResponse(qId, option)}
                />
                <label className="form-check-label" htmlFor={`q${qId}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      // ── Multiple Choice (checkbox) ──
      case 'checkbox':
      case 'multiple_choice':
        return (
          <div className="question-options">
            {(q.options || []).map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`q${qId}_${index}`}
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                  onChange={(e) => {
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (e.target.checked) {
                      handleResponse(qId, [...current, option]);
                    } else {
                      handleResponse(qId, current.filter(item => item !== option));
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={`q${qId}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      // ── Yes/No ──
      case 'yesno':
        return (
          <div className="flex justify-content-center gap-3 my-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`btn btn-lg ${currentAnswer === option ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={currentAnswer === option ? { backgroundColor: survey.themeColor, borderColor: survey.themeColor } : {}}
                onClick={() => handleResponse(qId, option)}
              >
                {option === 'Yes' ? '✅' : '❌'} {option}
              </button>
            ))}
          </div>
        );

      // ── Dropdown / Select ──
      case 'select':
        return (
          <div className="question-options">
            <select
              className="form-select"
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            >
              <option value="">Select an option...</option>
              {(q.options || []).map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      // ── Short Text ──
      case 'text':
      case 'text_short':
        return (
          <div className="question-options">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your response..."
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );

      // ── Long Text / Textarea ──
      case 'textarea':
      case 'text_long':
        return (
          <div className="question-options">
            <textarea
              className="form-control"
              rows={4}
              placeholder="Enter your detailed response..."
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );

      // ── Numeric ──
      case 'numeric':
        return (
          <div className="question-options">
            <input
              type="number"
              className="form-control"
              placeholder="Enter a number..."
              value={currentAnswer ?? ''}
              onChange={(e) => handleResponse(qId, e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        );

      // ── Email ──
      case 'email':
        return (
          <div className="question-options">
            <input
              type="email"
              className={`form-control ${currentAnswer && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentAnswer.trim()) ? 'is-invalid' : ''}`}
              placeholder="name@example.com"
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
            {currentAnswer && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentAnswer.trim()) && (
              <div className="invalid-feedback">Please enter a valid email address</div>
            )}
          </div>
        );

      // ── Date ──
      case 'date':
        return (
          <div className="question-options">
            <input
              type="date"
              className="form-control"
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );

      // ── Time ──
      case 'time':
        return (
          <div className="question-options">
            <input
              type="time"
              className="form-control"
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );

      // ── DateTime ──
      case 'datetime':
        return (
          <div className="question-options">
            <input
              type="datetime-local"
              className="form-control"
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );

      // ── Default fallback ──
      default:
        return (
          <div className="question-options">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your response..."
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(qId, e.target.value)}
            />
          </div>
        );
    }
  };

  // ════════════════════════════════════════════════════════════════
  // RENDER STATES
  // ════════════════════════════════════════════════════════════════

  // Loading
  if (loading) {
    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading survey...</p>
          </div>
        </div>
      </div>
    );
  }

  // Survey not found
  if (!survey) {
    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="text-center">
            <h3>Survey Not Found</h3>
            <p className="text-muted">The survey you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary" onClick={() => navigate('/surveys')}>
              Browse Other Surveys
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Already submitted — prevent back-button resubmission
  if (alreadySubmitted) {
    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="text-center">
            <MdCheck size={64} className="text-success mb-3" />
            <h2>Already Submitted</h2>
            <p className="text-muted">You have already submitted your response for this survey.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/surveys')}>
              Browse Other Surveys
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Start Screen (before starting survey)
  if (!started) {
    const themeColor = survey.resolvedTheme?.primaryColor || survey.themeColor || '#007bff';
    const logoUrl = survey.resolvedTheme?.logoUrl || '';

    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-sm">
                <div
                  className="card-header text-white text-center"
                  style={{ backgroundColor: themeColor }}
                >
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="Company Logo"
                      style={{ maxHeight: '60px', marginBottom: '12px', borderRadius: '4px' }}
                    />
                  )}
                  <h3 className="mb-0">{survey.title}</h3>
                </div>
                <div className="card-body text-center">
                  <p className="card-text mb-4">{survey.description}</p>

                  <div className="survey-info mb-4">
                    <div className="flex justify-content-center gap-4 text-muted">
                      {survey.estimatedTime && (
                        <div className="flex align-items-center">
                          <FaClock className="me-2" />
                          <span>{survey.estimatedTime}</span>
                        </div>
                      )}
                      <div className="flex align-items-center">
                        <FaUsers className="me-2" />
                        <span>{survey.questions.length} questions</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-content-center">
                    <button
                      className="btn btn-primary btn-lg"
                      style={{ backgroundColor: themeColor, borderColor: themeColor }}
                      onClick={() => { setStarted(true); setStartedAt(new Date().toISOString()); }}
                    >
                      Start Survey
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-lg"
                      onClick={() => navigate('/surveys')}
                    >
                      <MdArrowBack className="me-2" />
                      Back to Surveys
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No question available
  if (!question) {
    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="text-center">
            <MdCheck size={64} className="text-success mb-3" />
            <h2>Survey Complete</h2>
            <p className="text-muted">Thank you for completing this survey.</p>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // MAIN RENDER — Survey Question UI
  // ════════════════════════════════════════════════════════════════

  return (
    <div className="survey-taking-page">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Progress Bar */}
            <div className="progress mb-4" style={{ height: '8px' }}>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: survey.resolvedTheme?.primaryColor || survey.themeColor || '#007bff'
                }}
              />
            </div>

            {/* Question Counter */}
            <div className="text-center mb-4">
              <span className="badge bg-secondary">
                Question {stackPosition + 1} of {totalQuestions}
              </span>
            </div>

            {/* Question Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  {question.questionText || question.text || question.title}
                  {question.required && <span className="text-danger ms-1">*</span>}
                </h4>

                {question.description && (
                  <p className="text-muted mb-3">{question.description}</p>
                )}

                {renderQuestion(question)}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={handlePrevious}
                disabled={stackPosition === 0}
              >
                <MdArrowBack className="me-2" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitting}
                >
                  {submitting ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MdCheck className="me-2" />
                      Submit
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={submitting}
                  style={{ backgroundColor: survey.resolvedTheme?.primaryColor || survey.themeColor || '#007bff', borderColor: survey.resolvedTheme?.primaryColor || survey.themeColor || '#007bff' }}
                >
                  Next
                  <MdArrowForward className="ms-2" />
                </button>
              )}
            </div>

            {/* Required field hint */}
            {question.required && !isCurrentQuestionAnswered() && (
              <div className="text-center mt-3">
                <small className="text-danger">This question is required</small>
              </div>
            )}

            <div className="text-center mt-4">
              <small className="text-muted">
                Powered by RatePro • {isInvitedFlow ? 'Invited Survey' : 'Anonymous Survey'}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTaking;