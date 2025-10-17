
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import logo from "../assets/images/RATEPRO.png"
import googleLogo from "../assets/images/google.png"
import { loginUser } from "../api/auth"
import { useAuth } from "../context/AuthContext" // 👈 import auth context
import Swal from "sweetalert2"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth() // 👈 use login from context
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email) setEmailError("Email is required.");
    if (!password) setPasswordError("Password is required.");
    if (!email || !password) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ email, password, source: "public", });
      const { accessToken, user } = res.data;

      if (!user.isVerified) {
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: "Please verify your email before logging in.",
          confirmButtonText: "Verify Now",
        }).then(() => {
          navigate(`/verify-email?email=${email}`);
        });
        return;
      }

      // ✅ Admin or CompanyAdmin trying to log in on public site
      if (user.role === "admin" || user.role === "companyAdmin") {
        Swal.fire({
          icon: "info",
          title: "Restricted Access",
          text: "This platform is intended for regular users only. As an administrator, please use the Admin Dashboard to access your tools and features.",
          showCancelButton: true,
          confirmButtonText: "Go to Admin Dashboard",
          cancelButtonText: "Stay Here",
        }).then((result) => {
          if (result.isConfirmed) {
            const token = accessToken;
            const encodedUser = encodeURIComponent(JSON.stringify(user));
            window.location.href = `https://rate-pro-admin-six.vercel.app/app?token=${token}&user=${encodedUser}`;
          }
          // No action if cancelled
        });
        return;
      }


      // ✅ Normal user login success
      login(user);
      navigate("/");

    } catch (err) {
      const message = err?.response?.data?.message || "Login failed. Please try again.";

      if (err.response?.status === 401 && message.includes("Email not verified")) {
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: "Please verify your email.",
          confirmButtonText: "Verify Now",
        }).then(() => {
          navigate(`/verify-email?email=${email}`);
        });
      } else {
        setGeneralError(message);
      }

    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
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
                <h2 className="mt-3">Welcome back</h2>
                <p className="text-muted">Sign in to your account to continue</p>
              </div>
              <form onSubmit={handleSubmit}>
                {generalError && <div className="text-danger text-center mt-3">{generalError}</div>}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {emailError && <div className="text-danger mt-2">{emailError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="password-field">
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control password-input"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
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
                  <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                  onClick={handleGoogleLogin}
                >
                  <img src={googleLogo} alt="Google" height="20" className="me-2" />
                  Sign in with Google
                </button>
              </form>
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-decoration-none">Sign Up</Link>
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