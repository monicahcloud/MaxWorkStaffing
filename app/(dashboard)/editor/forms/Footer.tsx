"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSteps } from "../steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumeServerData } from "@/lib/types";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
  resumeType?: string;
  resume: ResumeServerData;
}

function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
  resumeType,
  resume,
}: FooterProps) {
  const router = useRouter();
  const steps = getSteps(resumeType);
  const validKeys = steps.map((s) => s.key);

  const currentIndex = steps.findIndex((s) => s.key === currentStep);
  const previousStep = steps[currentIndex - 1]?.key;
  const nextStep = steps[currentIndex + 1]?.key;
  const isLastStep = currentIndex === steps.length - 1;

  const handleNext = () => {
    if (nextStep && validKeys.includes(nextStep)) {
      setCurrentStep(nextStep);
    }
  };

  const handleFinish = () => {
    router.push(`/resumes/${resume.id}`);
  };

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep && validKeys.includes(previousStep)
                ? () => setCurrentStep(previousStep)
                : undefined
            }
            disabled={!previousStep || !validKeys.includes(previousStep)}>
            Previous Step
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleFinish}
              className="bg-green-600 hover:bg-green-700 text-white">
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!nextStep || !validKeys.includes(nextStep)}>
              Next Step
            </Button>
          )}
        </div>

        {/* Mobile toggle preview */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }>
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>

        {/* Close + Saving status */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100"
            )}>
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
