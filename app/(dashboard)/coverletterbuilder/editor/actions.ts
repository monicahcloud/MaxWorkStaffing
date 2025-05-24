"use server";

import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function generateCoverLetter({ jobTitle }: { jobTitle: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const systemMessage = `You are a job cover letter AI assistant. Your task is to write 
  a professional cover letter given the user's provided data. Only return the body section of the letter. Do not include any other information in the response. Keep it concise and professional.`;

  const userMessage = `
  Please generate a job cover letter returning the letter body (only) of a professional 
  cover letter for the job title: ${jobTitle}.
  Do not include greeting, sign-off, or heading. Return 3  distinct paragraphs in letter 
  format with each new paragraph starting a new line`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) throw new Error("Failed to generate content");

  return aiResponse.trim();
}

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

  if (coverLetter.photoUrl) {
    await del(coverLetter.photoUrl);
  }

  await prisma.coverLetter.delete({
    where: {
      id,
    },
  });

  revalidatePath("/coverletter");
}

export async function getcoverLetterById(id: string) {
  try {
    const coverLetter = await prisma.coverLetter.findUnique({
      where: { id }, // Use coverLetter ID to fetch it
    });

    return coverLetter;
  } catch (error) {
    console.error("Error fetching coverLetter:", error);
    return null;
  }
}
