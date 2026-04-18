"use client";

import { useUser } from "@clerk/nextjs";
import { useUserProgress } from "@/components/UserProgressContext";
import ResumeProgress from "../ResumeProgress";

const ClientHome = () => {
  const { user } = useUser();
  const { hasResume, hasCoverLetter, hasJob, hasInterview } = useUserProgress();

  const username = user?.firstName || user?.username || "there";

  const completedSteps = [
    hasResume ? "Create Resume" : null,
    hasCoverLetter ? "Cover Letter" : null,
    hasJob ? "Job Tracker" : null,
    hasInterview ? "Interview AI" : null,
  ].filter((step): step is string => Boolean(step));

  return (
    <section className="mb-8 flex flex-col items-center justify-between gap-10 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:flex-row">
      {/* Left: Welcome */}
      <div className="w-full lg:w-1/2">
        <div className="mt-6 space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
            Systems Ready,
            <br />
            <span className="text-red-600">{username}.</span>
          </h1>

          <p className="max-w-md font-medium leading-relaxed text-slate-500">
            Your career engine is initialized. Complete the remaining milestones
            to strengthen your story and improve your interview readiness.
          </p>
        </div>
      </div>

      {/* Right: Progress */}
      <div className="w-full rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6 md:p-8 lg:w-[700px]">
        <ResumeProgress completed={completedSteps} />
      </div>
    </section>
  );
};

export default ClientHome;
