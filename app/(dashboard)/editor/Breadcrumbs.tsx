import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { getSteps } from "./steps";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  resumeType?: string; // Accept resumeType
}

function Breadcrumbs({
  currentStep,
  setCurrentStep,
  resumeType,
}: BreadcrumbsProps) {
  const steps = getSteps(resumeType); // Get filtered steps here

  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.title}
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

export default Breadcrumbs;
