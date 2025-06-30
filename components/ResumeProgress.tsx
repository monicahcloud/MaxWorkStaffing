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
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-2xl font-semibold text-center pb-4">
        Your Recommended Next Steps
      </h1>
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        {steps.map((step) => {
          const isCompleted = completed.includes(step);
          return (
            <div key={step} className="text-center flex-1">
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
              <div className="text-xs mt-1 whitespace-pre-line">{step}</div>
            </div>
          );
        })}
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
