import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Step5Experience = ({ onNext, onPrev, formData, setShowModal }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const experience = e.target.experience.value;
    const dataToSave = { ...formData, experience };
    const user = localStorage.getItem("user");

    if (!user) {
      // 1. Save surveyData temporarily
      localStorage.setItem("pendingSurvey", JSON.stringify(dataToSave));
      localStorage.removeItem("surveyHandled");

      // 2. Close the modal
      if (setShowModal) setShowModal(false);

      // 3. Prompt login
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit your survey.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });

      return;
    }

    // If logged in, go to Thank You
    onNext({ experience });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ minHeight: 300 }}>
      <h4 className="pb-3">How was your experience?</h4>
      <div className="d-flex justify-content-between gap-6 mt-1">
        <div className="form-check ps-0 d-flex flex-column gap-1">
          <input type="radio" name="experience" className="mb-2" value="Extremely Satisfied" required /> 
          <span className="fs-6">😊 Extremely Satisfied</span>
        </div>
        <div className="form-check ps-0 d-flex flex-column gap-1">
          <input type="radio" name="experience" className="mb-2" value="Satisfied" /> 
          <span className="fs-6">🙂 Satisfied</span>
        </div>
        <div className="form-check ps-0 d-flex flex-column gap-1">
          <input type="radio" name="experience" className="mb-2" value="Neutral" /> 
          <span className="fs-6">😐 Neutral</span>
        </div>
        <div className="form-check ps-0 d-flex flex-column gap-1">
          <input type="radio" name="experience" className="mb-2" value="Dissatisfied" /> 
          <span className="fs-6">🙁 Dissatisfied</span>
        </div>
        <div className="form-check ps-0 d-flex flex-column gap-1">
          <input type="radio" name="experience" className="mb-2" value="Extremely Dissatisfied" /> 
          <span className="fs-6">😠 Extremely Dissatisfied</span>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-auto">
        <button type="button" className="btn btn-secondary" onClick={onPrev}>Prev</button>
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};

export default Step5Experience;
