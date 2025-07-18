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

  return (
    <div className="container mt-5">
      {step === 1 && <Step1Contact onNext={handleNext} />}
      {step === 2 && <Step2Experience onNext={handleNext} />}
      {step === 3 && <Step3Country onNext={handleNext} />}
      {step === 4 && <Step4Subscription onNext={handleNext} />}
      {step === 5 && <Step5Operator onNext={handleNext} />}
      {step === 6 && <Step6ThankYou />}
    </div>
  );
};

export default SurveyForm;
