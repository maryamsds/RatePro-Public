import { useState } from "react"
import Swal from "sweetalert2"
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "../api/auth"

const ResetPassword = ({ email, otp }) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      Swal.fire("❌ Error", "Passwords do not match", "error")
      return
    }
    console.log("🚀 Sending Reset Request", { email, otp, newPassword: password })

    try {
      const res = await resetPassword({ email, code: otp, newPassword: password });
      Swal.fire("✅ Success", "Your password has been reset", "success")
      navigate("/login");
    } catch (err) {
      Swal.fire("❌ Failed", err.response?.data?.message || "Reset failed", "error")
    }
  }

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card text-center">
              <h2>Set New Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label className="form-label">New Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaLock /></span>
                    <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaLock /></span>
                    <input type={showPassword ? "text" : "password"} className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
                <button type="button" className="btn btn-outline-secondary w-100 mb-2" onClick={togglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />} Toggle Password
                </button>
                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
