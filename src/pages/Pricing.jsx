"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import PublicAPI from "../api/publicApi"
import API from "../api/auth"
import Hero from "../components/Hero"
import CTASection from "../components/CTASection"
import Swal from "sweetalert2"

const Pricing = () => {
  const [plans, setPlans] = useState([])
  const [featureDefs, setFeatureDefs] = useState({}) // Backend-provided: { code: { name, unit, isPublic, ... } }
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  // ─── Fetch plans + feature definitions from API ───
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await PublicAPI.get("/subscriptions/plans")
        if (res.data.success) {
          const sorted = (res.data.data.plans || []).sort(
            (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
          )
          setPlans(sorted)
          setFeatureDefs(res.data.data.featureDefinitions || {})
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // ─── Pricing Helpers ───
  const getPrice = (plan) => {
    if (!plan.pricing) return "Custom"
    const price = billingCycle === "yearly" ? plan.pricing.yearly : plan.pricing.monthly
    if (price === 0) return "Free"
    if (price === null || price === undefined) return "Custom"
    return `$${price}`
  }

  const getPriceSuffix = (plan) => {
    const price = billingCycle === "yearly" ? plan.pricing?.yearly : plan.pricing?.monthly
    if (price === 0 || price === null || price === undefined) return ""
    return billingCycle === "yearly" ? "/yr" : "/mo"
  }

  const getMonthlyEquivalent = (plan) => {
    if (billingCycle !== "yearly" || !plan.pricing) return null
    const { monthly, yearly } = plan.pricing
    if (yearly === 0 || monthly === 0) return null
    const monthlyEq = (yearly / 12).toFixed(0)
    return `$${monthlyEq}/mo billed annually`
  }

  // ─── Feature Display Logic (100% backend-driven) ───
  const formatFeature = (f) => {
    const def = featureDefs[f.featureCode] || {}
    // Use backend name, fallback to humanized code only as last resort
    const label = def.name || f.featureCode.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    const unit = def.unit || ""

    if (!f.enabled) {
      return { text: label, enabled: false }
    }

    // Enabled feature with numeric limit
    if (f.limitValue !== null && f.limitValue !== undefined) {
      if (f.limitValue === -1) {
        return { text: `Unlimited ${label}`, enabled: true }
      }
      if (f.limitValue === 0) {
        return { text: label, enabled: false }
      }
      // Format number (supports decimals like 0.5 GB)
      const formatted = f.limitValue % 1 !== 0
        ? f.limitValue
        : f.limitValue.toLocaleString()
      return {
        text: unit ? `${formatted} ${unit} ${label}` : `${formatted} ${label}`,
        enabled: true,
      }
    }

    // Boolean feature (no limit)
    return { text: label, enabled: true }
  }

  const getDisplayFeatures = (plan) => {
    if (!plan.features || !Array.isArray(plan.features)) return []

    // Filter out features marked isPublic: false in backend FeatureDefinition
    const publicFeatures = plan.features.filter((f) => {
      const def = featureDefs[f.featureCode]
      return !def || def.isPublic !== false // if no def found, show it; if def exists, respect isPublic
    })

    // Sort by backend displayOrder
    const sorted = [...publicFeatures].sort((a, b) => {
      const orderA = featureDefs[a.featureCode]?.displayOrder || 0
      const orderB = featureDefs[b.featureCode]?.displayOrder || 0
      return orderA - orderB
    })

    // Format all features
    const formatted = sorted.map(formatFeature)

    // Show enabled first (max 8), then disabled (max 3)
    const enabled = formatted.filter((f) => f.enabled).slice(0, 8)
    const disabled = formatted.filter((f) => !f.enabled).slice(0, 3)
    return [...enabled, ...disabled]
  }

  // ─── Plan Selection Handler ───
  const handlePlanSelect = async (plan) => {
    const price = billingCycle === "yearly" ? plan.pricing?.yearly : plan.pricing?.monthly

    if (price === null || price === undefined) {
      Swal.fire({
        icon: "info",
        title: "Enterprise Plan",
        text: "Please contact our sales team for enterprise pricing.",
      })
      return
    }

    if (!user) {
      navigate(`/auth-gateway?plan=${plan.code}&billing=${billingCycle}`)
      return
    }

    // Existing subscriber (companyAdmin) → redirect to admin billing
    if (user.role === 'companyAdmin' && user.tenant) {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'
      window.location.href = `${adminUrl}/app/subscription/my-plan`
      return
    }

    setCheckoutLoading(plan.code)
    try {
      const token = localStorage.getItem("accessToken")
      const res = await API.post(
        "/subscriptions/onboard",
        { planCode: plan.code, billingCycle },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.success) {
        if (res.data.action === "checkout" && res.data.url) {
          window.location.href = res.data.url
        } else if (res.data.action === "subscribed") {
          const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"
          window.location.href = `${adminUrl}/app/onboarding`
        } else if (res.data.action === "billing_portal" && res.data.url) {
          window.location.href = res.data.url
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      })
    } finally {
      setCheckoutLoading(null)
    }
  }

  const getButtonText = (plan) => {
    const price = billingCycle === "yearly" ? plan.pricing?.yearly : plan.pricing?.monthly
    if (price === null || price === undefined) return "Contact Sales"
    if (price === 0) return "Start Free"
    if (plan.trial?.enabled) return `Start ${plan.trial.days}-Day Trial`
    return "Get Started"
  }

  // ─── Loading State ───
  if (loading) {
    return (
      <>
        <Hero title="Pricing" description="Loading plans...">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Hero>
      </>
    )
  }

  // ─── Compute max discount from actual plan data ───
  const maxDiscount = Math.max(...plans.map((p) => p.yearlyDiscount || 0), 0)

  return (
    <>
      <Hero
        title="Simple, Transparent Pricing"
        description="Choose the plan that's right for your organization. Scale as you grow."
      >
        <div className="d-flex justify-content-center gap-3">
          <a href="#pricing-plans" className="btn btn-primary btn-lg">
            View Plans
          </a>
          <a href="#" className="btn btn-outline-primary btn-lg">
            Contact Sales
          </a>
        </div>
      </Hero>

      <section className="pricing-section" id="pricing-plans">
        <div className="container">
          {/* Billing Cycle Toggle */}
          <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${billingCycle === "monthly" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`btn ${billingCycle === "yearly" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                {maxDiscount > 0 && (
                  <span className="badge bg-success ms-2">Save {maxDiscount}%</span>
                )}
              </button>
            </div>
          </div>

          {/* Plan Cards — responsive 4-column grid */}
          <div className="row justify-content-center">
            {plans.map((plan) => {
              const displayFeatures = getDisplayFeatures(plan)
              const monthlyEq = getMonthlyEquivalent(plan)
              const discount = plan.yearlyDiscount || 0

              return (
                <div className="col-lg-3 col-md-6 mb-4" key={plan._id || plan.code}>
                  <div
                    className={`pricing-card ${plan.badge ? "featured" : ""}`}
                    style={{
                      border: plan.badge ? "2px solid var(--rater-pro-purple)" : "1px solid #e9ecef",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-12px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 1,
                        }}
                      >
                        <span
                          className="badge"
                          style={{
                            background: "var(--rater-pro-purple)",
                            padding: "6px 16px",
                            fontSize: "0.8rem",
                            borderRadius: "20px",
                          }}
                        >
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="pricing-header">
                      <h3 style={{ color: "white", marginBottom: "5px" }}>{plan.name}</h3>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: 0 }}>
                        {plan.description}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="pricing-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      {/* Price */}
                      <div className="price">
                        {getPrice(plan)}
                        <span>{getPriceSuffix(plan)}</span>
                      </div>

                      {/* Yearly monthly equivalent */}
                      {monthlyEq && (
                        <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "-10px", marginBottom: "10px" }}>
                          {monthlyEq}
                        </p>
                      )}

                      {/* Yearly discount badge */}
                      {billingCycle === "yearly" && discount > 0 && (
                        <div style={{ marginBottom: "15px" }}>
                          <span className="badge bg-success" style={{ fontSize: "0.75rem" }}>
                            Save {discount}% vs monthly
                          </span>
                        </div>
                      )}

                      {/* Trial badge */}
                      {plan.trial?.enabled && (
                        <div style={{ marginBottom: "15px" }}>
                          <span
                            className="badge"
                            style={{
                              background: "#fff3cd",
                              color: "#856404",
                              fontSize: "0.75rem",
                              padding: "5px 10px",
                            }}
                          >
                            <i className="fas fa-clock me-1"></i>
                            {plan.trial.days}-day free trial
                          </span>
                        </div>
                      )}

                      {/* Feature List */}
                      <ul className="feature-list" style={{ flex: 1 }}>
                        {displayFeatures.map((feature, idx) => (
                          <li
                            key={idx}
                            style={{
                              opacity: feature.enabled ? 1 : 0.45,
                              textDecoration: feature.enabled ? "none" : "line-through",
                            }}
                          >
                            <i
                              className={`fas ${feature.enabled ? "fa-check" : "fa-times"}`}
                              style={{
                                color: feature.enabled ? "var(--rater-pro-purple)" : "#ccc",
                              }}
                            ></i>{" "}
                            {feature.text}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        className={`btn w-100 ${plan.badge ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => handlePlanSelect(plan)}
                        disabled={checkoutLoading === plan.code}
                        style={{ marginTop: "auto" }}
                      >
                        {checkoutLoading === plan.code ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Processing...
                          </>
                        ) : (
                          getButtonText(plan)
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {plans.length === 0 && !loading && (
            <div className="text-center text-muted py-5">
              <p>No plans available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                {
                  q: "What's included in each plan?",
                  a: "Each plan includes core survey functionality. Higher tiers add advanced analytics, more responses, team collaboration, and priority support.",
                },
                {
                  q: "Can I upgrade or downgrade my plan later?",
                  a: "Yes, you can change your plan at any time. Upgrades take effect immediately with a prorated charge. Downgrades take effect at your next billing cycle.",
                },
                {
                  q: "Do you offer discounts for non-profits or education?",
                  a: "Yes, we offer special pricing for academic institutions and non-profit organizations. Please contact our sales team for more information.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal. Enterprise customers can also pay via invoice.",
                },
                {
                  q: "Is there a free trial available?",
                  a: "Yes, we offer a free trial for our paid plans. No credit card is required to start your trial.",
                },
              ].map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <div className="faq-question" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <i className={`fas ${activeFaq === idx ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
                  </div>
                  <div className={`faq-answer ${activeFaq === idx ? "show" : ""}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to get started with Rate Pro?"
        description="Join thousands of organizations that trust Rate Pro for their experience management needs."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Contact Sales"
      />
    </>
  )
}

export default Pricing
