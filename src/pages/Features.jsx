import Hero from "../components/Hero"
import TestimonialsSection from "../components/TestimonialsSection"
import CTASection from "../components/CTASection"
import benefitsofsurvanta from "../assets/images/intbenft.png"


const testimonials = [
  {
    content:
      "Rater Pro has transformed how we understand and act on customer feedback. The insights we've gained have directly contributed to a 25% increase in customer satisfaction and a 15% boost in revenue.",
    author: "Jennifer Martinez",
    role: "Chief Customer Officer, Retail",
  },
  {
    content:
      "With Rater Pro, we've been able to create a culture of continuous feedback that has improved employee engagement scores by 30% and reduced turnover by 20% in key departments.",
    author: "Robert Johnson",
    role: "VP of HR, Technology",
  },
  {
    content:
      "The product research capabilities in Rater Pro have helped us reduce failed product launches by 40% by incorporating customer feedback at every stage of development.",
    author: "Sarah Chen",
    role: "Director of Product, Consumer Goods",
  },
]

const Features = () => {
  return (
    <>
      <Hero
        title="Powerful Features for Your Review Platform"
        description="Rater Pro provides all the tools you need to collect, manage, and display customer reviews effectively."
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

      <section className="features-grid-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Review Requests</h3>
                <p>
                  Automatically send review requests via email after purchase to collect authentic customer feedback.
                </p>
                <ul className="feature-list">
                  <li>Customizable email templates</li>
                  <li>Automatic timing control</li>
                  <li>Multi-language support</li>
                  <li>Smart reminders</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Review Management</h3>
                <p>Easily moderate, respond to, and analyze all your customer reviews from one dashboard.</p>
                <ul className="feature-list">
                  <li>Review moderation tools</li>
                  <li>Response management</li>
                  <li>Review analytics</li>
                  <li>Bulk actions</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Review Verification</h3>
                <p>Ensure only genuine customer reviews are published with our verification system.</p>
                <ul className="feature-list">
                  <li>Purchase verification</li>
                  <li>Fraud detection</li>
                  <li>Custom verification rules</li>
                  <li>Manual approval options</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Advanced Analytics</h3>
                <p>Gain valuable insights from your reviews with powerful analytics and reporting tools.</p>
                <ul className="feature-list">
                  <li>Sentiment analysis</li>
                  <li>Review trends</li>
                  <li>Product performance</li>
                  <li>Custom reports</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3>Automated Workflows</h3>
                <p>Create custom workflows to automate actions based on review content and ratings.</p>
                <ul className="feature-list">
                  <li>Conditional triggers</li>
                  <li>Multi-step workflows</li>
                  <li>Team notifications</li>
                  <li>CRM integrations</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <div className="feature-icon mb-4">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Multi-language Support</h3>
                <p>Collect and display reviews in multiple languages to serve global customers.</p>
                <ul className="feature-list">
                  <li>Auto-translation</li>
                  <li>Language detection</li>
                  <li>Localized interfaces</li>
                  <li>Regional settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section py-5 bg-light">
  <div className="container">
    <div className="row align-items-center">
      {/* Text Content Column */}
      <div className="col-lg-6 order-lg-1 order-2"> {/* Changed order for mobile */}
        <h2 className="mb-4 text-center text-lg-start text-primary">Why Choose Rater Pro for Reviews?</h2>
        
        <div className="benefit-item mb-4 d-flex align-items-start">
          <div className="me-3">
            <i className="fas fa-check-circle text-primary mt-1"></i>
          </div>
          <div>
            <h4 className="mb-2">Increase Conversion Rates</h4>
            <p className="mb-0">Displaying authentic reviews can boost conversion rates by up to 270%.</p>
          </div>
        </div>
        
        <div className="benefit-item mb-4 d-flex align-items-start">
          <div className="me-3">
            <i className="fas fa-check-circle text-primary mt-1"></i>
          </div>
          <div>
            <h4 className="mb-2">Improve SEO Rankings</h4>
            <p className="mb-0">Fresh review content helps improve your search engine rankings and visibility.</p>
          </div>
        </div>
        
        <div className="benefit-item mb-4 d-flex align-items-start">
          <div className="me-3">
            <i className="fas fa-check-circle text-primary mt-1"></i>
          </div>
          <div>
            <h4 className="mb-2">Build Customer Trust</h4>
            <p className="mb-0">92% of consumers read online reviews before making a purchase decision.</p>
          </div>
        </div>
        
        <div className="benefit-item d-flex align-items-start">
          <div className="me-3">
            <i className="fas fa-check-circle text-primary mt-1"></i>
          </div>
          <div>
            <h4 className="mb-2">Gain Valuable Insights</h4>
            <p className="mb-0">Understand what customers love (and don't love) about your products.</p>
          </div>
        </div>
      </div>
      
      {/* Image Column */}
      <div className="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0"> {/* Changed order and added margin */}
        <img
          src={benefitsofsurvanta || "/placeholder.svg"}
          alt="Benefits of Rater Pro"
          className="img-fluid rounded shadow w-100"
        />
      </div>
    </div>
  </div>
</section>

      <TestimonialsSection testimonials={testimonials} />

      <CTASection
        title="Ready to harness the power of customer reviews?"
        description="Start collecting and showcasing authentic customer feedback today."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Schedule Demo"
      />
    </>
  )
}

export default Features
