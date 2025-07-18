// app/(dashboard)/Dashboardlayout.tsx
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DashboardLayoutClient from "./DashboardLayoutClient";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { getUserMetadata, markUserAsReturning } from "@/lib/user";
export const metadata = {
  title: "Your Dashboard",
  description:
    "Track your job applications, manage your resumes, and access interview tools — all in one place.",
  openGraph: {
    title: "Job Dashboard | Max ResumeBuilder",
    description:
      "Everything you need to organize your job search and stay on track. Resumes, applications, interviews — managed in one place.",
    url: "https://www.maxresumebuilder.com/home",
    images: [{ url: "/og/dashboard.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search Dashboard",
    description: "Your all-in-one control center for landing your next job.",
    images: ["/og/dashboard.png"],
  },
};

export default async function Dashboardlayout({ children }: PropsWithChildren) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const [isFirstTimeUser, userSubscriptionLevel] = await Promise.all([
    getUserMetadata(userId),
    getUserSubscriptionLevel(userId),
  ]);

  if (isFirstTimeUser) {
    await markUserAsReturning(userId);
  }

  return (
    <DashboardLayoutClient
      shouldShowModal={isFirstTimeUser}
      userSubscriptionLevel={userSubscriptionLevel}>
      {children}
    </DashboardLayoutClient>
  );
}
