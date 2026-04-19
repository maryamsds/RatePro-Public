import Hero from "../components/Hero"
import TestimonialsSection from "../components/TestimonialsSection"
import CTASection from "../components/CTASection"
import microsoftLogo from "../assets/images/RATEPRO.png"
import adobeLogo from "../assets/images/RATEPRO.png"
import uberLogo from "../assets/images/RATEPRO.png"
import airbnbLogo from "../assets/images/RATEPRO.png"
import starbucksLogo from "../assets/images/RATEPRO.png"

const testimonials = [
  {
    content:
      "Rate Pro has transformed how we understand and act on customer feedback. The insights we've gained have directly contributed to a 25% increase in customer satisfaction and a 15% boost in revenue.",
    author: "Jennifer Martinez",
    role: "Chief Customer Officer, Retail",
  },
  {
    content:
      "With Rate Pro, we've been able to create a culture of continuous feedback that has improved employee engagement scores by 30% and reduced turnover by 20% in key departments.",
    author: "Robert Johnson",
    role: "VP of HR, Technology",
  },
  {
    content:
      "The product research capabilities in Rate Pro have helped us reduce failed product launches by 40% by incorporating customer feedback at every stage of development.",
    author: "Sarah Chen",
    role: "Director of Product, Consumer Goods",
  },
]

const Home = () => {
  return (
    <>
      <Hero
        title="Experience Management Starts Here"
        description="Rate Pro helps organizations design and improve the experiences that define their brands, products, and culture."
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
                <img src={microsoftLogo || "/placeholder.svg"} alt="Microsoft" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={adobeLogo || "/placeholder.svg"} alt="Adobe" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={uberLogo || "/placeholder.svg"} alt="Uber" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={airbnbLogo || "/placeholder.svg"} alt="Airbnb" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={starbucksLogo || "/placeholder.svg"} alt="Starbucks" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              {/* Duplicate Set for Infinite Loop */}
              <div className="logo-slide">
                <img src={microsoftLogo || "/placeholder.svg"} alt="Microsoft" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={adobeLogo || "/placeholder.svg"} alt="Adobe" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={uberLogo || "/placeholder.svg"} alt="Uber" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={airbnbLogo || "/placeholder.svg"} alt="Airbnb" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
              <div className="logo-slide">
                <img src={starbucksLogo || "/placeholder.svg"} alt="Starbucks" className="partner-logo" style={{ height: "70px", width: "100" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">XM Solutions for Every Experience</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-users"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Customer Experience</h3>
                  <p className="mb-4">Understand and improve every touchpoint in the customer journey to drive loyalty and growth.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Employee Experience</h3>
                  <p className="mb-4">Create a workplace that attracts, engages, and retains top talent at every level.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-box-open"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Product Experience</h3>
                  <p className="mb-4">Build better products by understanding customer needs and testing concepts at every stage.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-star"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Brand Experience</h3>
                  <p className="mb-4">Measure and strengthen brand perception to stand out in competitive markets.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Academic Research</h3>
                  <p className="mb-4">Powerful tools for academic researchers to conduct studies and gather data.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="solution-card">
                <div className="solution-img">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="solution-body">
                  <h3 className="h3 mb-3">Market Research</h3>
                  <p className="mb-4">Gather insights about markets, competitors, and opportunities to inform strategy.</p>
                  <a href="#" className="btn btn-outline-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="platform-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">The Rate Pro XM Platform</h2>
              <p className="lead">
                One platform to manage all four core experiences of your business—customer, employee, product, and
                brand.
              </p>
              <p>
                Rate Pro XM is the only platform that helps organizations design and improve the experiences that
                define their brands, products, and culture. With Rate Pro, you can listen, understand, and take action
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
      </section> */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* Text Column */}
            <div className="col-lg-6">
              <h2 className="mb-3 fw-semibold">The Rate Pro XM Platform</h2>
              <p className="lead mb-3">
                One platform to manage all four core experiences of your business—customer, employee, product, and brand.
              </p>
              <p className="mb-4">
                Rate Pro XM is the only platform that helps organizations design and improve the experiences that
                define their brands, products, and culture. With Rate Pro, you can listen, understand, and take action
                on experience data (X-data™) alongside operational data (O-data) to drive meaningful business outcomes.
              </p>
              <a href="#" className="btn btn-primary">Explore the Platform</a>
            </div>

            {/* Features Column */}
            <div className="col-lg-6">
              <div className="d-flex align-items-start mb-4">
                <div className="fs-3 text-primary me-3">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <div>
                  <h5 className="mb-1">Listen</h5>
                  <p className="mb-0">
                    Capture feedback across all experience touchpoints through surveys, social media, reviews, and more.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div className="fs-3 text-primary me-3">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div>
                  <h5 className="mb-1">Understand</h5>
                  <p className="mb-0">
                    Apply advanced analytics and AI to uncover insights and identify key drivers of experience.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <div className="fs-3 text-primary me-3">
                  <i className="fas fa-bolt"></i>
                </div>
                <div>
                  <h5 className="mb-1">Take Action</h5>
                  <p className="mb-0">
                    Automate workflows to close the loop with customers and employees and drive meaningful change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-semibold">Latest Resources</h2>
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-primary fs-1 mb-3">
                    <i className="fas fa-book"></i>
                  </div>
                  <h5 className="card-title mb-2">The Ultimate Guide to Experience Management</h5>
                  <p className="card-text mb-4">
                    Learn how leading organizations are using XM to drive growth and competitive advantage.
                  </p>
                  <a href="#" className="btn btn-outline-primary">Download Now</a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-primary fs-1 mb-3">
                    <i className="fas fa-play"></i>
                  </div>
                  <h5 className="card-title mb-2">Webinar: The Future of Customer Experience</h5>
                  <p className="card-text mb-4">
                    Hear from industry experts on emerging trends and best practices in CX.
                  </p>
                  <a href="#" className="btn btn-outline-primary">Watch Now</a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="text-primary fs-1 mb-3">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h5 className="card-title mb-2">2025 Global Experience Trends Report</h5>
                  <p className="card-text mb-4">
                    Discover the latest data on customer and employee experience across industries.
                  </p>
                  <a href="#" className="btn btn-outline-primary">Get the Report</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <CTASection
        title="Ready to transform your experiences?"
        description="Join thousands of organizations using Rate Pro to design and improve the experiences that define their business."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Contact Sales"
      />
    </>
  )
}

export default Home
