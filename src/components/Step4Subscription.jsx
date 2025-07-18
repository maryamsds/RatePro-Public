const Step4Subscription = ({ onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const subscribed = e.target.subscribed.value;
    onNext({ subscribed });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ minHeight: 300 }}>
      <h4>Have you subscribed to any of our offers?</h4>
      <div className="form-check my-2">
        <input type="radio" className="form-check-input" name="subscribed" value="Yes" id="subYes" required />
        <label className="form-check-label" htmlFor="subYes">Yes</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="subscribed" value="No" id="subNo" />
        <label className="form-check-label" htmlFor="subNo">No</label>
      </div>

      <div className="d-flex justify-content-between mt-auto">
        <button type="button" className="btn btn-secondary" onClick={onPrev}>Prev</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};

export default Step4Subscription;
