// // EnterOTP.jsx

// import { useState } from "react";
// import Swal from "sweetalert2";
// import { MdVpnKey } from "react-icons/md";
// import axios from "axios";
// import logo from "../assets/images/RATEPRO.png"

// const EnterOTP = ({ email, onVerified }) => {
//     const [otp, setOtp] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         console.log("Sending OTP verification request:", { email, code: otp });

//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/verify-reset-code", {
//                 email,
//                 code: otp,
//             });

//             Swal.fire("✅ Verified", res.data.message, "success");
//             onVerified(email, otp);
//         } catch (error) {
//             Swal.fire("❌ Failed", error.response?.data?.message || "Invalid code", "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="login-section">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-6 col-lg-5">
//               <div className="login-card text-center">
//                 <img src={logo} alt="Logo" height="50" className="mb-4" />
//                 <h2>Forgot Password</h2>
//                 <p>Enter your OTP to reset password</p>
  
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3 text-start">
//                     <label className="form-label">OTP Code</label>
//                     <div className="input-group">
//                       <span className="input-group-text">
//                         <MdVpnKey />
//                       </span>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
  
//                   <button
//                     type="submit"
//                     className="btn btn-primary w-100"
//                     disabled={loading}
//                   >
//                     {loading ? "Verifying..." : "Verify OTP"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
// };

// export default EnterOTP;
// import { useState } from "react";
// import Swal from "sweetalert2";
// import { MdVpnKey } from "react-icons/md";
// import axios from "axios";
// import logo from "../assets/images/RATEPRO.png";

// const EnterOTP = ({ email, purpose = "forgot", onVerified }) => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Select API route based on purpose
//       const endpoint =
//         purpose === "security"
//           ? "/api/auth/verify-security-otp"
//           : "/api/auth/verify-reset-code";

//       const res = await axios.post(`http://localhost:5000${endpoint}`, {
//         email,
//         code: otp,
//       });

//       Swal.fire("✅ Verified", res.data.message, "success");
//       if (onVerified) onVerified(email, otp);
//     } catch (error) {
//       Swal.fire("❌ Failed", error.response?.data?.message || "Invalid code", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="login-section">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6 col-lg-5">
//             <div className="login-card text-center">
//               <img src={logo} alt="Logo" height="50" className="mb-4" />
//               <h2>{purpose === "security" ? "Security Verification" : "Forgot Password"}</h2>
//               <p>Enter the OTP sent to your email</p>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3 text-start">
//                   <label className="form-label">OTP Code</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <MdVpnKey />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={loading}
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EnterOTP;
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdVpnKey } from "react-icons/md";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/RATEPRO.png";

const EnterOTP = ({ email: propEmail, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback to email from URL query if not passed via props
  const queryParams = new URLSearchParams(location.search);
  const email = propEmail || queryParams.get("email");

  useEffect(() => {
    if (!email) {
      Swal.fire("❌ Missing Email", "Email is required to verify OTP", "error");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-reset-code", {
        email,
        code: otp,
      });

      Swal.fire("✅ Verified", res.data.message, "success");

      if (onVerified) {
        onVerified(email, otp); // flow mode
      } else {
        navigate(`/reset-password?email=${email}&otp=${otp}`); // standalone mode
      }
    } catch (error) {
      Swal.fire("❌ Failed", error.response?.data?.message || "Invalid code", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card text-center">
              <img src={logo} alt="Logo" height="50" className="mb-4" />
              <h2>Verify OTP</h2>
              <p>Enter the OTP sent to your email</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label className="form-label">OTP Code</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <MdVpnKey />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterOTP;

