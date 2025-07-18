import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import ProductReviews from "./pages/ProductReviews"
import Integrations from "./pages/Integrations"
import Features from "./pages/Features"
import Widgets from "./pages/Widgets"
import Pricing from "./pages/Pricing"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import Signup from "./pages/Signup"
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow"
import Profile from "./pages/Profile"
import EnterOTP from "./pages/EnterOTP"
import SurveyForm from "./components/SurveyForm"

function App() {
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product-reviews" element={<ProductReviews />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="features" element={<Features />} />
        <Route path="widgets" element={<Widgets />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-code" element={<EnterOTP />} />
        <Route path="/take-survey" element={<SurveyForm />} />




        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />

      </Route>
    </Routes>
  )
}

export default App
