"use client";

import { FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import UserInfoForm from "./UserInfoForm";
import EmployerInfoForm from "./EmployerInfo";
import LetterBodyForm from "./LetterBody";
import CoverLetterFooter from "../CoverLetterFooter";
import { useState } from "react";

const steps = [
  { key: "employer", label: "Employer Info" },
  { key: "user", label: "Your Info" },
  { key: "body", label: "Letter Body" },
];

export function CoverLetterFormBuilder({ form }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const CurrentStep = () => {
    switch (steps[stepIndex].key) {
      case "user":
        return <UserInfoForm />;
      case "employer":
        return <EmployerInfoForm />;
      case "body":
        return <LetterBodyForm />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Cover Letter Builder</h2>
            <p className="text-sm text-muted-foreground">
              Step {stepIndex + 1} of {steps.length}
            </p>
          </div>
          <CurrentStep />
          <CoverLetterFooter
            currentStep={steps[stepIndex].key}
            setCurrentStep={(key) => {
              const index = steps.findIndex((step) => step.key === key);
              if (index !== -1) setStepIndex(index);
            }}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            isSaving={isSaving}
            steps={steps}
          />
        </form>
      </Form>
    </FormProvider>
  );
}
