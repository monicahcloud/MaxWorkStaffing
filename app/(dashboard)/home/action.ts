// checkUserProgress.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function checkUserProgress() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const [resumes, coverLetters, jobs] = await Promise.all([
    prisma.resume.findFirst({ where: { clerkId: userId } }),
    prisma.coverLetter.findFirst({ where: { clerkId: userId } }),
    prisma.job.findFirst({ where: { clerkId: userId } }),
  ]);

  return {
    hasResume: !!resumes,
    hasCoverLetter: !!coverLetters,
    hasJob: !!jobs,
  };
}
