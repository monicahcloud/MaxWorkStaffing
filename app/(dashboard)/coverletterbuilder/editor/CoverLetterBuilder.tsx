"use client";

import { useParams, useSearchParams } from "next/navigation";
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
import SignatureForm from "./SignatureForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { getcoverLetterById } from "./actions";
import { nullsToEmptyStrings } from "@/utils/nullsToEmptyStrings";
import { cn } from "@/lib/utils";

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
  { key: "signature", label: "Signature", component: SignatureForm },
];

export default function CoverLetterBuilder() {
  const params = useParams();
  const coverLetterId = params?.id as string | undefined;
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "Shabach";
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const [coverletterData, setCoverLetterData] = useState<CoverLetterValues>({
    template: templateId,
  });
  const [loading, setLoading] = useState(true);

  // Fetch and set data if editing
  useEffect(() => {
    let ignore = false;
    async function fetchCoverLetter() {
      if (coverLetterId) {
        setLoading(true);
        try {
          const data = await getcoverLetterById(coverLetterId);
          if (!ignore && data) {
            setCoverLetterData(nullsToEmptyStrings(data) as CoverLetterValues);
          }
        } catch (error) {}
        setLoading(false);
      } else {
        setCoverLetterData({
          template: templateId,
        });
        setLoading(false);
      }
    }
    fetchCoverLetter();
    return () => {
      ignore = true;
    };
  }, [coverLetterId]);

  const cleanDefaults = nullsToEmptyStrings(coverletterData);
  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: cleanDefaults,
    values: cleanDefaults,
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
      debouncedUpdate.cancel();
    };
  }, [form, setCoverLetterData]);

  const { isSaving, hasUnsavedChanges } =
    useAutoSaveCoverLetter(coverletterData);
  useUnloadWarning(hasUnsavedChanges);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text={
            coverLetterId ? "Edit Cover Letter" : "Design Your Cover Letter"
          }
          subtext={`Using "${templateId}" template`}
        />
        <div className="mt-4 px-1">
          <BackToTemplatesButton />
        </div>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          {/* Left panel: form, mobile toggle */}
          <div
            className={cn(
              "p-3 space-y-6 overflow-y-auto w-full md:w-1/2",
              showSmResumePreview && "hidden"
            )}>
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-semibold">Cover Letter Builder</h2>
              <p className="text-sm text-muted-foreground">
                Step {stepIndex + 1} of {steps.length}
              </p>
            </div>
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
          {/* Right panel: preview, mobile toggle */}
          <div
            className={cn(
              "md:block md:w-1/2 border-l p-4 overflow-y-auto bg-secondary",
              !showSmResumePreview && "hidden md:flex"
            )}>
            <CoverLetterPreviewSection
              coverLetterData={coverletterData}
              setCoverLetterData={setCoverLetterData}
              className={cn("h-full w-full", showSmResumePreview && "flex")}
            />
          </div>
        </div>
      </main>
      <CoverLetterFooter
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showPreview={showSmResumePreview}
        setShowPreview={setShowSmResumePreview}
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
              {index !== steps.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
