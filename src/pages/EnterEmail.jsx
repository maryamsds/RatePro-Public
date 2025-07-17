import { useState } from "react"
import { FaEnvelope } from "react-icons/fa"
import Swal from "sweetalert2"
import logo from "../assets/images/RATEPRO.png"
import { forgotPassword } from "../api/auth"

const EnterEmail = ({ onOTPSent }) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await forgotPassword({ email });
      Swal.fire("✅ OTP Sent", res.data.message || "Check your email", "success")
      onOTPSent(email)
    } catch (err) {
      Swal.fire("❌ Failed", err.response?.data?.message || "Something went wrong", "error")
    }
  }

  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-card text-center">
                <img src={logo} alt="Logo" height="50" className="mb-4" />
                <h2>Forgot Password</h2>
                <p>Enter your email to receive OTP</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span>
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Send OTP</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EnterEmail
