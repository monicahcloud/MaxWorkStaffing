"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileUserIcon,
  PenLineIcon,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { allSteps } from "../editor/stepsCoverLetter";
import { useRouter } from "next/navigation";
import { CoverLetterServerData } from "@/lib/types";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmCoverLetterPreview: boolean;
  setShowSmCoverLetterPreview: (show: boolean) => void;
  isSaving: boolean;
  coverletter?: CoverLetterServerData | null; // Unified with Page prop type
}

function CoverLetterFooter2({
  currentStep,
  setCurrentStep,
  showSmCoverLetterPreview,
  setShowSmCoverLetterPreview,
  isSaving,
  coverletter,
}: FooterProps) {
  const router = useRouter();

  const currentIndex = allSteps.findIndex((step) => step.key === currentStep);
  const previousStep = allSteps[currentIndex - 1]?.key;
  const nextStep = allSteps[currentIndex + 1]?.key;
  const isLastStep = currentIndex === allSteps.length - 1;

  const handleFinish = () => {
    // Ensuring we handle the optional coverletter id safely as we do in Resume
    const id = coverletter?.id;
    if (!id) return;
    router.push(`/coverletterbuilder/preview/${id}`);
  };

  return (
    <footer className="w-full border-t bg-white px-6 py-4 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Navigation Group: Left & Center-ish */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}>
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>

          {isLastStep ? (
            <Button
              size="sm"
              onClick={handleFinish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Finish
              <Check className="size-4 ml-1" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="font-semibold"
              onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
              disabled={!nextStep}>
              Next Step
              <ChevronRight className="size-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Mobile Preview Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSmCoverLetterPreview(!showSmCoverLetterPreview)}
          className="md:hidden">
          {showSmCoverLetterPreview ? (
            <PenLineIcon className="size-5" />
          ) : (
            <FileUserIcon className="size-5" />
          )}
        </Button>

        {/* Status & Close Group: Right */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <p
              className={cn(
                "text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-opacity duration-300",
                isSaving ? "opacity-100" : "opacity-0"
              )}>
              Auto-saving...
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="font-semibold"
            asChild>
            <Link href="/coverletterbuilder">Close</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default CoverLetterFooter2;
