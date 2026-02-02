/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import CreateResumeButton from "./CreateReumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import UploadResumeButton from "./UploadResumeButton";
import { canCreateResume } from "@/lib/permissions";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";
import Link from "next/link";

// NEW: Client-side component for the interactive delete logic
import ResumeCardActions from "./ResumeCardActions";
export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main className="max-w-none p-6 md:p-12 lg:p-16">
      <header className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 border-b border-slate-100 pb-12">
        <div className="space-y-4 text-center lg:text-left">
          <SectionTitle
            text="Resume Suite"
            subtext={`Managing ${totalCount} intelligent profiles`}
          />
        </div>

        <div className="flex items-center gap-8 bg-white p-4 px-8 rounded-4xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CreateResumeButton
            canCreate={canCreateResume(subscriptionLevel, totalCount)}
          />
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <UploadResumeButton />
        </div>
      </header>

      <div className="mt-12">
        {resumes.length === 0 ? (
          <div className="w-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[4rem] bg-slate-50/30">
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm mb-10">
              System Empty: No Resumes Detected
            </p>
            <div className="flex flex-col items-center gap-4">
              <CreateResumeButton canCreate={true} />
              <p className="text-[10px] font-bold text-slate-300 uppercase">
                Or
              </p>
              <UploadResumeButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ResumeCard({ resume }: { resume: any }) {
  const resumeData = mapToResumeValues(resume);

  return (
    <div className="group bg-white border border-slate-200 rounded-4xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 relative">
      {/* --- DELETE / MORE ACTIONS --- */}
      <div className="absolute top-4 right-4 z-30">
        <ResumeCardActions
          resumeId={resume.id}
          resumeTitle={resume.resumeTitle}
        />
      </div>

      <div className="aspect-210/297 mb-4 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative shadow-inner flex items-center justify-center">
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm text-blue-600">
          {resume.resumeType || "Standard"}
        </div>

        <div className="absolute inset-0 pointer-events-none select-none transition-transform duration-500">
          <div className="origin-top-left scale-[0.45] w-198.5">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-900/5 z-10" />
      </div>

      <h3 className="font-black text-slate-900 truncate mb-1 uppercase tracking-tight">
        {resume.resumeTitle || "Untitled Project"}
      </h3>

      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
        Last edited {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2 relative z-20">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="flex-1 text-center py-3 bg-slate-900 text-white text-[12px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
          Edit
        </Link>
        <Link
          href={`/resumes/${resume.id}`}
          className="px-4 py-3 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
          View
        </Link>
      </div>
    </div>
  );
}
