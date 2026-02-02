/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSkillsInput,
  generateSkillsSchema,
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

// --- UTILS ---

/**
 * Strips markdown code blocks from AI strings to ensure valid JSON parsing
 */
function cleanJsonString(jsonStr: string): string {
  return jsonStr
    .replace(/```json\s*/i, "")
    .replace(/```$/, "")
    .trim();
}

/**
 * Validates dates to prevent Prisma crashes on "Present" or "Current" strings
 */
function safeDate(value: any): Date | undefined {
  if (
    !value ||
    value.toLowerCase().includes("present") ||
    value.toLowerCase().includes("current")
  ) {
    return undefined; // Prisma treats undefined as NULL for DateTime fields
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

const getArchetypeInstructions = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "federal":
      return "STRICT RULE: Use formal government language. Focus on GS-grade levels, metrics, and compliance.";
    case "creative":
      return "STRICT RULE: Use punchy action verbs. Keep it concise.";
    case "technology":
      return "STRICT RULE: Emphasize tech stack and quantitative impact.";
    default:
      return "Use professional business language with active voice.";
  }
};

// --- AI GENERATORS ---

export async function generateSummary(
  input: GenerateSummaryInput & { category?: string },
) {
  const { category } = input;
  const { jobTitle, workExperiences, skills, techSkills } =
    generateSummarySchema.parse(input) as any;

  const systemMessage = `Write a concise resume summary. ${getArchetypeInstructions(category)}`;
  const userMessage = `Title: ${jobTitle}. Exp: ${workExperiences?.map((e: any) => e.position).join(", ")}. Skills: ${skills?.join(", ")}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  return completion.choices[0].message.content?.trim() || "";
}

export async function generateSkills(
  input: GenerateSkillsInput,
): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAITools(subscriptionLevel)) throw new Error("Upgrade required");

  const { jobTitle } = generateSkillsSchema.parse(input);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return a raw JSON array of 50 skills for this job title.",
      },
      { role: "user", content: jobTitle },
    ],
    temperature: 0.5,
  });

  const content = completion.choices[0].message.content || "[]";
  return JSON.parse(cleanJsonString(content));
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput & { category?: string },
) {
  const { category } = input;
  // Use Zod to validate input
  const { description } = generateWorkExperienceSchema.parse(input);
  const archetypeMsg = getArchetypeInstructions(category);

  const systemMessage = `
    You are a professional resume generator AI. 
    Generate a structured work experience entry based on the user's input.
    ${archetypeMsg}
    
    If the category is 'Federal', you MUST extract or infer:
    - 'duties' (Daily tasks)
    - 'responsibilities' (High-level ownership)
    - 'grade' (GS-level if mentioned)
    - 'hours' (Hours per week)
    
    Return the data in the following JSON format ONLY.
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `Input text to transform: "${description}"` },
    ],
    // Using json_object for reliability
    response_format: { type: "json_object" },
    temperature: 0,
  });

  const content = completion.choices[0].message.content || "{}";
  const parsed = JSON.parse(cleanJsonString(content));

  // Map the JSON response back to our WorkExperience type
  return {
    position: parsed.position || parsed.jobTitle || "",
    company: parsed.company || "",
    location: parsed.location || "",
    description: parsed.description || "",
    startDate: parsed.startDate || null,
    endDate: parsed.endDate || null,
    // Federal specific fields
    status: parsed.status || "",
    clearance: parsed.clearance || "",
    duties: parsed.duties || "",
    responsibilities: parsed.responsibilities || "",
    grade: parsed.grade || "",
    hours: parsed.hours || "",
  } as WorkExperience;
}
// --- RESUME PARSING ---

export async function parseResumeWithAI(
  rawText: string,
  isFederal: boolean = false,
) {
  const prompt = `Extract all data from this ${isFederal ? "Federal" : "Corporate"} resume into JSON.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a JSON-only parser. Never summarize.",
      },
      { role: "user", content: prompt + `\n\nText:\n${rawText}` },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}

export async function saveParsedResumeData(resumeId: string, parsedData: any) {
  if (!resumeId) throw new Error("Missing resumeId");

  // Log the raw AI output in Vercel logs to see what's actually coming back
  console.log("RAW AI DATA:", JSON.stringify(parsedData, null, 2));

  // AGGRESSIVE MAPPING: AI often uses underscores or different names
  const p = parsedData.personalInfo || parsedData.personal_info || {};
  const work =
    parsedData.workExperience ||
    parsedData.work_experience ||
    parsedData.experience ||
    [];
  const edu = parsedData.education || [];
  const skills =
    parsedData.skills ||
    parsedData.techSkills ||
    parsedData.technical_skills ||
    [];

  return await prisma.$transaction(
    async (tx) => {
      // Clear old data
      await tx.techSkill.deleteMany({ where: { resumeId } });
      await tx.education.deleteMany({ where: { resumeId } });
      await tx.workExperience.deleteMany({ where: { resumeId } });

      // Nested update for speed and atomicity
      return await tx.resume.update({
        where: { id: resumeId },
        data: {
          firstName: p.firstName || p.first_name || "",
          lastName: p.lastName || p.last_name || "",
          jobTitle: p.jobTitle || p.job_title || "",
          email: p.email || "",
          phone: p.phone || "",
          address: p.address || "",
          summary: parsedData.summary || "",
          techSkills: {
            create: skills
              .map((s: any) => ({
                name: typeof s === "string" ? s : s.name || s.skill || "",
              }))
              .filter((s: any) => s.name !== ""), // Prevent blank skills
          },
          education: {
            create: edu.map((e: any) => ({
              degree: e.degree || "",
              school: e.school || e.university || "",
              location: e.location || "",
              startDate: safeDate(e.startDate || e.start_date),
              endDate: safeDate(e.endDate || e.end_date),
              description: e.description || "",
            })),
          },
          workExperience: {
            create: work.map((j: any) => ({
              position: j.position || j.jobTitle || j.job_title || "",
              company: j.company || j.organization || "",
              location: j.location || "",
              startDate: safeDate(j.startDate || j.start_date),
              endDate: safeDate(j.endDate || j.end_date),
              description: j.description || "",
              duties: j.duties || "",
              responsibilities: j.responsibilities || "",
            })),
          },
        },
      });
    },
    { timeout: 30000 },
  );
}

// --- CONTENT ANALYSIS ---

export async function analyzeContent(
  text: string,
  category: string,
  fieldName: string,
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a Resume Critic for ${category}. Suggest 1 improvement (max 20 words).`,
      },
      { role: "user", content: `Field ${fieldName}: "${text}"` },
    ],
  });

  return completion.choices[0].message.content?.trim() || "Excellent!";
}
