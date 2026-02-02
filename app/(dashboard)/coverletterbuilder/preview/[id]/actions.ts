// app/(dashboard)/coverletterbuilder/preview/[id]/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateCoverLetterBranding(
  id: string,
  themeId: string,
  themeColor: string,
  showPhoto: boolean // Add the new field here
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.coverLetter.update({
    where: { id, userId },
    data: {
      themeId,
      themeColor,
      showPhoto, // Update the database record
    },
  });
}
