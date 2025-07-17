import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import logo from "../assets/images/RATEPRO.png"
import { verifyEmail } from "../api/auth"

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code") // fix: it was `token` earlier, but you’re sending `code`
  const email = searchParams.get("email")
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail({ email, code });

        Swal.fire({
          icon: "success",
          title: "✅ Verified!",
          text: res.data.message || "Your email has been verified.",
          confirmButtonText: "Continue"
        }).then(() => {
          navigate("/login");
        });

      } catch (error) {
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
              <div className="d-flex justify-content-center align-items-center mb-3">
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