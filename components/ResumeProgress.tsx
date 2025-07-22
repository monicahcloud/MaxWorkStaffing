"use client";

import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Create Resume", "Cover Letter", "Job\nTracker"];

interface ResumeProgressProps {
  completed: string[]; // array of completed step names
}

export default function ResumeProgress({ completed }: ResumeProgressProps) {
  const totalSteps = steps.length;
  const completedCount = steps.filter((step) =>
    completed.includes(step)
  ).length;
  const percentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="flex flex-col justify-center text-center px-4">
      <h1 className="text-2xl font-semibold pb-4 text-blue-900">
        Your Recommended Next Steps
      </h1>

      {/* Step Indicators */}
      <div className="flex flex-wrap justify-between gap-4 mb-4 text-sm text-gray-600">
        {steps.map((step) => {
          const isCompleted = completed.includes(step);
          return (
            <div
              key={step}
              className="flex-1 min-w-[80px] text-center flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center",
                  isCompleted ? "text-rose-600" : "text-gray-400"
                )}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div className="text-xs mt-1 whitespace-pre-line leading-snug">
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full w-full">
        <div
          className="absolute top-0 left-0 h-3 bg-red-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-700">Progress: {percentage}%</p>
    </div>
  );
}
