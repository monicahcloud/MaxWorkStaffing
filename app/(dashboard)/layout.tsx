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
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  // Get the actual DB user first
  const dbUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, clerkId: true },
  });

  if (!dbUser) redirect("/");

  const [
    isFirstTimeUser,
    userSubscriptionLevel,
    resumeCount,
    letterCount,
    interviewCount,
  ] = await Promise.all([
    getUserMetadata(clerkId),
    getUserSubscriptionLevel(clerkId),

    // Use the INTERNAL DB user id for these counts
    prisma.resume.count({
      where: { userId: clerkId },
    }),

    prisma.coverLetter.count({
      where: { userId: clerkId },
    }),

    prisma.interview.count({
      where: { userId: dbUser.id },
    }),
  ]);

  if (isFirstTimeUser) {
    await markUserAsReturning(clerkId);
  }

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
      userStats={userStats}>
      {children}
    </DashboardLayoutClient>
  );
}
