"use server";

import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";

export async function generateCoverLetter({ jobTitle }: { jobTitle: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const systemMessage = `You are an AI assistant writing only the body of a professional cover letter. Format the output using valid HTML with <p> tags for each paragraph.`;

  const userMessage = `Write the main body (only) of a professional cover letter for the job title: ${jobTitle}.
  Do not include greeting, sign-off, or heading. Return 3  distinct paragraphs in HTML format using <p>...</p> but do not show the <p></p> in the display.`;

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
