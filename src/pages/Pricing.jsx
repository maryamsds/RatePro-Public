"use client"

import { useState } from "react"
import Hero from "../components/Hero"
import CTASection from "../components/CTASection"

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("research")
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <>
      <Hero
        title="Survanta Pricing"
        description="Get the right plan for your organization with flexible pricing options designed to scale with your experience management needs."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-primary btn-lg">
            Get Started
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg">
            Contact Sales
          </a>
        </div>
      </Hero>

      <section className="pricing-section">
        <div className="container">
          <ul className="nav nav-tabs justify-content-center" id="pricingTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "research" ? "active" : ""}`}
                onClick={() => setActiveTab("research")}
                type="button"
                role="tab"
              >
                Research Core
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "xm" ? "active" : ""}`}
                onClick={() => setActiveTab("xm")}
                type="button"
                role="tab"
              >
                XM Platform
              </button>
            </li>
          </ul>

          <div className="tab-content mt-2" id="pricingTabsContent">
            <div className={`tab-pane fade ${activeTab === "research" ? "show active" : ""}`} role="tabpanel">
              <div className="row">
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Basic</h3>
                      <p>For individuals getting started with surveys</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">
                        $99<span>/month billed annually</span>
                      </div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> 100 responses per month
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Unlimited surveys
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Basic reporting
                        </li>
                        <li>
                          <i className="fas fa-check"></i> 24/7 support
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Premium</h3>
                      <p>For teams needing advanced features</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">
                        $499<span>/month billed annually</span>
                      </div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> 1,000 responses per month
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Advanced reporting
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Team collaboration
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Data exports
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Priority support
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Enterprise</h3>
                      <p>For organizations with complex needs</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">Custom</div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> Unlimited responses
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Advanced analytics
                        </li>
                        <li>
                          <i className="fas fa-check"></i> API access
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Single sign-on
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Dedicated account manager
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`tab-pane fade ${activeTab === "xm" ? "show active" : ""}`} role="tabpanel">
              <div className="row">
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Essentials</h3>
                      <p>For teams starting with XM</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">
                        $1,500<span>/year per user</span>
                      </div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> 4 XM solutions
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Basic dashboards
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Standard integrations
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Community support
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Professional</h3>
                      <p>For organizations scaling XM</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">
                        $3,000<span>/year per user</span>
                      </div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> All XM solutions
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Advanced analytics
                        </li>
                        <li>
                          <i className="fas fa-check"></i> API access
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Priority support
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Basic automation
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pricing-card">
                    <div className="pricing-header">
                      <h3>Enterprise</h3>
                      <p>For enterprise-wide XM programs</p>
                    </div>
                    <div className="pricing-body">
                      <div className="price">Custom</div>
                      <ul className="feature-list">
                        <li>
                          <i className="fas fa-check"></i> Unlimited solutions
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Predictive analytics
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Advanced automation
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Single sign-on
                        </li>
                        <li>
                          <i className="fas fa-check"></i> Dedicated CSM
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary w-100">
                        Contact Sales
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Detailed Feature Comparison</h2>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Premium</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Responses</td>
                  <td>100</td>
                  <td>1,000</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Survey Questions</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Advanced Question Types</td>
                  <td>
                    <i className="fas fa-check check-icon"></i>
                  </td>
                  <td>
                    <i className="fas fa-check check-icon"></i>
                  </td>
                  <td>
                    <i className="fas fa-check check-icon"></i>
                  </td>
                </tr>
                <tr>
                  <td>Data Export</td>
                  <td>CSV only</td>
                  <td>CSV, Excel, SPSS</td>
                  <td>All formats + API</td>
                </tr>
                <tr>
                  <td>Collaboration</td>
                  <td>
                    <i className="fas fa-times"></i>
                  </td>
                  <td>Up to 5 users</td>
                  <td>Unlimited users</td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td>Email</td>
                  <td>Email + Chat</td>
                  <td>24/7 Phone + Dedicated</td>
                </tr>
                <tr>
                  <td>Single Sign-On</td>
                  <td>
                    <i className="fas fa-times"></i>
                  </td>
                  <td>
                    <i className="fas fa-times"></i>
                  </td>
                  <td>
                    <i className="fas fa-check check-icon"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(0)}>
                  What's included in each plan?
                  <i className={`fas ${activeFaq === 0 ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === 0 ? "show" : ""}`}>
                  <p>
                    Our Basic plan includes core survey functionality with limited responses. Premium adds advanced
                    features and more responses. Enterprise provides unlimited capabilities with custom solutions
                    tailored to your organization's needs.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(1)}>
                  Can I upgrade or downgrade my plan later?
                  <i className={`fas ${activeFaq === 1 ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === 1 ? "show" : ""}`}>
                  <p>
                    Yes, you can change your plan at any time. Upgrades take effect immediately with a prorated charge.
                    Downgrades take effect at your next billing cycle.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(2)}>
                  Do you offer discounts for non-profits or education?
                  <i className={`fas ${activeFaq === 2 ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === 2 ? "show" : ""}`}>
                  <p>
                    Yes, we offer special pricing for academic institutions and non-profit organizations. Please contact
                    our sales team for more information.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(3)}>
                  What payment methods do you accept?
                  <i className={`fas ${activeFaq === 3 ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === 3 ? "show" : ""}`}>
                  <p>
                    We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal.
                    Enterprise customers can also pay via invoice.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(4)}>
                  Is there a free trial available?
                  <i className={`fas ${activeFaq === 4 ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === 4 ? "show" : ""}`}>
                  <p>
                    Yes, we offer a 30-day free trial for our Basic and Premium plans. No credit card is required to
                    start your trial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to get started with Survanta?"
        description="Join thousands of organizations that trust Survanta for their experience management needs."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Contact Sales"
      />
    </>
  )
}

export default Pricing
