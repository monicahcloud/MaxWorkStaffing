"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import SectionTitle from "@/components/SectionTitle";
import BackToTemplatesButton from "../templates/BackToTemplatesButton";
import { useEffect, useState } from "react";
import CoverLetterFooter from "../CoverLetterFooter";
import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import CoverLetterPreviewSection from "../CoverLetterPreviewSection";
import useAutoSaveCoverLetter from "../../coverletter/useAutoSaveCoverLetter";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import UserInfoForm from "./UserInfoForm";
import EmployerInfoForm from "./EmployerInfo";
import LetterBodyForm from "./LetterBody";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface StepFormProps {
  coverletterData: CoverLetterValues;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
  selectedTemplate: string;
}

const steps: {
  key: string;
  label: string;
  component: React.ComponentType<StepFormProps>;
}[] = [
  { key: "user", label: "Personal Info", component: UserInfoForm },
  { key: "employer", label: "Employer Info", component: EmployerInfoForm },
  { key: "body", label: "Letter Body", component: LetterBodyForm },
  // Add signature form when ready
];

export default function CoverLetterBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "Shabach";
  const [showPreview, setShowPreview] = useState(false);
  const [coverletterData, setCoverLetterData] = useState<CoverLetterValues>({});
  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      // Populate all default values here
      firstName: coverletterData.firstName || "",
      lastName: coverletterData.lastName || "",
      jobTitle: coverletterData.jobTitle || "",
      userEmail: coverletterData.userEmail || "",
      userPhone: coverletterData.companyPhone || "",
      userAddress: coverletterData.userAddress || "",
      website: coverletterData.website || "",
      linkedin: coverletterData.linkedin || "",
      gitHub: coverletterData.gitHub || "",
      recipientName: coverletterData.recipientName || "",
      companyName: coverletterData.companyName || "",
      companyEmail: coverletterData.companyEmail || "",
      companyPhone: coverletterData.companyPhone || "",
      companyAddress: coverletterData.companyAddress || "",
      themeColor: coverletterData.themeColor || "#000000", // or any default color
      borderStyle: coverletterData.borderStyle || "solid", // also required
      body: coverletterData.body || "",
      signatureUrl: coverletterData.signatureUrl || "",
      userPhoto:
        coverletterData.userPhoto instanceof File
          ? coverletterData.userPhoto
          : undefined,
    },
  });

  const currentStep = searchParams.get("step") || steps[0].key;
  const stepIndex = steps.findIndex((step) => step.key === currentStep);

  function setCurrentStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  useEffect(() => {
    const debouncedUpdate = debounce((values: CoverLetterValues) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel(); // Clean up debounce
    };
  }, [form, setCoverLetterData]);

  // const watched = form.watch();
  const { isSaving, hasUnsavedChanges } =
    useAutoSaveCoverLetter(coverletterData);
  useUnloadWarning(hasUnsavedChanges);

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Design Your Cover Letter"
          subtext={`Using "${templateId}" template`}
        />
        <div className="mt-4 px-1">
          <BackToTemplatesButton />
        </div>
      </header>{" "}
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="p-3 space-y-6 overflow-y-auto w-full md:w-1/2">
            {/* left side */}
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-semibold">Cover Letter Builder</h2>
              <p className="text-sm text-muted-foreground">
                Step {stepIndex + 1} of {steps.length}
              </p>
            </div>{" "}
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && (
              <FormProvider {...form}>
                <FormComponent
                  coverletterData={coverletterData}
                  setCoverLetterData={setCoverLetterData}
                  selectedTemplate={templateId}
                />
              </FormProvider>
            )}
          </div>
          <div className="grow md:border-right" />
          <div className="hidden w-1/2 md:flex border-l p-4 overflow-y-auto bg-secondary">
            {/* right side */}
            {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
            <CoverLetterPreviewSection
              coverLetterData={coverletterData}
              setCoverLetterData={setCoverLetterData}
              // className={cn("h-full w-full", showSmResumePreview && "flex")}
            />
          </div>
        </div>
      </main>
      <CoverLetterFooter
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        isSaving={isSaving}
        steps={steps}
      />
    </div>
  );
}

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

function Breadcrumbs({ currentStep, setCurrentStep }: BreadcrumbsProps) {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.label}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {/* Only show separator if not the last step */}
              {index !== steps.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
