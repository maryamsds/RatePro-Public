// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import logo from "../assets/images/RATEPRO_.png"
// import {
//   MdAccountCircle,
//   MdExitToApp,
//   MdPerson,
//   MdSettings,
// } from "react-icons/md"
// import { useAuth } from "../context/AuthContext"


// const Navbar = () => {
//   const { user } = useAuth()
//   const [isOpen, setIsOpen] = useState(false)
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   // const [user, setUser] = useState(null)
//   const dropdownRef = useRef(null)
//   const navigate = useNavigate()

//   const toggleNavbar = () => setIsOpen(!isOpen)

//   const capitalize = (str) => str?.charAt(0).toUpperCase() + str.slice(1)

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser)
//         setUser(parsedUser)
//       } catch (error) {
//         console.error("Failed to parse user:", error)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("user")
//     setUser(null)
//     navigate("/login")
//   }

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           <img
//             src={logo || "/placeholder.svg"}
//             alt="Rater Pro"
//             style={{ height: "70px", width: "150px" }}
//             className="me-2"
//           />
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleNavbar}
//           aria-controls="navbarNavDropdown"
//           aria-expanded={isOpen}
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNavDropdown">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {[
//               { to: "/", label: "Home" },
//               { to: "/product-reviews", label: "Product Reviews" },
//               { to: "/integrations", label: "Integrations" },
//               { to: "/features", label: "Features" },
//               { to: "/widgets", label: "Widgets" },
//               { to: "/pricing", label: "Pricing" },
//             ].map((item) => (
//               <li className="nav-item" key={item.to}>
//                 <Link className="nav-link" to={item.to} onClick={() => setIsOpen(false)}>
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="d-flex align-items-center">
//             <a href="#" className="btn btn-outline-primary me-2">
//               Contact Sales
//             </a>

//             {!user && (
//               <Link
//                 to="/login"
//                 className="btn btn-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Sign In
//               </Link>
//             ) : (
//               <div className="dropdown" ref={dropdownRef}>
//                 <button
//                   className="btn d-flex align-items-center dropdown-toggle"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   type="button"
//                 >
//                   <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2" style={{ width: "36px", height: "36px" }}>
//                     <MdPerson className="text-secondary" size={20} />
//                   </div>
//                   <span className="d-none d-lg-inline">
//                     {capitalize(user?.name?.split(" ")[0])}
//                   </span>
//                 </button>

//                 <ul
//                   className={`dropdown-menu dropdown-menu-end mt-2 ${dropdownOpen ? "show" : ""}`}
//                 >
//                   <li className="px-3 py-2 border-bottom">
//                     <h6 className="mb-0 text-capitalize">{capitalize(user?.role)}</h6>
//                     <small className="text-muted">{user.email}</small>
//                   </li>

//                   <li>
//                     <Link to="/profile" className="dropdown-item d-flex align-items-center">
//                       <MdAccountCircle className="me-2" /> Profile
//                     </Link>
//                   </li>

//                   <li>
//                     <Link to="/settings" className="dropdown-item d-flex align-items-center">
//                       <MdSettings className="me-2" /> Settings
//                     </Link>
//                   </li>

//                   <li><hr className="dropdown-divider" /></li>

//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="dropdown-item text-danger d-flex align-items-center"
//                     >
//                       <MdExitToApp className="me-2" /> Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/RATEPRO_.png"
import {
  MdAccountCircle,
  MdExitToApp,
  MdPerson,
  MdSettings,
} from "react-icons/md"
import { useAuth } from "../context/AuthContext"
import SurveyModal from "./SurveyModal"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const [showSurvey, setShowSurvey] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen)
  const capitalize = (str) => str?.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo || "/placeholder.svg"}
              alt="Rate Pro"
              style={{ height: "auto", width: "120px", aspectRatio: "16/9" }}
              className="me-2"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNavDropdown"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                { to: "/", label: "Home" },
                { to: "/product-reviews", label: "Product Reviews" },
                { to: "/integrations", label: "Integrations" },
                { to: "/features", label: "Features" },
                { to: "/widgets", label: "Widgets" },
                { to: "/pricing", label: "Pricing" },
              ].map((item) => (
                <li className="nav-item" key={item.to}>
                  <Link
                    className="nav-link"
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-primary ms-auto me-3"
                onClick={() => setShowSurvey(true)}
              >
                Take Survey
              </button>
              {/* <Link to="/take-survey" className="btn btn-outline-primary me-2">
              Take Survey
            </Link> */}

              {!user ? (
                <Link
                  to="/login"
                  className="btn btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    className="btn d-flex align-items-center dropdown-toggle"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                    aria-expanded={dropdownOpen}
                  >
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <MdPerson className="text-secondary" size={20} />
                    </div>
                    <span className="d-none d-lg-inline">
                      {capitalize(user?.name?.split?.(" ")[0] || "")}
                    </span>
                  </button>

                  <ul
                    className={`dropdown-menu dropdown-menu-end mt-2 ${dropdownOpen ? "show" : ""
                      }`}
                  >
                    <li className="px-3 py-2 border-bottom">
                      <h6 className="mb-0 text-capitalize">
                        {capitalize(user?.role)}
                      </h6>
                      <small className="text-muted">{user?.email}</small>
                    </li>

                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item d-flex align-items-center"
                      >
                        <MdAccountCircle className="me-2" /> Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/settings"
                        className="dropdown-item d-flex align-items-center"
                      >
                        <MdSettings className="me-2" /> Settings
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger d-flex align-items-center"
                      >
                        <MdExitToApp className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Show Modal */}
      <SurveyModal show={showSurvey} onClose={() => setShowSurvey(false)} />
    </>
  )
}

export default Navbar
