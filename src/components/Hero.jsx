const Hero = ({ title, description, children, backgroundClass = "" }) => {
    return (
      <section className={`hero d-flex align-items-center ${backgroundClass}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="mb-4">{title}</h1>
              <p className="lead mb-5">{description}</p>
              {children}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Hero
  