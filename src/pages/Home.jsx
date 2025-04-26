import Hero from "../components/Hero"
import TestimonialsSection from "../components/TestimonialsSection"
import CTASection from "../components/CTASection"

const testimonials = [
  {
    content:
      "Survanta has transformed how we understand and act on customer feedback. The insights we've gained have directly contributed to a 25% increase in customer satisfaction and a 15% boost in revenue.",
    author: "Jennifer Martinez",
    role: "Chief Customer Officer, Retail",
  },
  {
    content:
      "With survanta, we've been able to create a culture of continuous feedback that has improved employee engagement scores by 30% and reduced turnover by 20% in key departments.",
    author: "Robert Johnson",
    role: "VP of HR, Technology",
  },
  {
    content:
      "The product research capabilities in survanta have helped us reduce failed product launches by 40% by incorporating customer feedback at every stage of development.",
    author: "Sarah Chen",
    role: "Director of Product, Consumer Goods",
  },
]

const Home = () => {
  return (
    <>
      <Hero
        title="Experience Management Starts Here"
        description="survanta helps organizations design and improve the experiences that define their brands, products, and culture."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-primary btn-lg px-4 py-2">
            Get Started
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg px-4 py-2">
            Watch Demo
          </a>
        </div>
      </Hero>

      <section className="partners-section py-4 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <p className="text-muted mb-4">TRUSTED BY THOUSANDS OF THE WORLD'S MOST INNOVATIVE BRANDS</p>
          </div>
          <div className="logo-slider">
            <div className="logo-slider-track">
              {/* First Set */}
              <div className="logo-slide">
                <img src="src/assets/images/mcrosoft.png" alt="Microsoft" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/adbe.png" alt="Adobe" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/ubr.png" alt="Uber" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/airbnb.png" alt="Airbnb" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/strbucks.png" alt="Starbucks" className="partner-logo" />
              </div>
              {/* Duplicate Set for Infinite Loop */}
              <div className="logo-slide">
                <img src="src/assets/images/mcrosoft.png" alt="Microsoft" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/adbe.png" alt="Adobe" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/ubr.png" alt="Uber" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/airbnb.png" alt="Airbnb" className="partner-logo" />
              </div>
              <div className="logo-slide">
                <img src="src/assets/images/strbucks.png" alt="Starbucks" className="partner-logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-section">
        <div className="container">
          <h2 className="text-center mb-5">XM Solutions for Every Experience</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-users"></i>
                </div>
                <div className="solution-body">
                  <h3>Customer Experience</h3>
                  <p>Understand and improve every touchpoint in the customer journey to drive loyalty and growth.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div className="solution-body">
                  <h3>Employee Experience</h3>
                  <p>Create a workplace that attracts, engages, and retains top talent at every level.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-box-open"></i>
                </div>
                <div className="solution-body">
                  <h3>Product Experience</h3>
                  <p>Build better products by understanding customer needs and testing concepts at every stage.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-star"></i>
                </div>
                <div className="solution-body">
                  <h3>Brand Experience</h3>
                  <p>Measure and strengthen brand perception to stand out in competitive markets.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="solution-body">
                  <h3>Academic Research</h3>
                  <p>Powerful tools for academic researchers to conduct studies and gather data.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="solution-body">
                  <h3>Market Research</h3>
                  <p>Gather insights about markets, competitors, and opportunities to inform strategy.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">The survanta XM Platform</h2>
              <p className="lead">
                One platform to manage all four core experiences of your business—customer, employee, product, and
                brand.
              </p>
              <p>
                Survanta XM is the only platform that helps organizations design and improve the experiences that
                define their brands, products, and culture. With survanta, you can listen, understand, and take action
                on experience data (X-data™) alongside operational data (O-data) to drive meaningful business outcomes.
              </p>
              <a href="#" className="btn btn-primary mb-3">
                Explore the Platform
              </a>
            </div>
            <div className="col-lg-6">
              <div className="platform-feature">
                <div className="feature-icon mt-4">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <div className="feature-content">
                  <h4>Listen</h4>
                  <p>
                    Capture feedback across all experience touchpoints through surveys, social media, reviews, and more.
                  </p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="feature-icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="feature-content">
                  <h4>Understand</h4>
                  <p>Apply advanced analytics and AI to uncover insights and identify key drivers of experience.</p>
                </div>
              </div>
              <div className="platform-feature">
                <div className="feature-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="feature-content">
                  <h4>Take Action</h4>
                  <p>Automate workflows to close the loop with customers and employees and drive meaningful change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="resources-section">
        <div className="container">
          <h2 className="text-center mb-5">Latest Resources</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="resource-card">
                <div className="resource-img">
                  <i className="fas fa-book"></i>
                </div>
                <div className="resource-body">
                  <h4>The Ultimate Guide to Experience Management</h4>
                  <p>Learn how leading organizations are using XM to drive growth and competitive advantage.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Download Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="resource-card">
                <div className="resource-img">
                  <i className="fas fa-play"></i>
                </div>
                <div className="resource-body">
                  <h4>Webinar: The Future of Customer Experience</h4>
                  <p>Hear from industry experts on emerging trends and best practices in CX.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Watch Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="resource-card">
                <div className="resource-img">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div className="resource-body">
                  <h4>2025 Global Experience Trends Report</h4>
                  <p>Discover the latest data on customer and employee experience across industries.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Get the Report
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to transform your experiences?"
        description="Join thousands of organizations using Rater Pro to design and improve the experiences that define their business."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Contact Sales"
      />
    </>
  )
}

export default Home
