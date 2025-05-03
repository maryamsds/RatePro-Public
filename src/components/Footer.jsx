import { Link } from "react-router-dom"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import logo from "../assets/images/RATEPROBlack.png"

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="footer-logo">
              <div className="d-flex align-items-center">
                <div className="survanta">                
                  <img src={logo || "/placeholder.svg"} alt="Rater Pro" style={{ height: "140px", width: "170" }} className="me-2" />                
                </div>
              </div>
            </div>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Products</h5>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product-reviews">Product Reviews</Link>
                </li>
                <li>
                  <Link to="/integrations">Integrations</Link>
                </li>
                <li>
                  <Link to="/features">Features</Link>
                </li>
                <li>
                  <Link to="/widgets">Widgets</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Resources</h5>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Case Studies</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Guides</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Training</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Company</h5>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Partners</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Legal</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright text-center">
          <p>© 2025 Rate Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
