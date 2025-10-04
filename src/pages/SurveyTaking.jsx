import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MdArrowBack, MdArrowForward, MdCheck, MdStar, MdStarBorder,
  MdRadioButtonChecked, MdRadioButtonUnchecked, MdCheckBox, 
  MdCheckBoxOutlineBlank, MdThumbUp, MdThumbDown 
} from 'react-icons/md';
import { FaClock, FaUsers, FaLanguage } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './SurveyTaking.css';
import './SurveyTaking.css';

const SurveyTaking = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  
  const [survey, setSurvey] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetchSurvey();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  const fetchSurvey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/surveys/public/${surveyId}`);
      
      if (response.data && response.data.survey) {
        setSurvey(response.data.survey);
      } else {
        // Fallback mock survey for demo
        setSurvey(getMockSurvey(surveyId));
      }
    } catch (err) {
      console.error('Error fetching survey:', err);
      setSurvey(getMockSurvey(surveyId));
      
    } finally {
      setLoading(false);
    }
  };

  // Mock survey data for demonstration
  const getMockSurvey = (id) => {
    const mockSurveys = {
      '1': {
        _id: '1',
        title: 'Hotel Guest Experience Survey',
        description: 'Share your thoughts about your recent stay with us. Help us improve our services and facilities.',
        themeColor: '#13c5d0',
        questions: [
          {
            _id: 'q1',
            questionText: 'How satisfied were you with your overall stay experience?',
            type: 'likert',
            required: true,
            options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
          },
          {
            _id: 'q2',
            questionText: 'Rate the cleanliness and comfort of your room',
            type: 'rating',
            required: true,
            options: []
          },
          {
            _id: 'q3',
            questionText: 'Which hotel facilities did you use during your stay?',
            type: 'checkbox',
            required: false,
            options: ['Restaurant', 'Spa & Wellness', 'Swimming Pool', 'Fitness Center', 'Room Service', 'Business Center']
          },
          {
            _id: 'q4',
            questionText: 'How likely are you to recommend us to friends and family?',
            type: 'nps',
            required: true,
            options: []
          },
          {
            _id: 'q5',
            questionText: 'What suggestions do you have for improving our services?',
            type: 'textarea',
            required: false,
            options: []
          }
        ],
        estimatedTime: '5-7 minutes',
        thankYouPage: {
          message: 'Thank you for your valuable feedback! Your responses help us improve our services.',
          redirectUrl: ''
        }
      }
    };
    
    return mockSurveys[id] || mockSurveys['1'];
  };

  const handleResponse = (questionId, answer) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    const question = survey.questions[currentQuestion];
    if (question.required && !responses[question._id]) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Question',
        text: 'Please answer this question before continuing.'
      });
      return;
    }
    
    if (currentQuestion < survey.questions.length - 1) {
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

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Prepare response data
      const responseData = {
        survey: surveyId,
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          question: questionId,
          answer: answer
        }))
      };

      // Submit to backend
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/surveys/public/submit`, responseData);
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: survey.thankYouPage?.message || 'Your response has been submitted successfully.',
        confirmButtonText: 'Continue'
      });
      
      // Redirect
      if (survey.thankYouPage?.redirectUrl) {
        window.location.href = survey.thankYouPage.redirectUrl;
      } else {
        navigate('/surveys');
      }
      
    } catch (err) {
      console.error('Error submitting response:', err);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your response. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const currentAnswer = responses[question._id];

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

      case 'radio':
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
                  className={`btn btn-sm ${
                    currentAnswer === score ? 'btn-primary' : 'btn-outline-secondary'
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

      case 'yesno':
        return (
          <div className="question-options d-flex justify-content-center gap-4">
            <button
              type="button"
              className={`btn ${currentAnswer === 'yes' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleResponse(question._id, 'yes')}
            >
              <MdThumbUp className="me-2" />
              Yes
            </button>
            <button
              type="button"
              className={`btn ${currentAnswer === 'no' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => handleResponse(question._id, 'no')}
            >
              <MdThumbDown className="me-2" />
              No
            </button>
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
                      onClick={() => setStarted(true)}
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

  const question = survey.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;

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

            {/* Survey Footer */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Powered by RatePro • Your responses are secure and confidential
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTaking;