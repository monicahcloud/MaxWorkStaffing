"use client";
import SectionTitle from "@/components/SectionTitle";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./forms/Footer";
import { resumeSchema, ResumeValues } from "@/lib/validation";
// import { useMemo } from "react";
import ResumePreviewContainer from "./ResumePreviewContainer";

function ResumeEditor() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeSchema.parse({})
  );

  const currentStep = searchParams.get("step") || steps[0].key;
  // const preview = useMemo(
  //   () => JSON.stringify(resumeData, null, 2),
  //   [resumeData]
  // );
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className=" px-3  font-semibold ">
        <SectionTitle
          text="Build Your Resume"
          subtext=" Follow the steps below to create your resume. Your progress will be
          saved automatically."
        />
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2 p-3 overflow-y-auto space-y-6">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent ? (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            ) : (
              <p className="text-center text-red-500">Invalid Step</p>
            )}
          </div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 md:flex">
            <ResumePreviewContainer
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}

export default ResumeEditor;
