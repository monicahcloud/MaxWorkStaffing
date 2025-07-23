"use client";

import SectionTitle from "@/components/SectionTitle";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import SkeletonForm from "./forms/SkeletonForm";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resumeTypeFromURL = searchParams.get("resumeType") || "";
  //const resumeId = searchParams.get("resumeId");
  const stepParam = searchParams.get("step");

  const [isParsing, setIsParsing] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeValues>(() => {
    if (resumeToEdit) {
      if (
        resumeToEdit.education?.length ||
        resumeToEdit.workExperience?.length ||
        resumeToEdit.techSkills?.length
      ) {
        return mapToResumeValues(resumeToEdit);
      }

      return {
        resumeTitle: "",
        description: "",
        resumeType: resumeTypeFromURL,
      };
    }

    return {
      resumeTitle: "",
      description: "",
      resumeType: resumeTypeFromURL,
    };
  });

  const steps = getSteps(resumeData.resumeType);
  const validStepKeys = steps.map((s) => s.key);

  const [currentStep, setCurrentStep] = useState(steps[0]?.key || "");

  // Parse AI resume if needed
  useEffect(() => {
    const controller = new AbortController();
    const shouldParse =
      resumeToEdit &&
      resumeToEdit.rawTextContent &&
      !resumeToEdit.education?.length &&
      !resumeToEdit.workExperience?.length &&
      !resumeToEdit.techSkills?.length;

    const parse = async () => {
      if (shouldParse && resumeToEdit?.rawTextContent) {
        setIsParsing(true);
        const parsed = await parseResumeWithAI(resumeToEdit.rawTextContent);

        if (parsed && !controller.signal.aborted) {
          setResumeData((prev) => ({
            ...prev,
            ...parsed,
            resumeType: resumeTypeFromURL || prev.resumeType,
          }));
          await saveParsedResumeData(resumeToEdit.id, parsed);
        }

        if (!controller.signal.aborted) {
          setIsParsing(false);
        }
      }
    };

    parse();
    return () => controller.abort();
  }, [resumeToEdit, resumeTypeFromURL]);

  // Handle step validation & default
  useEffect(() => {
    if (stepParam && validStepKeys.includes(stepParam)) {
      setCurrentStep(stepParam);
    } else {
      setCurrentStep(steps[0]?.key || "");

      // Optional: auto-correct URL step param
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("step", steps[0]?.key || "");
      router.replace(`?${newParams.toString()}`);
    }
  }, [stepParam, steps, validStepKeys, router, searchParams]);

  // Step change function
  const updateStep = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("step", key);
    window.history.pushState(null, "", `?${newParams.toString()}`);
    setCurrentStep(key);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges && !isSaving);

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Build Your Resume"
          subtext="Follow the steps below to create your resume. Your progress will be saved automatically."
        />
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "p-3 space-y-6 overflow-y-auto w-full md:w-1/2",
              showSmResumePreview && "hidden"
            )}>
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={updateStep}
              resumeType={resumeData.resumeType}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className="md:block md:w-1/2 border-l">
            {isParsing ? (
              <SkeletonForm />
            ) : (
              <ResumePreviewContainer
                resumeData={resumeData}
                setResumeData={setResumeData}
                className={cn("h-full w-full", showSmResumePreview && "flex")}
              />
            )}
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrentStep={updateStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
        resumeType={resumeData.resumeType}
        resume={resumeToEdit}
      />
    </div>
  );
}

export default ResumeEditor;
