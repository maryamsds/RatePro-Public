import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/md";
import { FaUsers, FaClock, FaEye } from "react-icons/fa";
import API from "../api/auth";
import "./SurveysList.css";
import PublicAPI from "../api/publicApi";

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // Categories (same as before)
  const categories = [
    { value: "all", label: "All Categories", icon: MdCategory },
    { value: "hospitality", label: "Hospitality & Tourism", icon: MdCategory },
    { value: "corporate", label: "Corporate & HR", icon: MdCategory },
    { value: "education", label: "Education", icon: MdCategory },
    { value: "healthcare", label: "Healthcare", icon: MdCategory },
    { value: "retail", label: "Retail & E-commerce", icon: MdCategory },
  ];

  // Fetch surveys on mount
  useEffect(() => {
    const fetchPublicSurveys = async () => {
      try {
        setLoading(true);
        const { data } = await PublicAPI.get("/surveys/public/all");

        console.log("Fetched surveys:", data);

        if (Array.isArray(data)) {
          setSurveys(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching public surveys:", err);
        setError("Unable to fetch surveys from the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSurveys();
  }, []);

  // 🔍 Filtering
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      survey.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || survey.category === selectedCategory;
    return matchesSearch && matchesCategory && survey.status === "active";
  });

  // 🔄 Sorting
  const sortedSurveys = [...filteredSurveys].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "popular":
        return (b.responses || 0) - (a.responses || 0);
      case "rating":
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });

  // ⭐ Utility Functions
  const handleTakeSurvey = (surveyId) => navigate(`/survey/${surveyId}`);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <MdStar key={i} className="text-warning" />
        ) : (
          <MdStarBorder key={i} className="text-muted" />
        )
      );
    }
    return stars;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.icon : MdCategory;
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : "General";
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
      {/* Hero */}
      <section className="surveys-hero bg-gradient-primary text-white py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Take a Survey</h1>
          <p className="lead">
            Share your feedback and help organizations improve their services.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row align-items-center g-3">
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
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
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
                  className={`btn btn-outline-secondary ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <MdViewModule />
                </button>
                <button
                  className={`btn btn-outline-secondary ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <MdViewList />
                </button>
              </div>
            </div>
          </div>

          {(searchTerm || selectedCategory !== "all") && (
            <div className="mt-3 text-end">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Surveys */}
      <section className="py-5">
        <div className="container">
          {error && <div className="alert alert-warning">{error}</div>}

          {sortedSurveys.length === 0 ? (
            <div className="text-center py-5">
              <MdSearch size={64} className="text-muted mb-3" />
              <h4 className="text-muted">No surveys found</h4>
            </div>
          ) : (
            <div className={`row ${viewMode === "grid" ? "g-4" : "g-3"}`}>
              {sortedSurveys.map((survey) => {
                const CategoryIcon = getCategoryIcon(survey.category);

                return (
                  <div key={survey._id} className="col-lg-4 col-md-6">
                    <div className="card survey-card h-100 shadow-sm">
                      <div
                        className="card-header text-white"
                        style={{ backgroundColor: survey.themeColor || "#13c5d0" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <CategoryIcon size={20} />
                            <span className="badge bg-white text-dark">
                              {getCategoryLabel(survey.category)}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            {renderStars(survey.averageRating || 0)}
                          </div>
                        </div>
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h5 className="fw-bold mb-2">{survey.title}</h5>
                        <p className="text-muted flex-grow-1">{survey.description}</p>

                        <div className="d-flex justify-content-between text-muted mb-2">
                          <span>
                            <MdAccessTime className="me-1" />
                            {survey.estimatedTime || "N/A"}
                          </span>
                          <span>
                            <FaUsers className="me-1" />
                            {survey.questions?.length || 0} questions
                          </span>
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
    </div>
  );
};

export default SurveysList;
