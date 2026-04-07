import { useEffect, useState, useRef } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import logo from "../assets/images/RATEPRO.png"
import { verifyEmail } from "../api/auth"

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code") // fix: it was `token` earlier, but you’re sending `code`
  const email = searchParams.get("email")
  const navigate = useNavigate()
  const location = useLocation()
  const [verifying, setVerifying] = useState(true)
  const hasCalledRef = useRef(false)

  useEffect(() => {
    // Guard against React strict mode double-invocation
    if (hasCalledRef.current) return
    hasCalledRef.current = true

    const verify = async () => {
      try {
        const res = await verifyEmail({ email, code });

        const planCode = res.data?.pendingPlanCode
        const billingCycle = res.data?.pendingBillingCycle || "monthly"

        if (planCode) {
          Swal.fire({
            icon: "success",
            title: "✅ Email Verified!",
            text: "Your email has been verified. Please log in to continue with your subscription.",
            confirmButtonText: "Continue to Login"
          }).then(() => {
            navigate(`/auth-gateway?plan=${planCode}&billing=${billingCycle}&verified=true`);
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "✅ Verified!",
            text: res.data.message || "Your email has been verified.",
            confirmButtonText: "Continue"
          }).then(() => {
            navigate("/login");
          });
        }

      } catch (error) {
        console.error("[VerifyEmail] Verification failed:", error.response?.data || error.message)
        Swal.fire({
          icon: "error",
          title: "❌ Verification Failed",
          text: error.response?.data?.message || "Something went wrong"
        });
      }
    };

    if (code && email) verify()
  }, [code, email, navigate])

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card text-center">
              <div className="flex justify-content-center align-items-center mb-3">
                <img src={logo || "/placeholder.svg"} alt="Rater Pro" height="50" className="me-2" />
                <div className="survanta">Rate Pro</div>
              </div>
              <h2 className="mt-3 mb-3">{verifying ? "Verifying your email..." : "Redirecting..."}</h2>
              <p className="text-muted">
                {verifying ? "Please wait while we verify your email." : "You'll be redirected shortly."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerifyEmail