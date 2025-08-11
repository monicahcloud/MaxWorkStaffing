export const dynamic = "force-dynamic";

import React from "react";
import SectionTitle from "@/components/SectionTitle";
import CreateLetterButton from "./CreateletterButton";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import CoverLetterItem from "./CoverLetterItem";
import { coverLetterInclude } from "@/lib/types";
import { canCreateResume } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";

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
    // 3. Retrieve the user's current subscription level (e.g., trial, monthly, annual)
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main>
      <SectionTitle text="My Cover Letters" subtext={`Total: ${totalCount}`} />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateLetterButton
              canCreate={canCreateResume(subscriptionLevel, totalCount)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
          {coverletter.map((letter) => (
            <CoverLetterItem
              key={letter.id}
              coverletter={letter}
              subscriptionLevel={subscriptionLevel}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CoverLetterRoute;
