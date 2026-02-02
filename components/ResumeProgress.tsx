// components/ResumeProgress.tsx
"use client";

import { CheckCircle2, Circle, Zap } from "lucide-react";

export default function ResumeProgress({ completed }: { completed: string[] }) {
  const milestones = [
    {
      id: "Create Resume",
      label: "Create Resume",
      description: "AI Resume Baseline",
    },
    {
      id: "Cover Letter",
      label: "Cover Letter",
      description: "Personalized Story",
    },
    {
      id: "Job Tracker",
      label: "Job Tracker",
      description: "Active Leads",
    },
    {
      id: "Interview AI",
      label: "Interview AI",
      description: "AI Simulation",
    },
  ];

  const score = Math.round((completed.length / milestones.length) * 100);

  return (
    <div className="w-full space-y-6">
      {/* Score Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">
            Readiness Score
          </p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-4xl font-black text-black leading-none">
              {score}%
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            {score === 100 ? "System: Optimized" : "System: Analyzing..."}
          </p>
        </div>
      </div>

      {/* Milestone List */}
      <div className="space-y-2">
        {milestones.map((m) => {
          const isDone = completed.includes(m.id);
          return (
            <div
              key={m.id}
              className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${
                isDone
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-slate-50/50 border-dashed border-slate-300 opacity-100"
              }`}>
              <div className="flex-shrink-0">
                {isDone ? (
                  <div className="bg-red-600 rounded-full p-1 shadow-md shadow-red-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-[11px] font-black uppercase tracking-tight ${
                    isDone ? "text-black" : "text-slate-400"
                  }`}>
                  {m.label}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                  {m.description}
                </p>
              </div>
              {isDone && (
                <Zap className="w-3 h-3 text-red-600 fill-current animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
