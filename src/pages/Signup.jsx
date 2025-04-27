"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import logo from "../assets/images/rater_pro.png"
import googleLogo from "../assets/images/google.png"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ fullName, email, password, confirmPassword })
  }

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img src={logo || "/placeholder.svg"} alt="Rater Pro" height="50" className="me-2" />
                  <div className="survanta">Rater Pro</div>
                </div>
                <h2 className="mt-3">Welcome</h2>
                <p className="text-muted">Sign Up to your account to continue</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-field">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control password-input"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="password-field">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control password-input"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                >
                  <img src={googleLogo} alt="Google" height="20" className="me-2" />
                  Sign up with Google
                </button>
              </form>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
