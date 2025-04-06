export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ResumeItem from "./ResumeItem";
import CreateResumeButton from "./CreateReumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Your Resumes",
};

async function Page() {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);
  // TODO: Chek quota for non-premium users
  return (
    <main>
      <SectionTitle text="My Resumes" subtext={`Total: ${totalCount}`} />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="text-center flext justify-center">
          <CreateResumeButton
            canCreate={canCreateResume(subscriptionLevel, totalCount)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Page;
