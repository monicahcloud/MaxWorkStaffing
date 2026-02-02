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
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a strict JSON resume parser for ${isFederal ? "Federal" : "Corporate"} roles. 
        Extract data precisely into the schema. For Federal roles, specifically identify "Key Accomplishments" 
        or "Achievements" and map them to the 'accomplishments' field as a single detailed string.`,
      },
      {
        role: "user",
        content: `Extract from this text:\n\n${rawText.substring(0, 15000)}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resume_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            personalInfo: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                jobTitle: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
              },
              required: [
                "firstName",
                "lastName",
                "jobTitle",
                "email",
                "phone",
                "address",
              ],
            },
            summary: { type: "string" },
            skills: { type: "array", items: { type: "string" } },
            workExperience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  position: { type: "string" },
                  company: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  responsibilities: { type: "string" }, // Flattened to string for Prisma
                  accomplishments: { type: "string" },
                  grade: { type: "string" }, // Federal Specific
                  clearance: { type: "string" }, // Federal Specific
                  hours: { type: "string" }, // Federal Specific
                },
                required: [
                  "position",
                  "company",
                  "location",
                  "startDate",
                  "endDate",
                  "responsibilities",
                  "accomplishments",
                  "grade",
                  "clearance",
                  "hours",
                ],
              },
            },
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  degree: { type: "string" },
                  school: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                },
                required: [
                  "degree",
                  "school",
                  "location",
                  "startDate",
                  "endDate",
                ],
              },
            },
          },
          required: [
            "personalInfo",
            "summary",
            "skills",
            "workExperience",
            "education",
          ],
        },
      },
    },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}

export async function saveParsedResumeData(resumeId: string, parsedData: any) {
  if (!resumeId) throw new Error("Missing resumeId");

  // 1. Map Keys based on the log we just saw
  const contact = parsedData.contact || {};
  const profSummary = parsedData.professional_summary || {};
  const work = parsedData.work_experience || [];
  const edu = profSummary.education || parsedData.education || [];
  const skills = parsedData.skills || [];
  const interests = parsedData.interests || [];

  // Helper to turn AI arrays into strings for the DB
  const flatten = (val: any) =>
    Array.isArray(val) ? val.join("\n") : val || "";

  return await prisma.$transaction(
    async (tx) => {
      await tx.techSkill.deleteMany({ where: { resumeId } });
      await tx.education.deleteMany({ where: { resumeId } });
      await tx.workExperience.deleteMany({ where: { resumeId } });

      return await tx.resume.update({
        where: { id: resumeId },
        data: {
          // Map "contact" name to first/last
          firstName: contact.name?.split(" ")[0] || "",
          lastName: contact.name?.split(" ").slice(1).join(" ") || "",
          jobTitle: contact.title || "",
          email: contact.email || "",
          phone: contact.phone || "",
          address: contact.address || "",
          summary: profSummary.summary || "",
          interest: interests,
          parsed: true,
          techSkills: {
            create: skills.map((s: string) => ({ name: s })),
          },
          education: {
            create: edu.map((e: any) => ({
              degree: e.degree || "",
              school: e.institution || e.school || "",
              location: e.location || "",
              // AI returned "07/1998 - 12/2002", we need to split it
              startDate: safeDate(e.dates?.split("-")[0]),
              endDate: safeDate(e.dates?.split("-")[1]),
              description: e.field || "",
            })),
          },
          workExperience: {
            create: work.map((j: any) => ({
              position: j.title || "",
              company: j.company || "",
              location: j.location || "",
              startDate: safeDate(j.dates?.split("-")[0]),
              endDate: safeDate(j.dates?.split("-")[1]),
              // FIX: Flatten the array of responsibilities into a single string
              responsibilities: flatten(j.responsibilities),
              accomplishments: flatten(j.accomplishments || j.achievements),
              description: flatten(j.responsibilities),
              duties: "",
              grade: j.grade || "",
              clearance: j.clearance || "",
              hours: j.hours || "",
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
