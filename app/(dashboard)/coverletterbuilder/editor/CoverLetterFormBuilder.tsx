"use client";

import { FormProvider } from "react-hook-form";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import UserInfoForm from "./UserInfoForm";
import EmployerInfoForm from "./EmployerInfo";
import LetterBodyForm from "./LetterBody";
import CoverLetterFooter from "../CoverLetterFooter";
import Signature from "@/components/SignaturePad";

const steps = [
  { key: "user", label: "Personal Info" },
  { key: "employer", label: "Employer Info" },
  { key: "body", label: "Letter Body" },
  { key: "signature", label: "Signature" },
];

export function CoverLetterFormBuilder({ form }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Shabach");
  const [signatureUrl, setSignatureUrl] = useState("");

  const CurrentStep = () => {
    switch (steps[stepIndex].key) {
      case "user":
        return <UserInfoForm selectedTemplate={selectedTemplate} />;
      case "employer":
        return <EmployerInfoForm />;
      case "body":
        return <LetterBodyForm />;
      case "signature":
        return (
          <Signature
            onSave={(dataUrl) => {
              setSignatureUrl(dataUrl);
              console.log("Signature saved!", dataUrl);
              form.setValue("signatureUrl", dataUrl);
            }}
            defaultValue={signatureUrl}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
    </FormProvider>
  );
}
