import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import ProductReviews from "./pages/ProductReviews"
import Integrations from "./pages/Integrations"
import Features from "./pages/Features"
import Widgets from "./pages/Widgets"
import Pricing from "./pages/Pricing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
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
      </Route>
    </Routes>
  )
}

export default App
