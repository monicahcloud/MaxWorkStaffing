"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  "Create Resume",
  "Cover Letter",
  "Personlized Url",
  "Job\nSearch",
  "Apply to Job",
  "Job Tracker",
];

interface ResumeProgressProps {
  completedSteps: number; // e.g., 3 means 3 out of 8 completed
}

export default function ResumeProgress({
  completedSteps,
}: ResumeProgressProps) {
  const percentage = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <div className="mx-auto justify-center items-center flex">
        <h1 className="text-2xl font-semibold ">Your Recommended Next Steps</h1>
      </div>

      <div className="flex justify-between mb-2 text-sm text-gray-600">
        {steps.map((step, index) => (
          <div key={step} className="text-center flex-1">
            <div
              className={cn(
                "flex items-center justify-center",
                index < completedSteps ? "text-rose-600" : "text-gray-400"
              )}>
              {index < completedSteps ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>
            <div className="text-xs mt-1 whitespace-pre-line">{step}</div>
          </div>
        ))}
      </div>
      <div className="relative h-3 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-3 bg-rose-800 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-center text-gray-700">
        Progress: {percentage}%
      </p>
    </div>
  );
}
