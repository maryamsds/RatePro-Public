"use client"

import { useState, useEffect } from "react"

const TestimonialsSection = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="testimonials-section py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "var(--rater-pro-purple)", fontWeight: 700 }}>
          Why Customers Love Survanta
        </h2>
        <div id="testimonialCarousel" className="carousel slide">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div
                      className="testimonial-card shadow-sm"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        padding: "30px",
                        position: "relative",
                      }}
                    >
                      <div className="testimonial-content">
                        <p
                          className="fs-5"
                          style={{
                            fontStyle: "italic",
                            color: "#333",
                            lineHeight: 1.6,
                          }}
                        >
                          "{testimonial.content}"
                        </p>
                        <div
                          className="testimonial-author mt-4"
                          style={{ fontWeight: 600, color: "var(--rater-pro-purple)" }}
                        >
                          {testimonial.author}
                        </div>
                        <div className="testimonial-role" style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators mt-4" style={{ position: "static" }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={activeIndex === index ? "active" : ""}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: activeIndex === index ? "var(--rater-pro-purple)" : "#b6ebe0",
                  border: "none",
                  margin: "0 5px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
