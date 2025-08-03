export const dynamic = "force-dynamic";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ResumeItem from "./ResumeItem";
import CreateResumeButton from "./CreateReumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import UploadResumeButton from "./UploadResumeButton";
import { canCreateResume } from "@/lib/permissions";

export const metadata = {
  title: "My Resume",
  description:
    "Easily build a professional, recruiter-approved resume with AI-powered guidance. Start from scratch or upload your current resume to enhance it.",
  openGraph: {
    title: "My Resume | Max ResumeBuilder",
    description:
      "Build a job-winning resume in minutes. ATS-friendly, customizable templates designed to get you hired.",
    url: "https://www.maxresumebuilder.com/resumebuilder",
    images: [{ url: "/og/resume-builder.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Resume with AI",
    description:
      "Fast, flexible, and proven to impress recruiters. Create a resume that gets results.",
    images: ["/og/resume-builder.png"],
  },
};

async function Page() {
  const session = auth();
  const userId = (await session)?.userId;

  if (!userId) {
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),

    prisma.resume.count({
      where: { userId },
    }),

    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main>
      <SectionTitle text="My Resumes" subtext={`Total: ${totalCount}`} />

      <div className="p-10 md:px-20 lg:px-32">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateResumeButton
              canCreate={canCreateResume(subscriptionLevel, totalCount)}
            />
            ,
            <UploadResumeButton />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
          {resumes.map((resume) => (
            <ResumeItem
              key={resume.id}
              resume={resume}
              subscriptionLevel={subscriptionLevel}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Page;
