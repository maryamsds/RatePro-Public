import Hero from "../components/Hero"
import TestimonialsSection from "../components/TestimonialsSection"
import CTASection from "../components/CTASection"

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

const ProductReviews = () => {
  return (
    <>
      <Hero
        title="Product Reviews"
        description="Build better products by understanding customer needs, testing concepts, and optimizing experiences at every stage of development."
        backgroundClass="min-height-500"
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

      <section className="features-section">
        <div className="container">
          <h2 className="text-center mb-5 py-5 bg-light">Powerful Product Research Capabilities</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card h-100 p-4 shadow-sm rounded">
                <div className="feature-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Concept Testing</h3>
                <p className="mb-0">
                  Validate product ideas and features before development to ensure market fit and potential success.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-box-open"></i>
                </div>
                <h3>Package Testing</h3>
                <p>Evaluate packaging designs and messaging to maximize shelf appeal and brand recognition.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-tags"></i>
                </div>
                <h3>Pricing Research</h3>
                <p>Determine optimal price points through advanced techniques like conjoint analysis.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>UX Testing</h3>
                <p>Identify usability issues and optimize digital experiences through prototype testing.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h3>Market Segmentation</h3>
                <p>Discover distinct customer segments with unique needs, behaviors, and preferences.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Brand Tracking</h3>
                <p>Monitor brand health and perception over time to guide product positioning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="use-cases-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Product Research Use Cases</h2>
          <div className="row g-4"> {/* Added g-4 for gap between columns */}          
            <div className="col-md-6">
              <div className="use-case-card h-100 p-4 bg-white shadow-sm rounded">
                <h3>New Product Development</h3>
                <p>From ideation to launch, gather customer insights that inform every stage of product development:</p>
                <ul>
                  <li>Identify unmet customer needs</li>
                  <li>Evaluate concept appeal</li>
                  <li>Test prototypes and iterations</li>
                  <li>Optimize features and functionality</li>
                  <li>Validate market readiness</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="use-case-card h-100 p-4 bg-white shadow-sm rounded">
                <h3>Product Improvement</h3>
                <p>Continuously enhance existing products based on customer feedback and usage data:</p>
                <ul>
                  <li>Identify pain points in current products</li>
                  <li>Prioritize feature enhancements</li>
                  <li>Test redesigns and updates</li>
                  <li>Measure impact of changes</li>
                  <li>Benchmark against competitors</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="use-case-card h-100 p-4 bg-white shadow-sm rounded">
                <h3>Portfolio Optimization</h3>
                <p>Make strategic decisions about your product lineup and offerings:</p>
                <ul>
                  <li>Assess product-market fit</li>
                  <li>Identify overlap or gaps in offerings</li>
                  <li>Determine optimal product mix</li>
                  <li>Evaluate line extensions</li>
                  <li>Plan product lifecycle strategies</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="use-case-card h-100 p-4 bg-white shadow-sm rounded">
                <h3>Go-to-Market Strategy</h3>
                <p>Ensure successful product launches with customer-informed strategies:</p>
                <ul>
                  <li>Test marketing messages</li>
                  <li>Evaluate packaging and branding</li>
                  <li>Determine optimal pricing</li>
                  <li>Identify most promising segments</li>
                  <li>Develop effective launch plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="research-process">
        <div className="container">
          <h2 className="text-center mb-5">The Rater Pro Product Research Process</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Define Research Objectives</h4>
                  <p>
                    Clearly articulate what you need to learn and how the insights will inform product decisions. Our
                    team helps refine your questions to yield actionable results.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Design Study Methodology</h4>
                  <p>
                    Select the right research approach (surveys, interviews, usability tests, etc.) and design
                    instruments that yield reliable, valid data.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Recruit Targeted Participants</h4>
                  <p>
                    Access our global panel or use your own customers to gather feedback from the right audience for
                    your product.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Collect & Analyze Data</h4>
                  <p>
                    Leverage our platform to field studies and apply advanced analytics to uncover patterns,
                    preferences, and insights.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Deliver Actionable Insights</h4>
                  <p>
                    Receive clear, data-driven recommendations to guide product strategy, design, and development
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <CTASection
        title="Ready to build better products with customer insights?"
        description="Discover how Rater Pro Product Research can transform your development process and deliver products customers love."
        primaryButtonText="Get Started"
        secondaryButtonText="Request Demo"
      />
    </>
  )
}

export default ProductReviews
