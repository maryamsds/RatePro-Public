const CTASection = ({
    title,
    description,
    primaryButtonText,
    secondaryButtonText,
    primaryButtonLink = "#",
    secondaryButtonLink = "#",
  }) => {
    return (
      <section className="cta-section">
        <div className="container">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="d-flex justify-content-center gap-3">
            <a href={primaryButtonLink} className="btn btn-light btn-lg">
              {primaryButtonText}
            </a>
            <a href={secondaryButtonLink} className="btn btn-outline-light btn-lg">
              {secondaryButtonText}
            </a>
          </div>
        </div>
      </section>
    )
  }
  
  export default CTASection
  