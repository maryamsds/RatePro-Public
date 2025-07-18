const Step5Operator = ({ onNext }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const operator = e.target.operator.value;
      onNext({ operator });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h4>What is the name of your operator?</h4>
        <input
          type="text"
          name="operator"
          className="form-control my-3"
          placeholder="e.g. Jazz, Telenor, Zong"
          required
        />
  
        {/* Optional: Image section */}
        <div className="text-center my-3">
          <img
            src="https://via.placeholder.com/200x100?text=Operator+Logo"
            alt="Operator"
            className="img-fluid rounded"
          />
        </div>
  
        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    );
  };
  
  export default Step5Operator;
  