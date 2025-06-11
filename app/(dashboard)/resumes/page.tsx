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
import UploadResumeButton from "./UploadResumeButton";

// Page-level metadata for SEO and browser tab title
export const metadata: Metadata = {
  title: "My Resumes",
};

// Server Component: async function that fetches data before rendering
async function Page() {
  // Retrieve current session using Clerk's server-side `auth()` method
  const session = auth();

  // Extract the user ID from the authenticated session
  const userId = (await session)?.userId;

  if (!userId) {
    return null;
  }

  // Fetch data in parallel using Promise.all to reduce response time:
  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    // 1. Fetch all resumes created by the authenticated user, sorted by last updated
    prisma.resume.findMany({
      where: { userId }, // Only fetch resumes that belong to the logged-in user
      orderBy: { updatedAt: "desc" }, // Most recently updated resumes appear first
      include: resumeDataInclude, // Include any related fields (like sections or jobs)
    }),

    // 2. Count the total number of resumes created by this user
    prisma.resume.count({
      where: { userId },
    }),

    // 3. Retrieve the user's current subscription level (e.g., trial, monthly, annual)
    getUserSubscriptionLevel(userId),
  ]);

  // Render UI for resume dashboard
  return (
    <main>
      <SectionTitle text="My Resumes" subtext={`Total: ${totalCount}`} />

      <div className="p-10 md:px-20 lg:px-32">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateResumeButton
              canCreate={canCreateResume(subscriptionLevel, totalCount)} //
            />

            <UploadResumeButton />
          </div>
        </div>

        {/* Grid layout to display each resume card */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
          {resumes.map((resume) => (
            // Render each resume inside a ResumeItem component, using resume ID as unique key
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </main>
  );
}

// Export the page so Next.js can render it as part of the app
export default Page;
