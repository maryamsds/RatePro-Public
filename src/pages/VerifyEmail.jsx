import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code") // fix: it was `token` earlier, but you’re sending `code`
  const email = searchParams.get("email")
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/verify-email", {
          code,
          email
        })

        Swal.fire({
          icon: "success",
          title: "✅ Verified!",
          text: res.data.message || "Your email has been verified.",
          confirmButtonText: "Continue"
        }).then(() => {
          navigate("/login")
        })

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "❌ Verification Failed",
          text: error.response?.data?.message || "Something went wrong"
        })
      }
    }

    if (code && email) verify()
  }, [code, email, navigate])

  return (
    <div className="text-center mt-5">
      <h2>Verifying your email...</h2>
    </div>
  )
}

export default VerifyEmail