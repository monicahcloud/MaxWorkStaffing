"use server";

import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
// import { canUseAITools } from "@/lib/permissions";
// import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function generateCoverLetter({
  jobTitle,
  yearsExperience,
  achievements,
  tools,
}: {
  jobTitle: string;
  yearsExperience?: string | number;
  achievements?: string;
  tools?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // const subscriptionLevel = await getUserSubscriptionLevel(userId);
  // if (!canUseAITools(subscriptionLevel)) {
  //   throw new Error("Upgrade your subscription to use this feature");
  // }

  const achievementsText =
    achievements?.trim() && achievements.trim() !== "" ? `${achievements}` : "";
  const toolsText = tools?.trim() && tools.trim() !== "" ? `${tools}` : "";

  const systemMessage = `You are a job cover letter AI assistant. Your task is to write a professional, natural-sounding cover letter body (not a template, no placeholders).`;

  const userMessage = `
Write the body of a professional cover letter for the following job application details:
- Job Title: ${jobTitle}
- Years of Experience: ${yearsExperience || "Not specified"}
${achievementsText ? `- Achievements: ${achievementsText}` : ""}
${toolsText ? `- Tools/Technologies: ${toolsText}` : ""}

Do not use square brackets, placeholder text, or anything like [object Object]. Write as if you are the applicant describing your own genuine experience and skills. If information is missing, use general strengths and experience relevant to the role.

Return exactly three well-structured paragraphs, separated by two line breaks (\\n\\n). Do not include any greeting, sign-off, or heading. Only return the letter body, ready to paste into a document.
`;

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
