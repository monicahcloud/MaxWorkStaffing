/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import CreateLetterButton from "./CreateletterButton";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { coverLetterInclude } from "@/lib/types";
import { canCreateResume } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import CoverLetterPreview from "./CoverLetterPreview";
import { mapToCoverLetterValues } from "@/lib/utils";
import DeleteDocumentButton from "@/components/DeleteDocumentButton";
import { deleteCoverLetter } from "./actions";

export const metadata = {
  title: "My Resume",
  description:
    "Easily build a professional, recruiter-approved resume with AI-powered guidance. Start from scratch or upload your current resume to enhance it.",
  openGraph: {
    title: "My Resume | Max ResumeBuilder",
    description:
      "Build a job-winning resume in minutes. ATS-friendly, customizable templates designed to get you hired.",
    url: "https://www.maxresumebuilder.com/coverletter",
    images: [{ url: "/og/og-coverletter.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
    robots: { index: false, follow: true },
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Cover Letter with AI",
    description:
      "Fast, flexible, and proven to impress recruiters. Create a cover letter that gets results.",
    images: ["/og/og-coverletter.png"],
  },
};
async function CoverLetterRoute() {
  const session = auth();
  const userId = (await session)?.userId;

  if (!userId) {
    return null;
  }

  const [coverletter, totalCount, subscriptionLevel] = await Promise.all([
    prisma.coverLetter.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: coverLetterInclude,
    }),
    prisma.coverLetter.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main className="max-w-none p-6 md:p-12 lg:p-16">
      <header className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 border-b border-slate-100 pb-12">
        <div className="space-y-4 text-center lg:text-left">
          <SectionTitle
            text="Cover Letter Suite"
            subtext={`Created ${totalCount} Cover Letter(s)`}
          />
        </div>
        <div className="flex items-center gap-8 bg-white p-4 px-8 rounded-4xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CreateLetterButton
            canCreate={canCreateResume(subscriptionLevel, totalCount)}
          />
        </div>
      </header>

      <div className="mt-12">
        {coverletter.length === 0 ? (
          /* EMPTY STATE */
          <div className="w-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[4rem] bg-slate-50/30">
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm mb-10">
              System Empty: No Letters Detected
            </p>
            <CreateLetterButton canCreate={true} />
          </div>
        ) : (
          /* SAVED RESUMES GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coverletter.map((letter) => (
              <CoverLetterCard key={letter.id} coverletter={letter} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function CoverLetterCard({ coverletter }: { coverletter: any }) {
  // Convert DB data to the standard coverletterValues format
  const coverletterData = mapToCoverLetterValues(coverletter);

  return (
    <div className="group relative bg-white border border-slate-200 rounded-4xl p-6 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="absolute -top-2 -right-2 z-50">
        <DeleteDocumentButton
          id={coverletter.id}
          title={coverletter.companyName || "Untitled Project"}
          onDelete={deleteCoverLetter} // Use your existing server action
        />
      </div>
      {/* Thumbnail Container */}
      <div className="aspect-210/297 mb-4 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative shadow-inner flex items-center justify-center">
        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm text-blue-600">
          {coverletter.coverletterType || "Standard"}
        </div>

        {/* Real Content Preview */}
        <div className="absolute inset-0 pointer-events-none select-none transition-transform duration-500 ">
          <div className="origin-top-left scale-[0.45] w-198.5">
            <CoverLetterPreview
              coverLetterData={coverletterData}
              // Note: contentRef is not needed for a static thumbnail
            />
          </div>
        </div>

        {/* Subtle Gradient Overlay to make the card look more like a thumbnail */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-900/5 z-10" />
      </div>

      {/* Title and Metadata */}
      <h3 className="font-black text-slate-900 truncate mb-1 uppercase tracking-tight">
        {coverletter.companyName || "Untitled Project"}
      </h3>

      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
        Last edited {new Date(coverletter.updatedAt).toLocaleDateString()}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2 relative z-20">
        <a
          href={`/coverletterbuilder/editor?themeId=${coverletter.themeId}&coverLetterId=${coverletter.id}`}
          className="flex-1 text-center py-3 bg-slate-900 text-white text-[18px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
          Edit
        </a>
        <a
          href={`/coverletterbuilder/preview/${coverletter.id}`}
          className="px-4 py-3 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
          View
        </a>
      </div>
    </div>
  );
}

export default CoverLetterRoute;
