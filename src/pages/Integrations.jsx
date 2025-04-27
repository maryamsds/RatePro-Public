import Hero from "../components/Hero"
import CTASection from "../components/CTASection"

import shopifyLogo from "../assets/images/shopify.png"
import woocommerceLogo from "../assets/images/woocmrc.png"
import magentoLogo from "../assets/images/mgnto.png"
import bigcommerceLogo from "../assets/images/bigcomrc.png"
import mailchimpLogo from "../assets/images/mlchimp.png"
import klaviyoLogo from "../assets/images/klvio.png"
import hubspotLogo from "../assets/images/HubSpot-Logo.png"
import activecampaignLogo from "../assets/images/accampaign.png"
import salesforceLogo from "../assets/images/salefor.png"
import googleAnalyticsLogo from "../assets/images/gglalytic.png"
import zendeskLogo from "../assets/images/zendesk.png"
import segmentLogo from "../assets/images/segmnt.png"
import integrationBenefitsImg from "../assets/images/intbenft.png"

const Integrations = () => {
  return (
    <>
      <Hero
        title="Connect Your Experience Ecosystem"
        description="Integrate Rater Pro with your favorite platforms to streamline workflows and maximize the value of your experience data."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-primary btn-lg">
            Explore Integrations
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg">
            Custom Integration
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
                  <i className="fas fa-shopping-cart text-primary fa-3x" ></i>
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
                  <i className="fas fa-envelope text-primary fa-3x"></i>
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
                  <i className="fas fa-chart-line text-primary fa-3x "></i>
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

      {/* E-commerce Integrations Section */}
<section id="ecommerce" className="featured-integrations py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-5">E-commerce Integrations</h2>
    <div className="row g-4"> {/* Added g-4 for consistent gap between cards */}
      {[shopifyLogo, woocommerceLogo, magentoLogo, bigcommerceLogo].map((logo, index) => (
        <div className="col-6 col-md-4 col-lg-3" key={index}> {/* Adjusted column classes */}
          <div className="integration-card h-100 text-center p-3 bg-white shadow-sm rounded"> {/* Added h-100 and adjusted padding */}
            <div className="d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
              <img
                src={logo || "/placeholder.svg"}
                alt="Integration Logo"
                className="img-fluid mw-100 mh-100 object-fit-contain" 
              />
            </div>
            <h4 className="mt-3 mb-2 fs-5"> {/* Adjusted typography */}
              {["Shopify", "WooCommerce", "Magento", "BigCommerce"][index]}
            </h4>
            <p className="small mb-3 text-muted"> {/* Added text-muted */}
              {[
                "Automatically collect reviews from Shopify orders",
                "Seamless integration with WordPress stores",
                "Enterprise-grade review collection for Magento",
                "One-click installation for BigCommerce stores"
              ][index]}
            </p>
            <a href="#" className="btn btn-sm btn-outline-primary w-100"> {/* Made button full width */}
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Email Marketing Integrations Section */}
<section id="email" className="featured-integrations py-5">
  <div className="container">
    <h2 className="text-center mb-5">Email Marketing Integrations</h2>
    <div className="row g-4">
      {[mailchimpLogo, klaviyoLogo, hubspotLogo, activecampaignLogo].map((logo, index) => (
        <div className="col-6 col-md-4 col-lg-3" key={index}>
          <div className="integration-card h-100 text-center p-3 bg-white shadow-sm rounded">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
              <img
                src={logo || "/placeholder.svg"}
                alt="Integration Logo"
                className="img-fluid mw-100 mh-100 object-fit-contain"
              />
            </div>
            <h4 className="mt-3 mb-2 fs-5">
              {["Mailchimp", "Klaviyo", "HubSpot", "ActiveCampin"][index]}
            </h4>
            <p className="small mb-3 text-muted">
              {[
                "Automate review requests through Mailchimp campaigns",
                "Personalized review request flows in Klaviyo",
                "Sync review data with your HubSpot CRM",
                "Trigger review requests based on customer actions"
              ][index]}
            </p>
            <a href="#" className="btn btn-sm btn-outline-primary w-100">
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Analytics & CRM Integrations Section */}
<section id="analytics" className="featured-integrations py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-5">Analytics & CRM Integrations</h2>
    <div className="row g-4">
      {[salesforceLogo, googleAnalyticsLogo, zendeskLogo, segmentLogo].map((logo, index) => (
        <div className="col-6 col-md-4 col-lg-3" key={index}>
          <div className="integration-card h-100 text-center p-3 bg-white shadow-sm rounded">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
              <img
                src={logo || "/placeholder.svg"}
                alt="Integration Logo"
                className="img-fluid mw-100 mh-100 object-fit-contain"
              />
            </div>
            <h4 className="mt-3 mb-2 fs-5">
              {["Salesforce", "Google Analytics", "Zendesk", "Segment"][index]}
            </h4>
            <p className="small mb-3 text-muted">
              {[
                "Connect customer reviews with Salesforce records",
                "Track review impact on conversion rates",
                "Create support tickets from negative reviews",
                "Unify customer data across your tech stack"
              ][index]}
            </p>
            <a href="#" className="btn btn-sm btn-outline-primary w-100">
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="integration-benefits py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4 text-primary">Why Integrate with Rater Pro?</h2>
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
                src={integrationBenefitsImg || "/placeholder.svg"}
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
                  <i className="fas fa-code text-primary fa-3x "></i>
                </div>
                <h3 className="text-center">API Documentation</h3>
                <p>Comprehensive guides and reference materials for the Rater Pro API.</p>
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
                  <i className="fas fa-plug text-primary fa-3x "></i>
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
                  <i className="fas fa-users text-primary fa-3x"></i>
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
        title="Ready to integrate Rater Pro with your tech stack?"
        description="Our team of integration experts is ready to help you get started."
        primaryButtonText="Explore Integrations"
        secondaryButtonText="Contact Support"
      />
    </>
  )
}

export default Integrations
