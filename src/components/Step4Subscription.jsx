const Step4Subscription = ({ onNext }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const subscribed = e.target.subscribed.value;
      onNext({ subscribed });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h4>Have you subscribed to any of our offers?</h4>
        <div className="form-check my-2">
          <input
            type="radio"
            className="form-check-input"
            name="subscribed"
            value="Yes"
            id="subYes"
            required
          />
          <label className="form-check-label" htmlFor="subYes">Yes</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="subscribed"
            value="No"
            id="subNo"
          />
          <label className="form-check-label" htmlFor="subNo">No</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Next</button>
      </form>
    );
  };
  
  export default Step4Subscription;
  