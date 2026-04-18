"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type ResumeType = "Chronological" | "Combination" | "Federal";

export async function setUploadedResumeTemplate(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const resumeId = formData.get("resumeId")?.toString();
  const resumeType = formData
    .get("resumeType")
    ?.toString() as ResumeType | null;

  if (!resumeId || !resumeType) {
    throw new Error("Missing resumeId or resumeType");
  }

  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    select: {
      id: true,
      clerkId: true,
      userId: true,
      parsed: true,
      themeId: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  // Protect ownership. Your upload route stores clerkId directly.
  if (resume.clerkId !== userId && resume.userId !== userId) {
    throw new Error("Unauthorized");
  }

  // Save the selected resume type + a sensible default theme
  const nextThemeId =
    resumeType === "Federal"
      ? "federal-standard"
      : resumeType === "Combination"
        ? "combination-pro"
        : "chronological-classic";

  await prisma.resume.update({
    where: { id: resumeId },
    data: {
      resumeType,
      themeId: nextThemeId,
      updatedAt: new Date(),
    },
  });

  redirect(`/editor?resumeId=${resumeId}&resumeType=${resumeType}`);
}
