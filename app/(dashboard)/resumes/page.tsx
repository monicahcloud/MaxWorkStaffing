// This export tells Next.js to render the page on every request (dynamic rendering)
// instead of using static generation or caching.
export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next"; // Next.js type to define page metadata like <title>
import SectionTitle from "@/components/SectionTitle"; // UI component to show a section header
import { resumeDataInclude } from "@/lib/types"; // Prisma include config to fetch related data for resumes
import { auth } from "@clerk/nextjs/server"; // Clerk server-side auth function to retrieve the current session
import prisma from "@/lib/prisma"; // Prisma client instance to query the database
import ResumeItem from "./ResumeItem"; // Component to render a single resume preview card
import CreateResumeButton from "./CreateReumeButton"; // Button that navigates to resume creation flow
import { getUserSubscriptionLevel } from "@/lib/subscription"; // Helper to retrieve a user's subscription tier
import { canCreateResume } from "@/lib/permissions"; // Logic that determines if user can create more resumes
import UploadResumeButton from "./UploadResumeButton"; // Button to allow users to upload an existing resume file

// Page-level metadata for SEO and browser tab title
export const metadata: Metadata = {
  title: "My Resumes", // Sets the <title> tag on this page to "My Resumes"
};

// Server Component: async function that fetches data before rendering
async function Page() {
  // Retrieve current session using Clerk's server-side `auth()` method
  const session = auth();

  // Extract the user ID from the authenticated session
  const userId = (await session)?.userId;

  // If the user is not authenticated (no userId), do not render anything
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

    // 3. Retrieve the user's current subscription level (e.g., free, pro, premium)
    getUserSubscriptionLevel(userId),
  ]);

  // Render UI for resume dashboard
  return (
    <main>
      {/* Optional: Resume onboarding tour button (commented out for now) */}
      {/* 
      <div className="justify-center items-center mx-auto flex">
        <ResumesTourButton />
      </div>
      */}

      {/* Section heading with total resume count */}
      <SectionTitle text="My Resumes" subtext={`Total: ${totalCount}`} />

      {/* Outer container with responsive padding */}
      <div className="p-10 md:px-20 lg:px-32">
        {/* Center-aligned action buttons (Create and Upload) */}
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            {/* "Create Resume" button — only enabled if user hasn't exceeded limit */}
            <CreateResumeButton
              canCreate={canCreateResume(subscriptionLevel, totalCount)} // Check permission based on subscription plan and how many resumes already exist
            />
            {/* "Upload Resume" button — always available */}
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
