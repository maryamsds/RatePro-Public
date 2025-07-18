import logo from "../assets/mobily-logo.png"; // replace with your local image path

const Step1Contact = ({ onNext }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = e.target.contact.value;
        onNext({ contact });
    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
};

export default Step1Contact;
