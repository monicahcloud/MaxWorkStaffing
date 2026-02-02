"use client";

import { Progress } from "@/components/ui/progress";
import { FileText, Mic, PenTool, Zap } from "lucide-react";
import { SubscriptionLevel } from "@/lib/subscription";
import Link from "next/link";

export function GlobalUsageTracker({
  level,
  interviewCount,
  resumeCount,
  letterCount,
}: {
  level: SubscriptionLevel;
  interviewCount: number;
  resumeCount: number;
  letterCount: number;
}) {
  const limits = {
    resumes: level === "7Day" ? 3 : level === "free" ? 1 : Infinity,
    letters: level === "7Day" ? 3 : level === "free" ? 1 : Infinity,
    interviews: level === "7Day" ? 1 : 20,
  };

  const calculateProgress = (count: number, limit: number) =>
    limit === Infinity ? 0 : Math.min((count / limit) * 100, 100);

  return (
    <div className="space-y-5 p-4 rounded-3xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="size-3 text-blue-600 fill-blue-600" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
          Plan: {level === "7Day" ? "7-Day Trial" : level}
        </span>
      </div>

      <div className="space-y-3">
        {/* Resumes */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
            <span className="flex items-center gap-1.5">
              <FileText className="size-3 text-slate-400" /> Resumes
            </span>
            <span>
              {resumeCount} /{" "}
              {limits.resumes === Infinity ? "∞" : limits.resumes}
            </span>
          </div>
          <Progress
            value={calculateProgress(resumeCount, limits.resumes)}
            className="h-1 bg-slate-200"
          />
        </div>

        {/* Letters */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
            <span className="flex items-center gap-1.5">
              <PenTool className="size-3 text-slate-400" /> Letters
            </span>
            <span>
              {letterCount} /{" "}
              {limits.letters === Infinity ? "∞" : limits.letters}
            </span>
          </div>
          <Progress
            value={calculateProgress(letterCount, limits.letters)}
            className="h-1 bg-slate-200"
          />
        </div>

        {/* Interviews */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter text-blue-600">
            <span className="flex items-center gap-1.5">
              <Mic className="size-3" /> Interviews
            </span>
            <span>
              {interviewCount} / {limits.interviews}
            </span>
          </div>
          <Progress
            value={calculateProgress(interviewCount, limits.interviews)}
            className="h-1 bg-blue-200"
          />
        </div>
      </div>

      {(level === "free" || level === "7Day") && (
        <Link
          href="/billing"
          className="block w-full text-center py-2.5 bg-white border border-slate-200 text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
          Go Unlimited
        </Link>
      )}
    </div>
  );
}
