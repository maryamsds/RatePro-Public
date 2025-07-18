const Step3Country = ({ onNext }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const country = e.target.country.value;
      onNext({ country });
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minHeight: 250,  }}>
        <h4>Select the Country where you had the experience</h4>
        <select name="country" className="form-select my-3" required>
          <option value="">-- Select Country --</option>
          <option value="Pakistan">Pakistan</option>
          <option value="India">India</option>
          <option value="UAE">UAE</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="btn btn-primary mb-0 mt-auto">Next</button>
      </form>
    );
  };
  
  export default Step3Country;
  