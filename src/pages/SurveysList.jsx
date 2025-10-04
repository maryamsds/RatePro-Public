import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MdStar, MdStarBorder, MdAccessTime, MdPeople, MdLanguage, 
  MdSearch, MdFilterList, MdSort, MdViewList, MdViewModule,
  MdCategory, MdBusiness, MdSchool, MdLocalHospital, MdRestaurant
} from 'react-icons/md';
import { FaUsers, FaClock, FaEye, FaChartLine } from 'react-icons/fa';
import './SurveysList.css';

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  // Sample categories with icons
  const categories = [
    { value: 'all', label: 'All Categories', icon: MdCategory, count: 0 },
    { value: 'hospitality', label: 'Hospitality & Tourism', icon: MdRestaurant, count: 0 },
    { value: 'corporate', label: 'Corporate & HR', icon: MdBusiness, count: 0 },
    { value: 'education', label: 'Education', icon: MdSchool, count: 0 },
    { value: 'healthcare', label: 'Healthcare', icon: MdLocalHospital, count: 0 },
    { value: 'retail', label: 'Retail & E-commerce', icon: MdBusiness, count: 0 }
  ];

  useEffect(() => {
    fetchPublicSurveys();
  }, []);

  const fetchPublicSurveys = async () => {
    try {
      setLoading(true);
      // Call backend API to get published surveys
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/surveys/public/all`);
      
      if (response.data && Array.isArray(response.data)) {
        setSurveys(response.data);
      } else {
        // Fallback mock data for demo
        setSurveys(mockSurveys);
      }
    } catch (err) {
      console.error('Error fetching surveys:', err);
      // Use mock data as fallback
      setSurveys(mockSurveys);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockSurveys = [
    {
      _id: '1',
      title: 'Hotel Guest Experience Survey',
      description: 'Share your thoughts about your recent stay with us. Help us improve our services and facilities.',
      category: 'hospitality',
      themeColor: '#13c5d0',
      questions: Array(8).fill({}),
      responses: 156,
      averageRating: 4.2,
      estimatedTime: '5-7 minutes',
      language: ['English', 'Arabic'],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      _id: '2', 
      title: 'Employee Satisfaction Survey 2025',
      description: 'Help us create a better workplace. Your anonymous feedback shapes our policies and culture.',
      category: 'corporate',
      themeColor: '#13c5d0',
      questions: Array(12).fill({}),
      responses: 89,
      averageRating: 3.8,
      estimatedTime: '8-10 minutes',
      language: ['English'],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      _id: '3',
      title: 'Course Feedback - Digital Marketing',
      description: 'Rate your learning experience and help us enhance our training programs.',
      category: 'education',
      themeColor: '#13c5d0',
      questions: Array(6).fill({}),
      responses: 234,
      averageRating: 4.6,
      estimatedTime: '3-5 minutes', 
      language: ['English', 'Arabic'],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      _id: '4',
      title: 'Patient Care Quality Survey',
      description: 'Your feedback helps us improve healthcare services and patient experience.',
      category: 'healthcare',
      themeColor: '#13c5d0',
      questions: Array(10).fill({}),
      responses: 67,
      averageRating: 4.1,
      estimatedTime: '6-8 minutes',
      language: ['English'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      _id: '5',
      title: 'Shopping Experience Feedback',
      description: 'Help us improve your online shopping experience with your valuable feedback.',
      category: 'retail',
      themeColor: '#13c5d0',
      questions: Array(7).fill({}),
      responses: 312,
      averageRating: 4.3,
      estimatedTime: '4-6 minutes',
      language: ['English', 'Arabic'],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'active'
    }
  ];

  // Filter surveys based on search and category
  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || survey.category === selectedCategory;
    return matchesSearch && matchesCategory && survey.status === 'active';
  });

  // Sort surveys
  const sortedSurveys = [...filteredSurveys].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular':
        return (b.responses || 0) - (a.responses || 0);
      case 'rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });

  const handleTakeSurvey = (surveyId) => {
    navigate(`/survey/${surveyId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-warning" />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-muted" />);
      }
    }
    return stars;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : MdCategory;
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'General';
  };

  if (loading) {
    return (
      <div className="surveys-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading available surveys...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="surveys-page">
      {/* Hero Section */}
      <section className="surveys-hero bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Take a Survey</h1>
              <p className="lead mb-4">
                Share your valuable feedback and help organizations improve their services. 
                Your opinions matter and make a real difference.
              </p>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center">
                  <FaUsers className="me-2" />
                  <span>2,500+ Responses</span>
                </div>
                <div className="d-flex align-items-center">
                  <MdCategory className="me-2" />
                  <span>5 Categories</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaClock className="me-2" />
                  <span>2-10 Minutes</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="hero-illustration">
                <div className="survey-card-preview">
                  <div className="card shadow-lg">
                    <div className="card-body">
                      <h6 className="card-title">Quick Survey</h6>
                      <div className="progress mb-2" style={{height: '4px'}}>
                        <div className="progress-bar" style={{width: '60%'}}></div>
                      </div>
                      <small className="text-muted">3 of 5 questions</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <MdSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <select 
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="col-md-1">
              <div className="btn-group" role="group">
                <button 
                  className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <MdViewModule />
                </button>
                <button 
                  className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <MdViewList />
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="text-muted mb-0">
              Found {sortedSurveys.length} survey{sortedSurveys.length !== 1 ? 's' : ''}
            </p>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Surveys Grid/List */}
      <section className="py-5">
        <div className="container">
          {error && (
            <div className="alert alert-warning mb-4">
              <strong>Notice:</strong> {error} Showing sample surveys for demonstration.
            </div>
          )}

          {sortedSurveys.length === 0 ? (
            <div className="text-center py-5">
              <MdSearch size={64} className="text-muted mb-3" />
              <h4 className="text-muted">No surveys found</h4>
              <p className="text-muted">
                Try adjusting your search criteria or check back later for new surveys.
              </p>
            </div>
          ) : (
            <div className={`row ${viewMode === 'grid' ? 'g-4' : 'g-3'}`}>
              {sortedSurveys.map((survey) => {
                const CategoryIcon = getCategoryIcon(survey.category);
                
                if (viewMode === 'list') {
                  return (
                    <div key={survey._id} className="col-12">
                      <div className="card survey-card-list h-100 shadow-sm hover-lift">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="d-flex align-items-start gap-3">
                                <div 
                                  className="survey-icon"
                                  style={{ backgroundColor: survey.themeColor + '20' }}
                                >
                                  <CategoryIcon 
                                    size={24} 
                                    style={{ color: survey.themeColor }}
                                  />
                                </div>
                                
                                <div className="flex-grow-1">
                                  <div className="d-flex align-items-center gap-2 mb-1">
                                    <h5 className="card-title mb-0">{survey.title}</h5>
                                    <span className="badge bg-primary-subtle text-primary">
                                      {getCategoryLabel(survey.category)}
                                    </span>
                                  </div>
                                  
                                  <p className="card-text text-muted mb-2">
                                    {survey.description}
                                  </p>
                                  
                                  <div className="d-flex align-items-center gap-3 text-sm text-muted">
                                    <span><MdAccessTime className="me-1" />{survey.estimatedTime}</span>
                                    <span><FaUsers className="me-1" />{survey.questions.length} questions</span>
                                    <span><FaEye className="me-1" />{survey.responses} responses</span>
                                    {survey.language.length > 1 && (
                                      <span><MdLanguage className="me-1" />Bilingual</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-md-4">
                              <div className="text-end">
                                <div className="d-flex align-items-center justify-content-end gap-1 mb-2">
                                  {renderStars(survey.averageRating)}
                                  <span className="ms-2 text-muted">
                                    ({survey.averageRating})
                                  </span>
                                </div>
                                
                                <button 
                                  className="btn btn-primary"
                                  onClick={() => handleTakeSurvey(survey._id)}
                                >
                                  Take Survey
                                </button>
                                
                                <div className="mt-2">
                                  <small className="text-muted">
                                    Added {formatDate(survey.createdAt)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={survey._id} className="col-lg-4 col-md-6">
                    <div className="card survey-card h-100 shadow-sm hover-lift">
                      <div 
                        className="card-header border-0 text-white"
                        style={{ backgroundColor: survey.themeColor }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <CategoryIcon size={20} />
                            <span className="badge bg-white text-dark">
                              {getCategoryLabel(survey.category)}
                            </span>
                          </div>
                          
                          <div className="d-flex align-items-center gap-1">
                            {renderStars(survey.averageRating)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold mb-3">{survey.title}</h5>
                        <p className="card-text text-muted flex-grow-1">
                          {survey.description}
                        </p>
                        
                        <div className="survey-meta mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted">
                              <MdAccessTime className="me-1" />
                              {survey.estimatedTime}
                            </span>
                            <span className="text-muted">
                              <FaUsers className="me-1" />
                              {survey.questions.length} questions
                            </span>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">
                              <FaEye className="me-1" />
                              {survey.responses} responses
                            </span>
                            
                            {survey.language.length > 1 && (
                              <span className="badge bg-success-subtle text-success">
                                <MdLanguage className="me-1" />Bilingual
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          className="btn btn-primary w-100"
                          onClick={() => handleTakeSurvey(survey._id)}
                        >
                          Take Survey
                        </button>
                        
                        <small className="text-muted text-center mt-2">
                          Added {formatDate(survey.createdAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Want to Create Your Own Survey?</h2>
          <p className="lead mb-4">
            Join thousands of organizations using RatePro to collect valuable feedback 
            and make data-driven decisions.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup" className="btn btn-light btn-lg">
              Get Started Free
            </Link>
            <Link to="/pricing" className="btn btn-outline-light btn-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurveysList;