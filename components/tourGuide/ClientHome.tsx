// components/tourGuide/ClientHome.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useUserProgress } from "@/components/UserProgressContext";
import { Sparkles } from "lucide-react";
import ResumeProgress from "../ResumeProgress";
// import TakeTourButton from "./TakeTourButton";

function ClientHome() {
  const { user } = useUser();
  const username = user?.firstName || user?.username;
  const { hasResume, hasCoverLetter, hasJob, hasInterview } = useUserProgress();

  const completedSteps = [
    hasResume && "Create Resume",
    hasCoverLetter && "Cover Letter",
    hasJob && "Job Tracker",
    hasInterview && "Interview AI",
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white border border-slate-200 p-6 md:p-10 mb-8 rounded-[2.5rem] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* Left: Greeting */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest w-fit">
          <Sparkles className="w-3 h-3" />
          <span>Intelligence Active</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Systems Ready, <br />
            <span className="text-red-600">{username}.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            Your career engine is initialized. Complete the remaining milestones
            to optimize your narrative and maximize interview conversion.
          </p>
        </div>

        {/* <div className="pt-2">
          <TakeTourButton />
        </div> */}
      </div>

      {/* Right: Progress Command Panel */}
      <div className="w-full lg:w-[700px] bg-slate-50/50 p-6 md:p-8 rounded-[2rem] border border-slate-100">
        <ResumeProgress completed={completedSteps} />
      </div>
    </div>
  );
}

export default ClientHome;
