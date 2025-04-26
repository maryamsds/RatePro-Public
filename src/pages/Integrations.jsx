import Hero from "../components/Hero"
import CTASection from "../components/CTASection"

const Integrations = () => {
  return (
    <>
      <Hero
        title="Connect Your Experience Ecosystem"
        description="Integrate Survanta with your favorite platforms to streamline workflows and maximize the value of your experience data."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-primary btn-lg">
            Explore Integrations
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg">
            Request Custom Integration
          </a>
        </div>
      </Hero>

      <section className="integration-categories py-5">
        <div className="container">
          <h2 className="text-center mb-5">Integration Categories</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="category-card text-center p-4 h-100 shadow-sm rounded">
                <div className="category-icon mb-3">
                  <i className="fas fa-shopping-cart fa-3x text-primary"></i>
                </div>
                <h3>E-commerce Platforms</h3>
                <p>Connect with leading e-commerce platforms to automatically collect and display customer reviews.</p>
                <a href="#ecommerce" className="btn btn-outline-primary mt-3">
                  View Integrations
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="category-card text-center p-4 h-100 shadow-sm rounded">
                <div className="category-icon mb-3">
                  <i className="fas fa-envelope fa-3x text-primary"></i>
                </div>
                <h3>Email Marketing</h3>
                <p>
                  Integrate with email marketing tools to automate review requests and personalize customer
                  communications.
                </p>
                <a href="#email" className="btn btn-outline-primary mt-3">
                  View Integrations
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="category-card text-center p-4 h-100 shadow-sm rounded">
                <div className="category-icon mb-3">
                  <i className="fas fa-chart-line fa-3x text-primary"></i>
                </div>
                <h3>Analytics & CRM</h3>
                <p>
                  Connect your customer data platforms to gain deeper insights and create unified customer profiles.
                </p>
                <a href="#analytics" className="btn btn-outline-primary mt-3">
                  View Integrations
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ecommerce" className="featured-integrations py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">E-commerce Integrations</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/shopify.png"
                  alt="Shopify"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Shopify</h4>
                <p className="small">Automatically collect reviews from Shopify orders</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/woocmrc.png"
                  alt="WooCommerce"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>WooCommerce</h4>
                <p className="small">Seamless integration with WordPress stores</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/mgnto.png"
                  alt="Magento"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Magento</h4>
                <p className="small">Enterprise-grade review collection for Magento</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/bigcomrc.png"
                  alt="BigCommerce"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>BigCommerce</h4>
                <p className="small">One-click installation for BigCommerce stores</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="email" className="featured-integrations py-5">
        <div className="container">
          <h2 className="text-center mb-5">Email Marketing Integrations</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/mlchimp.png"
                  alt="Mailchimp"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Mailchimp</h4>
                <p className="small">Automate review requests through Mailchimp campaigns</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/klvio.png"
                  alt="Klaviyo"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Klaviyo</h4>
                <p className="small">Personalized review request flows in Klaviyo</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/HubSpot-Logo.png"
                  alt="HubSpot"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>HubSpot</h4>
                <p className="small">Sync review data with your HubSpot CRM</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/accampaign.png"
                  alt="ActiveCampaign"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>ActiveCampaign</h4>
                <p className="small">Trigger review requests based on customer actions</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="analytics" className="featured-integrations py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Analytics & CRM Integrations</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/salefor.png"
                  alt="Salesforce"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Salesforce</h4>
                <p className="small">Connect customer reviews with Salesforce records</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/gglalytic.png"
                  alt="Google Analytics"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Google Analytics</h4>
                <p className="small">Track review impact on conversion rates</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/zendesk.png"
                  alt="Zendesk"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Zendesk</h4>
                <p className="small">Create support tickets from negative reviews</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="integration-card text-center p-4 bg-white shadow-sm rounded">
                <img
                  src="src/assets/images/segmnt.png"
                  alt="Segment"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "60px" }}
                />
                <h4>Segment</h4>
                <p className="small">Unify customer data across your tech stack</p>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-benefits py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">Why Integrate with Survanta?</h2>
              <div className="benefit-item d-flex mb-4">
                <div className="benefit-icon me-3">
                  <i className="fas fa-bolt text-primary fa-2x"></i>
                </div>
                <div>
                  <h4>Streamlined Workflows</h4>
                  <p>Eliminate manual tasks and automate the review collection process from purchase to display.</p>
                </div>
              </div>
              <div className="benefit-item d-flex mb-4">
                <div className="benefit-icon me-3">
                  <i className="fas fa-chart-pie text-primary fa-2x"></i>
                </div>
                <div>
                  <h4>Unified Data</h4>
                  <p>Connect customer experience data across platforms for a complete view of your customer journey.</p>
                </div>
              </div>
              <div className="benefit-item d-flex mb-4">
                <div className="benefit-icon me-3">
                  <i className="fas fa-cogs text-primary fa-2x"></i>
                </div>
                <div>
                  <h4>Flexible Implementation</h4>
                  <p>Choose from pre-built integrations or use our API for custom solutions that fit your needs.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="src/assets/images/intbenft.png"
                alt="Integration Benefits"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="developer-resources py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Developer Resources</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="resource-card p-4 bg-white shadow-sm rounded h-100">
                <div className="resource-icon mb-3 text-center">
                  <i className="fas fa-code fa-3x text-primary"></i>
                </div>
                <h3 className="text-center">API Documentation</h3>
                <p>Comprehensive guides and reference materials for the Survanta API.</p>
                <div className="text-center mt-3">
                  <a href="#" className="btn btn-outline-primary">
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="resource-card p-4 bg-white shadow-sm rounded h-100">
                <div className="resource-icon mb-3 text-center">
                  <i className="fas fa-plug fa-3x text-primary"></i>
                </div>
                <h3 className="text-center">Integration SDKs</h3>
                <p>Ready-to-use software development kits for popular programming languages.</p>
                <div className="text-center mt-3">
                  <a href="#" className="btn btn-outline-primary">
                    Download SDKs
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="resource-card p-4 bg-white shadow-sm rounded h-100">
                <div className="resource-icon mb-3 text-center">
                  <i className="fas fa-users fa-3x text-primary"></i>
                </div>
                <h3 className="text-center">Developer Community</h3>
                <p>Join our community forum to get help and share integration best practices.</p>
                <div className="text-center mt-3">
                  <a href="#" className="btn btn-outline-primary">
                    Join Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to integrate Survanta with your tech stack?"
        description="Our team of integration experts is ready to help you get started."
        primaryButtonText="Explore Integrations"
        secondaryButtonText="Contact Support"
      />
    </>
  )
}

export default Integrations
