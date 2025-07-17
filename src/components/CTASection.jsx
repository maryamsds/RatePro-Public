const CTASection = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink = "#",
  secondaryButtonLink = "#",
}) => {
  return (
    <section className="cta-section text-center text-white" style={{ backgroundColor: "var(--rater-pro-purple)" }}>
      <div className="container">
        <h2 className="mb-3 fw-bold">{title}</h2>
        <p className="mb-4 fs-5">{description}</p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <a href={primaryButtonLink} className="btn btn-light btn-lg px-4">
            {primaryButtonText}
          </a>
          <a href={secondaryButtonLink} className="btn btn-outline-light btn-lg px-4">
            {secondaryButtonText}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
