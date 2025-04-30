// components/FormsTourButton.tsx
"use client";

import { useNextStep } from "nextstepjs";

const FormsTourButton = () => {
  const { startNextStep } = useNextStep();

  return (
    <button
      className="px-4 text-white bg-blue-500 rounded-md  "
      onClick={() => startNextStep("formTour")}>
      Start Tour
    </button>
  );
};
export default FormsTourButton;
