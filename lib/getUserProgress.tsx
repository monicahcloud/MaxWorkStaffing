import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserProgress() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const [resumeCount, coverLetterCount, jobCount] = await Promise.all([
    prisma.resume.count({ where: { clerkId: userId } }),
    prisma.coverLetter.count({ where: { clerkId: userId } }),
    prisma.job.count({ where: { clerkId: userId } }),
  ]);

  return {
    hasResume: resumeCount > 0,
    hasCoverLetter: coverLetterCount > 0,
    hasJob: jobCount > 0,
  };
}

export function countCompletedSteps(
  progress: Awaited<ReturnType<typeof getUserProgress>>
) {
  let count = 0;
  if (progress.hasResume) count++;
  if (progress.hasCoverLetter) count++;
  if (progress.hasJob) count++;
  return count;
}
