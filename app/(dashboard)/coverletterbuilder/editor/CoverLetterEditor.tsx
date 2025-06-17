"use client";

import SectionTitle from "@/components/SectionTitle";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { CoverLetterServerData } from "@/lib/types";
import { CoverLetterValues } from "@/lib/validation";
import { cn, mapToCoverLetterValues } from "@/lib/utils";
import useAutoSaveCoverLetter from "../../coverletter/useAutoSaveCoverLetter";
import BreadcrumbsCoverLetter from "./BreadCrumbsCoverLetter";
import CoverLetterPreviewSection from "../CoverLetterPreviewSection";
import { allSteps } from "./stepsCoverLetter";
import CoverLetterFooter2 from "../templates/CoverLetterFooter2";
import { useForm } from "react-hook-form";

interface CoverLetterEditorProps {
  coverletterToEdit: CoverLetterServerData | null;
}

function CoverLetterEditor({ coverletterToEdit }: CoverLetterEditorProps) {
  const searchParams = useSearchParams();
  const coverLetterTypeFromTemplate = searchParams.get("template") || "";
  const form = useForm<CoverLetterValues>();

  const [coverLetterData, setCoverLetterData] = useState<CoverLetterValues>(
    () => {
      if (coverletterToEdit) {
        return mapToCoverLetterValues(coverletterToEdit);
      }
      return {
        template: coverLetterTypeFromTemplate,
      };
    }
  );

  const [showSmCoverLetterPreview, setShowSmCoverLetterPreview] =
    useState(false);

  const { isSaving, hasUnsavedChanges } =
    useAutoSaveCoverLetter(coverLetterData);
  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || allSteps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = allSteps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Create Your CoverLetter"
          subtext="Follow the steps below to create your cover letter. Your progress will be saved automatically."
        />
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "p-3 space-y-6 overflow-y-auto w-full md:w-1/2",
              showSmCoverLetterPreview && "hidden"
            )}>
            <BreadcrumbsCoverLetter
              currentStep={currentStep}
              setCurrentStep={setStep}
            />
            {FormComponent && (
              <FormComponent
                form={form}
                coverLetterData={coverLetterData}
                setCoverLetterData={setCoverLetterData}
              />
            )}
          </div>

          <div className="grow md:block md:w-1/2 border-l">
            <CoverLetterPreviewSection
              coverLetterData={coverLetterData}
              setCoverLetterData={setCoverLetterData}
              className={cn(
                "h-full w-full",
                showSmCoverLetterPreview && "flex"
              )}
            />
          </div>
        </div>
      </main>

      <CoverLetterFooter2
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmCoverLetterPreview={showSmCoverLetterPreview}
        setShowSmCoverLetterPreview={setShowSmCoverLetterPreview}
        isSaving={isSaving}
      />
    </div>
  );
}

export default CoverLetterEditor;
