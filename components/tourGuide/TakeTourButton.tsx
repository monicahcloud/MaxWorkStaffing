// components/TakeTourButton.tsx
"use client";

import { useNextStep } from "nextstepjs";
import { Button } from "../ui/button";

const TakeTourButton = () => {
  const { startNextStep } = useNextStep();

  return (
    <Button
      variant="outline"
      className="px-4 rounded-md  "
      onClick={() => startNextStep("mainTour")}>
      Start Tour
    </Button>
  );
};
export default TakeTourButton;
