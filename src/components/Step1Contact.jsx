import logo from "../assets/mobily-logo.png"; // replace with your local image path

const Step1Contact = ({ onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = e.target.contact.value;
    onNext({ contact });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white text-center py-4">
        <img src={logo} alt="Mobily Logo" style={{ maxHeight: 60 }} />
        <p className="mb-0">Roaming Experience SMS Survey</p>
      </div>

      {/* Main Form */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
          <h5 className="mb-3">
            <span className="text-danger">*</span> What is your mobile number?
          </h5>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <img
                src="https://flagcdn.com/24x18/sa.png"
                alt="Flag"
                style={{ width: 24, height: 18 }}
              />
            </span>
            <input
              type="tel"
              name="contact"
              className="form-control"
              placeholder="+966 545 100 009"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" disabled>
              Prev
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted py-2 small">
        az2.xebo.ai
      </footer>
    </div>
  );
};

export default Step1Contact;
