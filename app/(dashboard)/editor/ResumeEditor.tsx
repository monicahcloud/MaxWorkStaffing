"use client";
import SectionTitle from "@/components/SectionTitle";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSteps } from "./steps";

import Breadcrumbs from "./Breadcrumbs";
import Footer from "./forms/Footer";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewContainer from "./ResumePreviewContainer";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";
import { parseResumeWithAI, saveParsedResumeData } from "./forms/action";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const resumeTypeFromTemplate = searchParams.get("resumeType") || "";

  const [resumeData, setResumeData] = useState<ResumeValues>(() => {
    if (resumeToEdit) {
      // If resume has structured data, use it
      if (
        resumeToEdit.education?.length ||
        resumeToEdit.workExperience?.length ||
        resumeToEdit.techSkills?.length
      ) {
        return mapToResumeValues(resumeToEdit);
      }

      // If resume has raw text only (e.g. uploaded), use fallback initially
      return {
        resumeTitle: "",
        description: "",
        resumeType: resumeTypeFromTemplate,
      };
    }

    // New resume
    return {
      resumeTitle: "",
      description: "",
      resumeType: resumeTypeFromTemplate,
    };
  });

  useEffect(() => {
    const shouldParse =
      resumeToEdit &&
      resumeToEdit.rawTextContent &&
      !resumeToEdit.education?.length &&
      !resumeToEdit.workExperience?.length &&
      !resumeToEdit.techSkills?.length;

    if (shouldParse && resumeToEdit.rawTextContent) {
      parseResumeWithAI(resumeToEdit.rawTextContent).then(async (parsed) => {
        if (parsed) {
          setResumeData((prev) => ({
            ...prev,
            ...parsed,
            resumeType: resumeTypeFromTemplate || prev.resumeType,
          }));

          // Persist parsed data to DB
          await saveParsedResumeData(resumeToEdit.id, parsed);
        }
      });
    }
  }, [resumeToEdit, resumeTypeFromTemplate]);

  const steps = getSteps(resumeData.resumeType);
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

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
          <div
            className={cn(
              "p-3 space-y-6 overflow-y-auto w-full md:w-1/2", // Ensure it's half on medium+
              showSmResumePreview && "hidden"
            )}>
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={setStep}
              resumeType={resumeData.resumeType}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className=" md:block md:w-1/2 border-l">
            {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
            <ResumePreviewContainer
              resumeData={resumeData}
              setResumeData={setResumeData}
              className={cn("h-full w-full", showSmResumePreview && "flex")}
            />
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}

export default ResumeEditor;
