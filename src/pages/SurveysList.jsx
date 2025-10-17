// SurveysList.jsx public survey

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdStar,
  MdStarBorder,
  MdAccessTime,
  MdPeople,
  MdLanguage,
  MdSearch,
  MdCategory,
  MdViewList,
  MdViewModule,
  MdBusiness,
  MdDescription,
  MdError,
  MdRefresh
} from "react-icons/md";
import { FaUsers, FaClock, FaChartBar } from "react-icons/fa";
import "./SurveysList.css";
import PublicAPI from "../api/publicApi.js"

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // Categories
  const categories = [
    { value: "all", label: "All Categories", icon: MdCategory },
    { value: "hospitality", label: "Hospitality / Tourism", icon: MdCategory },
    { value: "corporate", label: "Corporate / HR", icon: MdCategory },
    { value: "education", label: "Education", icon: MdCategory },
    { value: "healthcare", label: "Healthcare", icon: MdCategory },
    { value: "retail", label: "Retail & E-commerce", icon: MdCategory },
    { value: "technology", label: "Technology", icon: MdCategory },
    { value: "government", label: "Government", icon: MdCategory },
  ];

  // Fetch surveys function
  const fetchPublicSurveys = async () => {
    try {
      setLoading(true);
      setError("");
      // Try multiple endpoint variations
      const endpoints = [
        "/surveys/public/all",
      ];

      let response = null;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          response = await PublicAPI.get(endpoint);
          break; // Exit loop if successful
        } catch (err) {
          lastError = err;
          continue; // Try next endpoint
        }
      }

      if (!response) {
        throw lastError || new Error("All API endpoints failed");
      }

      // Handle response data
      let surveysData = [];

      if (response.data && Array.isArray(response.data.surveys)) {
        surveysData = response.data.surveys;
      } else if (Array.isArray(response.data)) {
        surveysData = response.data;
      } else if (response.data && response.data.data) {
        surveysData = response.data.data;
      } else {
        console.warn("⚠️ Unexpected API response structure:", response.data);
        surveysData = [];
      }

      // Process surveys data
      const validSurveys = surveysData
        .filter(survey => survey && (survey._id || survey.id) && survey.title)
        .map(survey => ({
          _id: survey._id || survey.id,
          title: survey.title || "Untitled Survey",
          description: survey.description || "No description available",
          category: survey.category || "general",
          themeColor: survey.themeColor || getCategoryColor(survey.category),
          createdAt: survey.createdAt || new Date().toISOString(),
          estimatedTime: survey.estimatedTime || `${Math.ceil((survey.questions?.length || 5) * 0.5)}-${Math.ceil((survey.questions?.length || 5) * 0.8)} min`,
          averageRating: survey.averageRating || (3.5 + Math.random() * 1.5).toFixed(1),
          questions: survey.questions || [],
          totalResponses: survey.totalResponses || survey.settings?.totalResponses || Math.floor(Math.random() * 100),
          status: survey.status || "active",
          companyName: survey.companyName || survey.tenant?.name || "Demo Company",
          isPublic: survey.settings?.isPublic !== false
        }))
        .filter(survey => survey.isPublic && survey.status === "active");

      if (validSurveys.length === 0) {
        // If no surveys from API, use mock data but don't show error
        const mockSurveys = generateMockSurveys();
        setSurveys(mockSurveys);
        setError("info|No public surveys available yet. Showing demo surveys.");
      } else {
        setSurveys(validSurveys);
        setError("");
      }

    } catch (err) {
      console.error("❌ Error fetching public surveys:", err);

      // Use mock data as fallback
      const mockSurveys = generateMockSurveys();
      setSurveys(mockSurveys);

      // Set appropriate error message
      if (err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')) {
        setError("warning|Unable to connect to server. Showing demo data.");
      } else if (err.response?.status === 404) {
        setError("info|Surveys endpoint not found. Showing demo data.");
      } else if (err.response?.status === 500) {
        setError("warning|Server error. Showing demo data.");
      } else {
        setError("warning|Connection issue. Showing demo surveys.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate mock data for fallback
  const generateMockSurveys = () => {
    const mockCompanies = [
      "Soft Edge Solutions",
      "Tech Innovators Inc.",
      "City Medical Center",
      "EduSmart Academy",
      "Retail Plus Group",
      "Hospitality Masters",
      "Government Services Dept",
      "Tech Solutions Ltd"
    ];

    const mockCategories = ["corporate", "education", "healthcare", "retail", "hospitality", "technology", "government"];

    return Array.from({ length: 8 }, (_, index) => ({
      _id: `mock-${index + 1}`,
      title: [
        "Customer Satisfaction Survey",
        "Employee Engagement Feedback",
        "Patient Experience Review",
        "Student Learning Assessment",
        "Shopping Experience Survey",
        "Hotel Service Feedback",
        "Citizen Service Evaluation",
        "Product Usability Test"
      ][index],
      description: [
        "Share your experience and help us improve our services and customer support.",
        "Help us understand workplace satisfaction and improve employee experience.",
        "Your feedback helps us provide better healthcare services and patient care.",
        "Evaluate your learning experience and help us enhance educational programs.",
        "Tell us about your shopping experience and help us serve you better.",
        "Share your stay experience and help us improve hotel services.",
        "Help us improve government services with your valuable feedback.",
        "Test our product and share your experience for future improvements."
      ][index],
      category: mockCategories[index % mockCategories.length],
      themeColor: [
        "#007bff", "#28a745", "#dc3545", "#fd7e14",
        "#ffc107", "#6f42c1", "#20c997", "#13c5d0"
      ][index],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedTime: `${5 + index}-${7 + index} min`,
      averageRating: (4.0 + Math.random() * 1.0).toFixed(1),
      questions: Array(8 + Math.floor(Math.random() * 5)),
      totalResponses: Math.floor(Math.random() * 200) + 50,
      status: "active",
      companyName: mockCompanies[index],
      isPublic: true
    }));
  };

  // Fetch on component mount
  useEffect(() => {
    fetchPublicSurveys();
  }, []);

  // Retry function
  const handleRetry = () => {
    fetchPublicSurveys();
  };

  // 🔍 Filtering
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      survey.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || survey.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🔄 Sorting
  const sortedSurveys = [...filteredSurveys].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "popular":
        return (b.totalResponses || 0) - (a.totalResponses || 0);
      case "rating":
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });

  // ⭐ Utility Functions
  const handleTakeSurvey = (surveyId) => {
    if (surveyId.startsWith('mock-')) {
      alert('This is a demo survey. Real surveys will be available when connected to the server.');
      return;
    }
    navigate(`/survey/${surveyId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <MdStar key={i} className="text-warning" size={16} />
        ) : (
          <MdStarBorder key={i} className="text-muted" size={16} />
        )
      );
    }
    return stars;
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : "General";
  };

  const getCategoryColor = (category) => {
    const colors = {
      corporate: "#007bff",
      education: "#28a745",
      healthcare: "#dc3545",
      hospitality: "#ffc107",
      retail: "#fd7e14",
      technology: "#6f42c1",
      government: "#20c997",
      default: "#13c5d0"
    };
    return colors[category] || colors.default;
  };

  // Get alert type from error message
  const getAlertType = () => {
    if (!error) return null;
    if (error.startsWith('warning|')) return 'warning';
    if (error.startsWith('info|')) return 'info';
    return 'danger';
  };

  const getAlertMessage = () => {
    if (!error) return '';
    return error.split('|')[1] || error;
  };

  // 🌀 Loading UI
  if (loading) {
    return (
      <div className="surveys-page">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading available surveys...</p>
        </div>
      </div>
    );
  }

  // ⚙️ UI Rendering
  return (
    <div className="surveys-page">
      {/* Hero Section */}
      <section className="surveys-hero text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-3">Take a Survey</h1>
              <p className="lead mb-4">
                Share your feedback and help organizations improve their services.
                Your opinion matters and makes a difference!
              </p>
              <div className="d-flex flex-wrap gap-4 text-white-50">
                <span className="d-flex align-items-center gap-2">
                  <FaUsers size={18} />
                  <span>{surveys.length} Available Surveys</span>
                </span>
                <span className="d-flex align-items-center gap-2">
                  <MdBusiness size={18} />
                  <span>Multiple Companies</span>
                </span>
                <span className="d-flex align-items-center gap-2">
                  <MdLanguage size={18} />
                  <span>Multiple Languages</span>
                </span>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end hero-illustration">
              <div className="bg-white bg-opacity-10 p-4 rounded survey-card-preview">
                <h5 className="mb-3">Why Participate?</h5>
                <ul className="list-unstyled small mb-0">
                  <li className="mb-2">✓ Help improve services and products</li>
                  <li className="mb-2">✓ Share your valuable experience</li>
                  <li className="mb-2">✓ Make your voice heard</li>
                  <li className="mb-0">✓ Contribute to better experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <MdSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search surveys, companies, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="d-flex align-items-center gap-2">
                <MdCategory className="text-muted" size={18} />
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-2">
              <div className="d-flex align-items-center gap-2">
                <FaChartBar className="text-muted" size={14} />
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            <div className="col-md-2">
              <div className="btn-group w-100" role="group">
                <button
                  className={`btn btn-outline-primary ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <MdViewModule size={18} />
                </button>
                <button
                  className={`btn btn-outline-primary ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <MdViewList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="row mt-3">
            <div className="col-md-6">
              <small className="text-muted">
                Showing {sortedSurveys.length} of {surveys.length} surveys
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
              </small>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex gap-2 justify-content-end">
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    className="btn btn-sm btn-outline-secondary hover-lift"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </button>
                )}
                <button
                  className="btn btn-sm btn-outline-primary hover-lift"
                  onClick={handleRetry}
                  title="Retry fetching surveys"
                >
                  <MdRefresh size={14} className="me-1" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-5">
        <div className="container">
          {/* Error Message */}
          {error && (
            <div className={`alert alert-${getAlertType()} alert-dismissible fade show`} role="alert">
              <div className="d-flex align-items-center">
                <MdError className="me-2 flex-shrink-0" size={20} />
                <div className="flex-grow-1">{getAlertMessage()}</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                ></button>
              </div>
            </div>
          )}

          {/* Surveys Grid/List */}
          {sortedSurveys.length === 0 ? (
            <div className="text-center py-5">
              <MdSearch size={64} className="text-muted mb-3" />
              <h4 className="text-muted mb-3">No surveys found</h4>
              <p className="text-muted mb-4">
                {searchTerm
                  ? `No surveys match "${searchTerm}". Try different keywords or browse all categories.`
                  : 'No surveys available for the selected criteria. Please try different filters.'
                }
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-primary hover-lift"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  <MdSearch className="me-2" />
                  Show All Surveys
                </button>
                <button
                  className="btn btn-outline-primary hover-lift"
                  onClick={handleRetry}
                >
                  <MdRefresh className="me-2" />
                  Retry Connection
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "row g-4" : "row g-3"}>
                {sortedSurveys.map((survey) => (
                  <div
                    key={survey._id}
                    className={viewMode === "grid" ? "col-xl-4 col-lg-6 col-md-6" : "col-12"}
                  >
                    <div className={`card h-100 shadow-sm border-0 ${viewMode === "list" ? "survey-card-list flex-row" : "survey-card"
                      }`}>

                      {/* Card Header with Theme Color */}
                      <div
                        className={viewMode === "list" ?
                          "card-header border-0 text-white p-4 d-flex flex-column justify-content-between" :
                          "card-header border-0 text-white p-4"
                        }
                        style={{
                          backgroundColor: survey.themeColor || getCategoryColor(survey.category),
                          minWidth: viewMode === "list" ? "220px" : "auto",
                          flex: viewMode === "list" ? "0 0 auto" : "auto"
                        }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <span className="badge bg-white text-dark px-3 py-2">
                              {getCategoryLabel(survey.category)}
                            </span>
                            <div className="d-flex align-items-center gap-1">
                              {renderStars(survey.averageRating)}
                              <small className="ms-1">({survey.averageRating})</small>
                            </div>
                          </div>

                          {/* Company Info */}
                          <div className="d-flex align-items-center gap-2 mt-3">
                            <div className="survey-icon bg-white bg-opacity-20">
                              <MdBusiness size={20} />
                            </div>
                            <div>
                              <small className="fw-medium opacity-90">By {survey.companyName}</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className={viewMode === "list" ?
                        "card-body flex-grow-1 p-4 d-flex flex-column justify-content-between" :
                        "card-body d-flex flex-column"
                      }>
                        <div>
                          <h5 className="card-title fw-bold mb-3">{survey.title}</h5>
                          <p className="card-text text-muted mb-4 flex-grow-1">
                            {survey.description}
                          </p>
                        </div>

                        {/* Survey Stats */}
                        <div className="survey-meta">
                          <div className="row g-2 text-muted small mb-3">
                            <div className="col-4 d-flex align-items-center gap-1">
                              <MdAccessTime size={14} />
                              <span>{survey.estimatedTime}</span>
                            </div>
                            <div className="col-4 d-flex align-items-center gap-1">
                              <MdDescription size={14} />
                              <span>{survey.questions?.length || 0} Qs</span>
                            </div>
                            <div className="col-4 d-flex align-items-center gap-1">
                              <FaUsers size={12} />
                              <span>{survey.totalResponses}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            className="btn btn-primary w-100 hover-lift"
                            onClick={() => handleTakeSurvey(survey._id)}
                          >
                            Take Survey
                          </button>

                          <small className="text-muted text-center d-block mt-2">
                            Added {formatDate(survey.createdAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demo Notice */}
              {surveys.some(s => s._id.startsWith('mock-')) && (
                <div className="text-center mt-4">
                  <small className="text-muted">
                    💡 Showing demo surveys. Real surveys will appear when connected to the server.
                  </small>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};


export default SurveysList;