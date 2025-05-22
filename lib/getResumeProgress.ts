// lib/getResumeProgress.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getResumeProgress() {
  const { userId: clerkId } = auth();
  if (!clerkId) return 0;

  const [resumeCount, coverLetterCount, jobCount] = await Promise.all([
    prisma.resume.count({ where: { clerkId } }),
    prisma.coverLetter.count({ where: { clerkId } }),
    prisma.job.count({ where: { clerkId } }),
  ]);

  let completed = 0;
  if (resumeCount > 0) completed++;
  if (coverLetterCount > 0) completed++;
  if (jobCount > 0) completed++;

  return completed;
}
