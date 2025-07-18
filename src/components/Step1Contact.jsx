const Step1Contact = ({ onNext }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const contact = e.target.contact.value;
      onNext({ contact });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h4>Enter your Contact Number</h4>
        <input
          type="tel"
          name="contact"
          className="form-control my-3"
          placeholder="e.g. +92XXXXXXXXX"
          required
        />
        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    );
  };
  
  export default Step1Contact;
  