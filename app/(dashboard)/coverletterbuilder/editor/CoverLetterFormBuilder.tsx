"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import UserInfoForm from "./UserInfoForm";
import { Button } from "@/components/ui/button";
import EmployerInfoForm from "./EmployerInfo";
import LetterBodyForm from "./LetterBody";

const steps = ["employer", "user", "body"];

export function CoverLetterFormBuilder({
  recipientName,
  setRecipientName,
  companyName,
  setCompanyName,
  jobTitle,
  setJobTitle,
  body,
  // setBody,
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const form = useForm({
    defaultValues: {
      recipientName,
      companyName,
      jobTitle,
      body,
      userName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
      employerEmail: "",
      employerPhone: "",
      employerAddress: "",
      userPhoto: undefined,
    },
  });

  const CurrentStep = () => {
    switch (steps[stepIndex]) {
      case "user":
        return <UserInfoForm jobTitle={jobTitle} setJobTitle={setJobTitle} />;
      case "employer":
        return (
          <EmployerInfoForm
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            companyName={companyName}
            setCompanyName={setCompanyName}
          />
        );

      case "body":
        return <LetterBodyForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 mt-8">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Cover Letter Builder</h2>
        <p className="text-sm text-muted-foreground">
          Step {stepIndex + 1} of {steps.length}
        </p>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form className="space-y-6">
            <CurrentStep />

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((i) => i - 1)}>
                Back
              </Button>

              <Button
                type="button"
                onClick={() =>
                  setStepIndex((i) => Math.min(i + 1, steps.length - 1))
                }>
                {stepIndex === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
