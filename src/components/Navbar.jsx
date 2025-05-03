"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/images/RATEPRO_.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            
            <div className="survanta"><img src={logo || "/placeholder.svg"} alt="Rater Pro"  style={{ height: "70px", width:"150" }} className="me-2" /></div>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNavDropdown"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product-reviews" onClick={() => setIsOpen(false)}>
                Product Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/integrations" onClick={() => setIsOpen(false)}>
                Integrations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/features" onClick={() => setIsOpen(false)}>
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/widgets" onClick={() => setIsOpen(false)}>
                Widgets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
            </li>
          </ul>
          <div  className={`d-flex collapse  navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNavDropdown">
            <a href="#" className="btn btn-outline-primary me-2">
              Contact Sales
            </a>
            <Link to="/login" className="btn btn-primary"   onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar
