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
    <>
      <section className="testimonials-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-primary" style={{ color: "var(--rater-pro-purple)" }}>
            Why Customers Love Rate Pro
          </h2>

          <div id="testimonialCarousel" className="carousel slide">
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                  <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                      <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white position-relative">
                        <div className="testimonial-content">
                          <p className="fs-5 fst-italic text-dark lh-lg mb-4">
                            "{testimonial.content}"
                          </p>
                          <div className="fw-semibold" style={{ color: "var(--rater-pro-purple)" }}>
                            {testimonial.author}
                          </div>
                          <div className="text-muted small">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-circle border-0`}
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: activeIndex === index ? "var(--rater-pro-purple)" : "#b6ebe0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TestimonialsSection
