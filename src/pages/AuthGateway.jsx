"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { registerUser, loginUser } from "../api/auth"
import API from "../api/auth"
import PublicAPI from "../api/publicApi"
import logo from "../assets/images/RATEPRO.png"
import Swal from "sweetalert2"

const AuthGateway = () => {
    const [searchParams] = useSearchParams()
    const planCode = searchParams.get("plan")
    const billingCycle = searchParams.get("billing") || "monthly"
    const navigate = useNavigate()
    const { user, login } = useAuth()

    const [activeTab, setActiveTab] = useState("signup")
    const [loading, setLoading] = useState(false)
    const [planInfo, setPlanInfo] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Signup fields
    const [fullName, setFullName] = useState("")
    const [signupEmail, setSignupEmail] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Login fields
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    // Fetch plan info for sidebar
    useEffect(() => {
        if (planCode) {
            PublicAPI.get("/subscriptions/plans")
                .then((res) => {
                    if (res.data.success) {
                        const found = (res.data.data.plans || []).find((p) => p.code === planCode)
                        setPlanInfo(found || null)
                    }
                })
                .catch(() => { })
        }
    }, [planCode])

    // If already logged in, proceed to onboard
    useEffect(() => {
        if (user && planCode) {
            handleOnboard()
        }
    }, [user])

    const handleOnboard = async () => {
        if (!planCode) return
        setLoading(true)

        try {
            const token = localStorage.getItem("accessToken")
            const res = await API.post(
                "/subscriptions/onboard",
                { planCode, billingCycle },
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
                text: error.response?.data?.message || "Failed to start checkout. Please try again.",
            })
            setLoading(false)
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        if (signupPassword !== confirmPassword) {
            Swal.fire({ icon: "error", title: "Password Mismatch", text: "Passwords do not match." })
            return
        }

        setLoading(true)
        try {
            const res = await registerUser({
                name: fullName,
                email: signupEmail,
                password: signupPassword,
                source: "public",
            })

            // If email verification required
            if (res.data?.message?.includes("verify") || res.data?.message?.includes("verification")) {
                Swal.fire({
                    icon: "info",
                    title: "Verify Your Email",
                    text: "A verification email has been sent. Please verify your email, then log in to continue with your plan.",
                }).then(() => {
                    setActiveTab("login")
                    setLoginEmail(signupEmail)
                })
                setLoading(false)
                return
            }

            // Auto-login after signup if token provided
            if (res.data?.data?.token || res.data?.token) {
                const token = res.data?.data?.token || res.data?.token
                const userData = res.data?.data?.user || res.data?.user
                localStorage.setItem("accessToken", token)
                login(userData)
                // handleOnboard will be triggered by the useEffect watching `user`
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.response?.data?.error || error.response?.data?.message || "Something went wrong.",
            })
            setLoading(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await loginUser({ email: loginEmail, password: loginPassword })
            const token = res.data?.data?.token || res.data?.token
            const userData = res.data?.data?.user || res.data?.user

            if (token) {
                localStorage.setItem("accessToken", token)
                login(userData)
                // handleOnboard will be triggered by the useEffect watching `user`
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || "Invalid email or password.",
            })
            setLoading(false)
        }
    }

    const getPrice = () => {
        if (!planInfo?.pricing) return ""
        const price = billingCycle === "yearly" ? planInfo.pricing.yearly : planInfo.pricing.monthly
        if (price === 0) return "Free"
        return `$${price}/${billingCycle === "yearly" ? "year" : "month"}`
    }

    return (
        <section className="login-section" style={{ minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <div className="container">
                <div className="row justify-content-center">
                    {/* Plan Summary Sidebar */}
                    {planInfo && (
                        <div className="col-md-4 col-lg-4 mb-4 mb-md-0">
                            <div className="login-card" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
                                <div className="text-center mb-3">
                                    <span className="badge bg-primary mb-2">{planInfo.badge || "Selected Plan"}</span>
                                    <h3 className="mb-1">{planInfo.name}</h3>
                                    <p className="text-muted small">{planInfo.description}</p>
                                </div>
                                <div className="text-center mb-3">
                                    <h2 className="text-primary mb-0">{getPrice()}</h2>
                                    {billingCycle === "yearly" && planInfo.pricing?.monthly > 0 && (
                                        <small className="text-muted text-decoration-line-through">
                                            ${planInfo.pricing.monthly * 12}/year
                                        </small>
                                    )}
                                </div>
                                <hr />
                                <ul className="list-unstyled">
                                    {planInfo.features
                                        ?.filter((f) => f.enabled)
                                        .slice(0, 5)
                                        .map((f, idx) => (
                                            <li key={idx} className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                <small>{f.featureCode}</small>
                                            </li>
                                        ))}
                                </ul>
                                <div className="mt-3 text-center">
                                    <Link to="/pricing" className="text-muted small">
                                        <FaArrowLeft className="me-1" /> Change Plan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Auth Form */}
                    <div className={planInfo ? "col-md-6 col-lg-5" : "col-md-6 col-lg-5"}>
                        <div className="login-card">
                            <div className="text-center mb-4">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <img src={logo || "/placeholder.svg"} alt="Rate Pro" height="50" className="me-2" />
                                    <div className="survanta">Rate Pro</div>
                                </div>
                                <h2 className="mt-3">{planCode ? "Almost There!" : "Welcome"}</h2>
                                <p className="text-muted">
                                    {planCode
                                        ? "Sign up or log in to complete your subscription"
                                        : "Create an account or sign in"}
                                </p>
                            </div>

                            {/* Tabs */}
                            <ul className="nav nav-tabs nav-justified mb-4">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
                                        onClick={() => setActiveTab("signup")}
                                        disabled={loading}
                                    >
                                        Sign Up
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                                        onClick={() => setActiveTab("login")}
                                        disabled={loading}
                                    >
                                        Sign In
                                    </button>
                                </li>
                            </ul>

                            {/* Signup Form */}
                            {activeTab === "signup" && (
                                <form onSubmit={handleSignup}>
                                    <div className="mb-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaUser /></span>
                                            <input
                                                type="text" className="form-control" id="fullName"
                                                placeholder="Enter your name"
                                                value={fullName} onChange={(e) => setFullName(e.target.value)}
                                                required disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupEmail" className="form-label">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaEnvelope /></span>
                                            <input
                                                type="email" className="form-control" id="signupEmail"
                                                placeholder="Enter your email"
                                                value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                                                required disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupPassword" className="form-label">Password</label>
                                        <div className="password-field">
                                            <div className="input-group">
                                                <span className="input-group-text"><FaLock /></span>
                                                <input
                                                    type={showPassword ? "text" : "password"} className="form-control password-input"
                                                    id="signupPassword" placeholder="Create a password"
                                                    value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}
                                                    required disabled={loading}
                                                />
                                            </div>
                                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <div className="password-field">
                                            <div className="input-group">
                                                <span className="input-group-text"><FaLock /></span>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"} className="form-control password-input"
                                                    id="confirmPassword" placeholder="Confirm your password"
                                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required disabled={loading}
                                                />
                                            </div>
                                            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                                        ) : (
                                            "Create Account & Continue"
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Login Form */}
                            {activeTab === "login" && (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="loginEmail" className="form-label">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaEnvelope /></span>
                                            <input
                                                type="email" className="form-control" id="loginEmail"
                                                placeholder="Enter your email"
                                                value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                                required disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="loginPassword" className="form-label">Password</label>
                                        <div className="password-field">
                                            <div className="input-group">
                                                <span className="input-group-text"><FaLock /></span>
                                                <input
                                                    type={showPassword ? "text" : "password"} className="form-control password-input"
                                                    id="loginPassword" placeholder="Enter your password"
                                                    value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                                    required disabled={loading}
                                                />
                                            </div>
                                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                                        ) : (
                                            "Sign In & Continue"
                                        )}
                                    </button>
                                    <div className="text-center">
                                        <Link to="/forgot-password" className="text-muted small">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthGateway
