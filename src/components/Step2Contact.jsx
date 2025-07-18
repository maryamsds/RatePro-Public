const Step2Contact = ({ onNext, onPrev }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = e.target.contact.value;
        onNext({ contact });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ minHeight: 250 }}>
            <h5 className="mb-3">
                <span className="text-danger">*</span> What is your mobile number?
            </h5>
            <div className="input-group mb-4">
                <span className="input-group-text">
                    <img src="https://flagcdn.com/24x18/sa.png" alt="Flag" style={{ width: 24, height: 18 }} />
                </span>
                <input type="tel" name="contact" className="form-control" placeholder="+966 545 100 009" required />
            </div>

            <div className="d-flex justify-content-between mt-auto">
                <button type="button" className="btn btn-secondary" onClick={onPrev}>Prev</button>
                <button type="submit" className="btn btn-primary">Next</button>
            </div>
        </form>
    );
};

export default Step2Contact;
