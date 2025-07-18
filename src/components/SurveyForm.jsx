import { useState } from "react";
import Step1Country from "./Step1Country"
import Step2Contact from "./Step2Contact"
import Step3Operator from "./Step3Operator"
import Step4Subscription from "./Step4Subscription"
import Step5Experience from "./Step5Experience"
import Step6ThankYou from "./Step6ThankYou"


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

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Country onNext={handleNext} />;
      case 2:
        return <Step2Contact onNext={handleNext} onPrev={handlePrevious} />;
      case 3:
        return <Step3Operator onNext={handleNext} onPrev={handlePrevious} />;
      case 4:
        return <Step4Subscription onNext={handleNext} onPrev={handlePrevious} />;
      case 5:
        return <Step5Experience onNext={handleNext} onPrev={handlePrevious} />;
      case 6:
        return <Step6ThankYou />;
      default:
        return null;
    }
  }; 

  return (
    <div className="d-flex flex-column">
      {/* Centered Form Box */}
      <div className="flex-grow-1 h-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-3 w-100" style={{ maxWidth: 700 }}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
