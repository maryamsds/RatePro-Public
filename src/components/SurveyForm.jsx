import { useState } from "react";
import Step1Contact from "./Step1Contact";
import Step2Experience from "./Step2Experience";
import Step3Country from "./Step3Country";
import Step4Subscription from "./Step4Subscription";
import Step5Operator from "./Step5Operator";
import Step6ThankYou from "./Step6ThankYou";

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contact: "",
    experience: "",
    country: "",
    subscribed: "",
    operator: "",
  });

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
          return <Step3Country onNext={handleNext} />;
          case 2:
          return <Step1Contact onNext={handleNext} />;
          case 3:
          return <Step2Experience onNext={handleNext} />;
      case 4:
        return <Step4Subscription onNext={handleNext} />;
      case 5:
        return <Step5Operator onNext={handleNext} />;
      case 6:
        return <Step6ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Header (optional, can be removed if not needed globally) */}
      <div className="bg-primary text-white text-center py-4">
        <h4 className="mb-0">Roaming Experience SMS Survey</h4>
      </div>

      {/* Centered Form Box */}
      <div className="flex-grow-1 h-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4 w-100" style={{ maxWidth: 500, minHeight: 300 }}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
