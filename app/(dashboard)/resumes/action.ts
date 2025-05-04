"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  revalidatePath("/resumes");
}

export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id }, // Use resume ID to fetch it
      include: {
        workExperience: true, // Include work experiences
        education: true, // Include education data
        techSkills: true, // Include tech skills
      },
    });

    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    return null;
  }
}
