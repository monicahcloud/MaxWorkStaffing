"use server";

// import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
// import { canUseAITools } from "@/lib/permissions";
// import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteCoverLetter(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const coverLetter = await prisma.coverLetter.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!coverLetter) {
    throw new Error("CoverLetter not found");
  }

  if (coverLetter.userPhotoUrl) {
    await del(coverLetter.userPhotoUrl);
  }

  await prisma.coverLetter.delete({
    where: {
      id,
    },
  });

  revalidatePath("/coverletter");
}
