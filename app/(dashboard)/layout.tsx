// app/(dashboard)/Dashboardlayout.tsx
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import {
  getUserSubscriptionLevel,
  SubscriptionLevel,
} from "@/lib/subscription";
import { getUserMetadata, markUserAsReturning } from "@/lib/user";
import prisma from "@/lib/prisma";
import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your career in one place — build resumes, track applications, prepare for interviews, and move closer to your next offer.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Dashboard | CareerOS",
    description:
      "The Operating System for Your Next Career. Build. Apply. Interview. Get Hired.",
    url: "https://www.maxresumebuilder.com/home",
    images: [{ url: "/og/og-image.png", width: 1200, height: 630 }],
    siteName: "CareerOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | CareerOS",
    description: "Build. Apply. Interview. Get Hired.",
    images: ["/og/dashboard.png"],
  },
};

export default async function Dashboardlayout({ children }: PropsWithChildren) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch counts and subscription in parallel
  const [
    isFirstTimeUser,
    userSubscriptionLevel,
    resumeCount,
    letterCount,
    interviewCount,
  ] = await Promise.all([
    getUserMetadata(userId),
    getUserSubscriptionLevel(userId),
    prisma.resume.count({ where: { userId } }),
    prisma.coverLetter.count({ where: { userId } }),
    prisma.interview.count({ where: { userId } }),
  ]);

  if (isFirstTimeUser) {
    await markUserAsReturning(userId);
  }

  // Create the stats object to pass down
  const userStats = {
    level: userSubscriptionLevel as SubscriptionLevel,
    resumeCount,
    letterCount,
    interviewCount,
  };

  return (
    <DashboardLayoutClient
      shouldShowModal={isFirstTimeUser}
      userSubscriptionLevel={userSubscriptionLevel}
      userStats={userStats} // NEW PROP
    >
      {children}
    </DashboardLayoutClient>
  );
}
