/* eslint-disable @typescript-eslint/no-explicit-any */
// forms/CoverLetterFormBuilder.tsx
"use client";

import { FormProvider } from "react-hook-form";
import { useState } from "react";
import LetterBodyForm from "./LetterBody";
import CoverLetterFooter from "../CoverLetterFooter";
import Signature from "@/components/SignaturePad";
import UserInfoForm from "./UserInfoForm";
import EmployerInfoForm from "./EmployerInfo";
import { getContrastColor } from "@/lib/getContrastColor";
import { templateStyles } from "../templates/templateStyles";
import useAutoSaveCoverLetter from "../../coverletter/useAutoSaveCoverLetter";

const steps = [
  { key: "user", label: "Personal Info" },
  { key: "employer", label: "Employer Info" },
  { key: "body", label: "Letter Body" },
  { key: "signature", label: "Signature" },
];

export function CoverLetterFormBuilder({ form }: { form: any }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveCoverLetter(form.watch());

  const [selectedTemplate, setSelectedTemplate] = useState("Shabach");
  const [signatureUrl, setSignatureUrl] = useState("");
  const currentTemplateStyle = templateStyles[selectedTemplate] || {
    background: "#ffffff",
  };
  const penColor = getContrastColor(currentTemplateStyle.background);
  const stepComponents: Record<string, React.ReactNode> = {
    user: <UserInfoForm selectedTemplate={selectedTemplate} />,
    employer: <EmployerInfoForm />,
    body: <LetterBodyForm />,
    signature: (
      <Signature
        onSave={(dataUrl) => {
          setSignatureUrl(dataUrl);
          form.setValue("signatureUrl", dataUrl);
        }}
        defaultValue={signatureUrl}
        penColor={penColor}
        fontFamily={selectedTemplate === "Shabach" ? "cursive" : "serif"}
      />
    ),
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

        {stepComponents[steps[stepIndex].key]}

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
