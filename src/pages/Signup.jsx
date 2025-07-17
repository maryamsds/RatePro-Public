"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import logo from "../assets/images/RATEPRO.png"
import googleLogo from "../assets/images/google.png"
import { registerUser } from "../api/auth"
import Swal from 'sweetalert2'


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please re-enter.',
      });
      return;
    }

    console.log("Submitted Role:", role);

    try {
      const res = await registerUser({
        name: fullName,
        email,
        password,
        role,
        source: "public"
      });
      console.log("User saved with role:", res);


      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'A verification email has been sent to your inbox. Please verify to log in.',
      }).then(() => {
        navigate("/login");
      });;

      // Optional: reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.error || 'Something went wrong. Please try again.',
      });
      console.error("Register Error:", error.response?.data || error.message);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img src={logo || "/placeholder.svg"} alt="Rater Pro" height="50" className="me-2" />
                  <div className="survanta">Rate Pro</div>
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
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <div className="input-group">
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="block w-100 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="" disabled hidden>Select Role</option>
                      <option value="company">Company</option>
                      <option value="user">User</option>
                    </select>
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
