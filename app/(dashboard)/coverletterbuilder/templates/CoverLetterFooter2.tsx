import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { allSteps } from "../editor/stepsCoverLetter"; // Make sure the path is correct

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmCoverLetterPreview: boolean;
  setShowSmCoverLetterPreview: (show: boolean) => void;
  isSaving: boolean;
  template?: string; // Optional, can remove if unused
}

function CoverLetterFooter2({
  currentStep,
  setCurrentStep,
  showSmCoverLetterPreview,
  setShowSmCoverLetterPreview,
  isSaving,
}: FooterProps) {
  const currentIndex = allSteps.findIndex((step) => step.key === currentStep);
  const previousStep = allSteps[currentIndex - 1]?.key;
  const nextStep = allSteps[currentIndex + 1]?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}>
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}>
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmCoverLetterPreview(!showSmCoverLetterPreview)}
          className="md:hidden"
          title={
            showSmCoverLetterPreview
              ? "Show input form"
              : "Show CoverLetter preview"
          }>
          {showSmCoverLetterPreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/coverletter">Close</Link>
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

export default CoverLetterFooter2;
