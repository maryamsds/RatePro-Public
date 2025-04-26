"use client"

import Hero from "../components/Hero"
import CTASection from "../components/CTASection"
import TestimonialsSection from "../components/TestimonialsSection"

const Widgets = () => {
  return (
    <>
      <Hero
        title="Display Reviews Where They Matter Most"
        description="Showcase authentic customer feedback with customizable widgets designed to boost trust and conversion rates."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-primary btn-lg">
            Explore Widgets
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg">
            View Demo
          </a>
        </div>
      </Hero>

      <section className="widget-types-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Powerful Review Display Options</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="widget-card h-100 shadow-sm rounded overflow-hidden">
                <div className="widget-img" style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/productwdgt.png"
                    alt="Product Page Widgets"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="widget-body p-4">
                  <h3>Product Page Widgets</h3>
                  <p>Display product-specific reviews directly on your product pages to boost conversion rates.</p>
                  <ul className="widget-features">
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Star ratings summary
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Verified buyer badges
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Photo and video reviews
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Q&A integration
                    </li>
                  </ul>
                  <a href="#" className="btn btn-outline-primary mt-3">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="widget-card h-100 shadow-sm rounded overflow-hidden">
                <div className="widget-img" style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/flyngwdgt.png"
                    alt="Floating Widgets"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="widget-body p-4">
                  <h3>Floating Widgets</h3>
                  <p>Showcase your best reviews with eye-catching floating widgets that appear on any page.</p>
                  <ul className="widget-features">
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Customizable positioning
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Mobile-responsive design
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Review carousel format
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Targeted display rules
                    </li>
                  </ul>
                  <a href="#" className="btn btn-outline-primary mt-3">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="widget-card h-100 shadow-sm rounded overflow-hidden">
                <div className="widget-img" style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/Dedicated Review Pages.png"
                    alt="Dedicated Review Pages"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="widget-body p-4">
                  <h3>Dedicated Review Pages</h3>
                  <p>Create SEO-friendly review pages that showcase all your customer feedback in one place.</p>
                  <ul className="widget-features">
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Advanced filtering options
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Rich snippet markup
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Custom URL structure
                    </li>
                    <li>
                      <i className="fas fa-check text-primary me-2"></i> Pagination support
                    </li>
                  </ul>
                  <a href="#" className="btn btn-outline-primary mt-3">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="customization-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">Fully Customizable to Match Your Brand</h2>
              <p className="lead mb-4">
                Make your review widgets an extension of your brand with our powerful customization options.
              </p>
              <div className="customization-feature d-flex mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-palette text-primary"></i>
                </div>
                <div>
                  <h4>Brand Colors & Fonts</h4>
                  <p>
                    Match your website's design with custom colors, fonts, and styling to create a seamless experience.
                  </p>
                </div>
              </div>
              <div className="customization-feature d-flex mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-th-large text-primary"></i>
                </div>
                <div>
                  <h4>Layout Options</h4>
                  <p>Choose from grid, carousel, or list layouts to best showcase your customer reviews.</p>
                </div>
              </div>
              <div className="customization-feature d-flex mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-mobile-alt text-primary"></i>
                </div>
                <div>
                  <h4>Responsive Design</h4>
                  <p>All widgets automatically adapt to provide optimal viewing on any device.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ height: "400px", overflow: "hidden" }}>
                <img
                  src="src/assets/images/wdgtcstm.png"
                  alt="Widget Customization"
                  className="img-fluid rounded shadow w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="widget-gallery py-5">
        <div className="container">
          <h2 className="text-center mb-5">Widget Gallery</h2>
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="gallery-item shadow-sm rounded overflow-hidden h-100">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/strratng.png"
                    alt="Star Rating Widget"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-3">
                  <h5>Star Rating Widget</h5>
                  <p className="small">Display average ratings with visual star indicators</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="gallery-item shadow-sm rounded overflow-hidden h-100">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/reviewcarousel.png"
                    alt="Review Carousel"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-3">
                  <h5>Review Carousel</h5>
                  <p className="small">Showcase multiple reviews in a space-saving slider</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="gallery-item shadow-sm rounded overflow-hidden h-100">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/line-grid-png-9.png"
                    alt="Review Grid"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-3">
                  <h5>Review Grid</h5>
                  <p className="small">Display multiple reviews in a responsive grid layout</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="gallery-item shadow-sm rounded overflow-hidden h-100">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img
                    src="src/assets/images/fltngbdg.png"
                    alt="Floating Badge"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-3">
                  <h5>Floating Badge</h5>
                  <p className="small">Highlight your rating with an eye-catching badge</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="btn btn-primary">
              View All Widgets
            </a>
          </div>
        </div>
      </section>

      <section className="implementation-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Easy Implementation</h2>
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <h3 className="mb-4">Add Reviews to Your Site in Minutes</h3>
              <div className="implementation-step d-flex mb-4">
                <div className="step-number me-3">
                  <span className="badge bg-primary rounded-circle p-3">1</span>
                </div>
                <div>
                  <h4>Choose Your Widget</h4>
                  <p>Select from our library of pre-designed widgets or create a custom design.</p>
                </div>
              </div>
              <div className="implementation-step d-flex mb-4">
                <div className="step-number me-3">
                  <span className="badge bg-primary rounded-circle p-3">2</span>
                </div>
                <div>
                  <h4>Customize Appearance</h4>
                  <p>Adjust colors, fonts, and layout to match your brand's look and feel.</p>
                </div>
              </div>
              <div className="implementation-step d-flex mb-4">
                <div className="step-number me-3">
                  <span className="badge bg-primary rounded-circle p-3">3</span>
                </div>
                <div>
                  <h4>Copy & Paste Code</h4>
                  <p>Simply add the generated code to your website where you want reviews to appear.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="code-block bg-dark text-light p-4 rounded shadow">
                <pre className="mb-0">
                  <code>{`<!-- Survanta Review Widget -->
<div id="survanta-reviews" 
  data-product-id="12345"
  data-widget-type="carousel"
  data-theme="light">
</div>
<script src="https://cdn.survanta.com/widgets.js"></script>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection
        testimonials={[
          {
            content:
              "After implementing Survanta review widgets on our product pages, we saw a 28% increase in conversion rates. The customization options allowed us to perfectly match our brand aesthetic.",
            author: "Michael Thompson",
            role: "E-commerce Director, Fashion Retailer",
          },
          {
            content:
              "The floating review widget has been a game-changer for our site. It's non-intrusive but effectively showcases our best customer feedback, leading to longer session times and higher trust scores.",
            author: "Sarah Chen",
            role: "Marketing Manager, SaaS Company",
          },
        ]}
      />

      <CTASection
        title="Ready to showcase your customer reviews?"
        description="Start displaying authentic customer feedback with our customizable widgets today."
        primaryButtonText="Get Started"
        secondaryButtonText="Request Demo"
      />
    </>
  )
}

export default Widgets
