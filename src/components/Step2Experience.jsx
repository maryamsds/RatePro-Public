const Step2Experience = ({ onNext }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const experience = e.target.experience.value;
      onNext({ experience });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h4>How was your experience?</h4>
        <div className="form-check my-2">
          <input type="radio" name="experience" value="Extremely Satisfied" required /> 😊 Extremely Satisfied
        </div>
        <div className="form-check">
          <input type="radio" name="experience" value="Satisfied" /> 🙂 Satisfied
        </div>
        <div className="form-check">
          <input type="radio" name="experience" value="Neutral" /> 😐 Neutral
        </div>
        <div className="form-check">
          <input type="radio" name="experience" value="Dissatisfied" /> 🙁 Dissatisfied
        </div>
        <div className="form-check">
          <input type="radio" name="experience" value="Extremely Dissatisfied" /> 😠 Extremely Dissatisfied
        </div>
        <button type="submit" className="btn btn-primary mt-3">Next</button>
      </form>
    );
  };
  
  export default Step2Experience;
  