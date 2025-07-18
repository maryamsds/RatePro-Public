const Step1Country = ({ onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const country = e.target.country.value;
    onNext({ country });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ minHeight: 300 }}>
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
      <div className="text-end mt-auto">
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};

export default Step1Country;