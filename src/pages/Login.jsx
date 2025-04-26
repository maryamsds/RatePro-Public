"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import logo from "../assets/images/rater_pro.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
  }

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img src={logo || "/placeholder.svg"} alt="Survanta" height="50" className="me-2" />
                  <div className="survanta">Survanta</div>
                </div>
                <h2 className="mt-3">Welcome back</h2>
                <p className="text-muted">Sign in to your account to continue</p>
              </div>
              <form onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                >
                  <img src="src/assets/images/google.png" alt="Google" height="20" className="me-2" />
                  Sign in with Google
                </button>
              </form>
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-decoration-none">
                    Sign Up
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

export default Login
