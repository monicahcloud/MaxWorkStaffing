"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateResumeBranding(
  id: string,
  themeId: string,
  themeColor: string,
  showPhoto: boolean
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const updatedResume = await prisma.resume.update({
    where: { id, userId },
    data: {
      themeId,
      themeColor,
      showPhoto,
    },
  });

  // This clears the Next.js cache so the updated
  // resume shows up correctly on refresh
  revalidatePath(`/resumes/${id}`);

  return updatedResume;
}
