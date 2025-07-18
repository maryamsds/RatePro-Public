const Step3Operator = ({ onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const operator = e.target.operator.value;
    onNext({ operator });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ minHeight: 300 }}>
      <h4>What is the name of your operator?</h4>
      <input
        type="text"
        name="operator"
        className="form-control my-3"
        placeholder="e.g. Jazz, Telenor, Zong"
        required
      />

      <div className="text-center mb-3">
        <img src="https://via.placeholder.com/200x100?text=Operator+Logo" alt="Operator" className="img-fluid rounded" />
      </div>

      <div className="d-flex justify-content-between mt-auto">
        <button type="button" className="btn btn-secondary" onClick={onPrev}>Prev</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};
  
  export default Step3Operator;
  