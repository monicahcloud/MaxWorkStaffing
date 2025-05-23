// components/TakeTourButton.tsx
"use client";

import { useNextStep } from "nextstepjs";

const ResumesTourButton = () => {
  const { startNextStep } = useNextStep();

  return (
    <button
      className="px-4 text-white bg-blue-500 rounded-md  "
      onClick={() => startNextStep("resumeTour")}>
      Start Tour
    </button>
  );
};
export default ResumesTourButton;
