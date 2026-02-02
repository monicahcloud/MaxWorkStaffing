// app/(dashboard)/Dashboardlayout.tsx
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
export const metadata = {
  title: "Your Dashboard",
  description:
    "Track your job applications, manage your resumes, and access interview tools — all in one place.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Job Dashboard | Max ResumeBuilder",
    description:
      "Everything you need to organize your job search and stay on track. Resumes, applications, interviews — managed in one place.",
    url: "https://www.maxresumebuilder.com/home",
    images: [{ url: "/og/og-image.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Max ResumeBuilder",
    description: "Your all-in-one control center for landing your next job.",
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
