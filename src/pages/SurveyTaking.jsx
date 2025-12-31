import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  MdArrowBack, MdArrowForward, MdCheck, MdStar, MdStarBorder,
  // MdRadioButtonChecked, MdRadioButtonUnchecked, MdCheckBox,
  // MdCheckBoxOutlineBlank, MdThumbUp, MdThumbDown
} from 'react-icons/md';
import { FaClock, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './SurveyTaking.css';
import PublicAPI from '../api/publicApi';

// ye shoukat bhai kuch kaam b krty hen, ya aese he bethy rehty hen, Sat ko unko code dia tha error solve krny k lye, ab tk kuch ni kia :D

const SurveyTaking = () => {
  const { surveyId } = useParams();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // 🔥 THIS WAS MISSING
  const isInvitedFlow = Boolean(token);
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  // ADD THESE STATES (top me – existing states ke neeche)
  const [visibleQuestions, setVisibleQuestions] = useState([]); // Real-time visible questions
  const [hiddenQuestions, setHiddenQuestions] = useState(new Set());   // ✅ Initialize as Set, not array
  const [redirectTo, setRedirectTo] = useState(null);           // For redirect action
  // const [prefillValues, setPrefillValues] = useState({});       // Prefill from logic
  const [surveyEnded, setSurveyEnded] = useState(false);        // End survey early



  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSurvey(token);
  }, [surveyId, token]);

  // const fetchSurvey = async (token = null) => {
  //   try {
  //     setLoading(true);

  //     // Decide endpoint dynamically
  //     const endpoint = token
  //       ? `/surveys/responses/invited/${token}`      // invited survey (READ)
  //       : `/surveys/public/${surveyId}`; // Public/anonymous survey

  //     const response = await PublicAPI.get(endpoint);

  //     // Normalize response data
  //     const surveyInfo =
  //       response.data?.survey ||
  //       response.data?.data ||
  //       response.data;

  //     setSurvey(surveyInfo);

  //     console.log(`✅ Fetched ${token ? "invited" : "public"} survey:`, surveyInfo);

  //   } catch (error) {
  //     console.error("❌ Failed to fetch survey:", error.message);
  //     console.log("🔄 Using mock survey data");

  //     // Optionally set mock survey here
  //     // setSurvey(mockSurveyData);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchSurvey = async (token = null) => {
    console.log("🧪 DEBUG fetchSurvey");
    console.log("surveyId:", surveyId);
    console.log("token:", token);
    console.log("isInvitedFlow:", Boolean(token));

    try {
      setLoading(true);

      const endpoint = token
        ? `/surveys/responses/invited/${token}`
        : `/surveys/public/${surveyId}`;

      console.log("➡️ API Endpoint:", endpoint);

      const response = await PublicAPI.get(endpoint);

      const surveyInfo =
        response.data?.survey ||
        response.data?.data ||
        response.data;

      setSurvey(surveyInfo);

      console.log("✅ Survey loaded:", surveyInfo);
    } catch (error) {
      console.error("❌ Failed to fetch survey:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (questionId, answer) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // ADD AFTER handleResponse function
  useEffect(() => {
    if (!survey || !survey.logicRules || survey.logicRules.length === 0) {
      // No logic rules → show all questions
      setVisibleQuestions(survey?.questions || []);
      return;
    }

    const evaluateLogic = async () => {
      try {
        const response = await axios.post(`/api/surveys/${surveyId}/evaluate`, {
          answers: responses
        });

        const { show, hide, redirect, disableNext, prefill, endSurvey } = response.data;

        // Apply show/hide
        setHiddenQuestions(new Set(hide || []));

        // Apply prefill
        if (prefill) {
          Object.entries(prefill).forEach(([qId, value]) => {
            if (!responses[qId]) {
              handleResponse(qId, value);
            }
          });
        }

        // Handle redirect
        if (redirect) {
          const questionIndex = survey.questions.findIndex(q => q.id === redirect || q._id === redirect);
          if (questionIndex !== -1) {
            setCurrentQuestion(questionIndex);
          }
        }

        // Handle end survey
        if (endSurvey) {
          setSurveyEnded(true);
          handleSubmit(token);
        }

      } catch (err) {
        console.log("Logic evaluation skipped (optional)", err.message);
      }
    };

    evaluateLogic();
  }, [responses, currentQuestion]);


  const handleNext = () => {
    const currentQId = question._id || question.id;

    if (question.required && !responses[currentQId]) {
      Swal.fire('Required', 'Please answer this question', 'warning');
      return;
    }

    if (currentQuestion < visibleQuestionsList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async (token = null) => {
    try {
      setSubmitting(true);

      // Prepare payload
      const responseData = {
        answers: Object.entries(responses).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
        isAnonymous: !token, // token exists → invited, else anonymous
      };

      console.log(`📤 Submitting ${token ? "invited" : "anonymous"} survey:`, responseData);

      // Determine endpoint
      const endpoint = token
        ? `/surveys/responses/invited/${token}`
        : `/surveys/responses/anonymous/${surveyId}`;

      const response = await PublicAPI.post(endpoint, responseData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      console.log("✅ Submission successful:", response.data);

      // Clear local progress
      sessionStorage.removeItem("surveyProgress");

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: survey.thankYouPage?.message || "Your response has been submitted successfully.",
        confirmButtonText: "Continue",
      });

      // Redirect if needed
      if (survey.thankYouPage?.redirectUrl) {
        window.location.href = survey.thankYouPage.redirectUrl;
      } else {
        navigate("/surveys");
      }
    } catch (err) {
      console.error("❌ Submission error:", err);

      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was a problem submitting your response. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ ADD: renderQuestion function - this was missing!
  const renderQuestion = (question) => {
    const currentAnswer = responses[question._id];

    const questionId = question._id || question.id;

    // HIDE QUESTION IF IN hiddenQuestions SET
    if (hiddenQuestions.has(questionId)) {
      return null;
    }

    switch (question.type) {
      case 'likert':
        return (
          <div className="question-options">
            {question.options.map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`q${question._id}_${index}`}
                  name={`question_${question._id}`}
                  checked={currentAnswer === option}
                  onChange={() => handleResponse(question._id, option)}
                />
                <label className="form-check-label" htmlFor={`q${question._id}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="rating-options d-flex gap-2 justify-content-center my-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className="btn p-0 border-0 bg-transparent"
                onClick={() => handleResponse(question._id, rating)}
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

      case 'checkbox':
        return (
          <div className="question-options">
            {question.options.map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`q${question._id}_${index}`}
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                  onChange={(e) => {
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (e.target.checked) {
                      handleResponse(question._id, [...current, option]);
                    } else {
                      handleResponse(question._id, current.filter(item => item !== option));
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={`q${question._id}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'nps':
        return (
          <div className="nps-scale">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="text-muted">Not likely</small>
              <small className="text-muted">Extremely likely</small>
            </div>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  type="button"
                  className={`btn btn-sm ${currentAnswer === score ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                  style={{ minWidth: '40px' }}
                  onClick={() => handleResponse(question._id, score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        );

      case 'text':
      case 'textarea':
        return (
          <div className="question-options">
            <textarea
              className="form-control"
              rows={question.type === 'textarea' ? 4 : 2}
              placeholder="Enter your response..."
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(question._id, e.target.value)}
            />
          </div>
        );

      default:
        return (
          <div className="question-options">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your response..."
              value={currentAnswer || ''}
              onChange={(e) => handleResponse(question._id, e.target.value)}
            />
          </div>
        );
    }
  };

  const handleStartSurvey = () => {
    setStarted(true);
  };

  // Check for saved progress when component loads
  useEffect(() => {
    const savedProgress = sessionStorage.getItem('surveyProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress.surveyId === surveyId) {
        Swal.fire({
          title: 'Continue Survey?',
          text: 'We found your previous progress. Would you like to continue where you left off?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, Continue',
          cancelButtonText: 'No, Start Over'
        }).then((result) => {
          if (result.isConfirmed) {
            setResponses(progress.responses || {});
            setCurrentQuestion(progress.currentQuestion || 0);
          }
          // Clear the saved progress regardless of choice
          sessionStorage.removeItem('surveyProgress');
        });
      }
    }
  }, [surveyId]);

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

  if (!started) {
    return (
      <div className="survey-taking-page">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-sm">
                <div
                  className="card-header text-white text-center"
                  style={{ backgroundColor: survey.themeColor }}
                >
                  <h3 className="mb-0">{survey.title}</h3>
                </div>
                <div className="card-body text-center">
                  <p className="card-text mb-4">{survey.description}</p>

                  <div className="survey-info mb-4">
                    <div className="d-flex justify-content-center gap-4 text-muted">
                      <div className="d-flex align-items-center">
                        <FaClock className="me-2" />
                        <span>{survey.estimatedTime}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaUsers className="me-2" />
                        <span>{survey.questions.length} questions</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleStartSurvey}
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

  const visibleQuestionsList = survey.questions.filter(q => {
    const qId = q._id || q.id;
    return !hiddenQuestions.has(qId);
  });

  const question = visibleQuestionsList[currentQuestion];
  const totalVisible = visibleQuestionsList.length;
  const progress = totalVisible > 0 ? ((currentQuestion + 1) / totalVisible) * 100 : 0;

  if (surveyEnded) {
    return (
      <div className="text-center py-5">
        <MdCheck size={64} className="text-success mb-3" />
        <h2>Thank You!</h2>
        <p>Your survey has been completed based on your responses.</p>
      </div>
    );
  }

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
                  width: `${progress}%`,
                  backgroundColor: survey.themeColor
                }}
              />
            </div>

            {/* Question Counter */}
            <div className="text-center mb-4">
              <span className="badge bg-secondary">
                Question {currentQuestion + 1} of {survey.questions.length}
              </span>
            </div>

            {/* Question Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  {question.questionText}
                  {question.required && <span className="text-danger ms-1">*</span>}
                </h4>

                {renderQuestion(question)}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <MdArrowBack className="me-2" />
                Previous
              </button>

              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={submitting}
                style={{ backgroundColor: survey.themeColor, borderColor: survey.themeColor }}
              >
                {submitting ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status" />
                    Submitting...
                  </>
                ) : currentQuestion === survey.questions.length - 1 ? (
                  <>
                    <MdCheck className="me-2" />
                    Submit
                  </>
                ) : (
                  <>
                    Next
                    <MdArrowForward className="ms-2" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <small className="text-muted">
                Powered by RatePro • Anonymous Survey
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTaking;