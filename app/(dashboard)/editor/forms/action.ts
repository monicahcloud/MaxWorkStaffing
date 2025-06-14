"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateDutiesInput,
  GenerateResponsibilitiesInput,
  GenerateSkillsInput,
  generateSkillsSchema,
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
// import { z } from "zod";

export async function generateSummary(input: GenerateSummaryInput) {
  // const { userId } = await auth();

  // if (!userId) {
  //   throw new Error("Unauthorized");
  // }

  // const subscriptionLevel = await getUserSubscriptionLevel(userId);

  // if (!canUseAITools(subscriptionLevel)) {
  //   throw new Error("Upgrade your subscription to use this feature");
  // }

  const { jobTitle, workExperiences, education, skills, techSkills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
    `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${
          exp.startDate || "N/A"
        } to ${exp.endDate || "Present"}
        Description:
        ${exp.description || "N/A"}
        `
      )
      .join("\n\n")}

      Education:
    ${education
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${
          edu.startDate || "N/A"
        } to ${edu.endDate || "N/A"}
        `
      )
      .join("\n\n")}

      Skills:
      ${skills}
       .join("\n\n")}

      TechSkill:
      ${techSkills}
    `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput
) {
  // const { userId } = await auth();

  // if (!userId) {
  //   throw new Error("Unauthorized");
  // }

  // const subscriptionLevel = await getUserSubscriptionLevel(userId);

  // if (!canUseAITools(subscriptionLevel)) {
  //   throw new Error("Upgrade your subscription to use this feature");
  // }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Location: <location> (only if provided)
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1]?.trim() || "",
    company: aiResponse.match(/Company: (.*)/)?.[1]?.trim() || "",
    location: aiResponse.match(/Location: (.*)/)?.[1]?.trim() || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}

export async function generateDuties(input: GenerateDutiesInput) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle } = input;

  const systemMessage = `
    You are an AI resume assistant. Generate a summary of duties for a resume based on the following job title. 
    Be specific, professional, and relevant to real-world work experience. Only return summary. No extra text.
  `;

  const userMessage = `Job title: ${jobTitle}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse.trim();
}

export async function generateResponsibilities(
  input: GenerateResponsibilitiesInput
) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle } = input;

  const systemMessage = `
    You are an AI resume assistant. Generate a summary of responsibilities for a resume based on the following job title. 
    Be specific, professional, and relevant to real-world work experience. Only return summary. No extra text.
  `;

  const userMessage = `Job title: ${jobTitle}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse.trim();
}

export async function generateSkills(
  input: GenerateSkillsInput
): Promise<string[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle } = generateSkillsSchema.parse(input);

  // System message to explicitly request 100 skills
  const systemMessage = `
    You are a resume assistant AI. Generate a concise list of exactly 50 highly relevant and professional resume skills 
    based on the candidate's job title. Return a raw JSON array of strings only. 
    Ensure that the list includes a wide range of relevant skills suitable for the job title.
  `;

  const userMessage = `
    Job Title: ${jobTitle}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.5,
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) throw new Error("Failed to generate AI response");

  try {
    // Clean the AI response to ensure it is valid JSON
    const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();

    // Parse the cleaned response as JSON
    const parsed = JSON.parse(cleanResponse);

    // Ensure we have an array of strings and that we return exactly 100 skills
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      // Slice to 100 skills, in case the AI returns more
      return parsed.slice(0, 50);
    } else {
      throw new Error("AI response is not a valid list of strings.");
    }
  } catch (err) {
    console.error("Skill JSON parsing error:", err, aiResponse);
    throw new Error("Invalid AI response format — please try again.");
  }
}

export async function parseResumeWithAI(rawText: string) {
  // Truncate input early
  if (rawText.length > 10000) {
    console.warn(
      "[parseResumeWithAI] Input too large, truncating to 10,000 chars"
    );
    rawText = rawText.slice(0, 10000);
  }

  const prompt = `
You are a resume parser. Extract structured data from the resume text below in JSON format with these fields:

{
  "personalInfo": {
    "firstName": string,
    "lastName": string,
    "jobTitle": string,
    "email": string,
    "phone": string,
    "address": string,
    "website": string,
    "linkedin": string,
    "gitHub": string,
  },
  "summary": string,
  "skills": string[],
  "education": [
    {
      "degree": string,
      "location": string,
      "school": string,
      "startDate": string,
      "endDate": string
    }
  ],
  "workExperience": [
    {
      "position": string,
      "company": string,
      "startDate": string,
      "endDate": string,
      "description": string,
      "location": string,
      "status":string,
      "clearance":string,
      "duties":string,
      "responsibilities":string,
      "grade":string,
      "hours":string
    }
  ],
  "interests": string[]
}

Here is the resume text:
"""${rawText}"""

Return only the JSON object.
`;

  console.log("[parseResumeWithAI] Starting resume parse");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a resume parser AI that outputs JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error("[parseResumeWithAI] OpenAI call failed:", err);
    throw new Error("Resume parsing failed due to OpenAI error");
  }

  clearTimeout(timeout);

  const aiResponse = completion.choices[0].message.content;
  console.log("[parseResumeWithAI] AI raw response:", aiResponse);

  if (!aiResponse) throw new Error("Failed to generate AI response");

  try {
    const clean = cleanJsonString(aiResponse);
    const parsedData = JSON.parse(clean);
    console.log("[parseResumeWithAI] Parsed JSON data:", parsedData);
    return parsedData;
  } catch (err) {
    console.error("[parseResumeWithAI] JSON parse error:", err, aiResponse);
    throw new Error("Failed to parse structured resume data.");
  }
}

export async function saveParsedResumeData(resumeId: string, parsedData: any) {
  console.log("parsedData:", parsedData);
  if (!resumeId) throw new Error("Missing resumeId");

  const {
    personalInfo,

    summary,
    skills,
    education,
    workExperience,
    interests,
    parsed,
  } = parsedData;

  const {
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    address,
    website,
    linkedin,
    gitHub,
  } = personalInfo;
  // 1. Clear previous nested data to avoid duplicates
  await prisma.techSkill.deleteMany({ where: { resumeId } });
  await prisma.education.deleteMany({ where: { resumeId } });
  await prisma.workExperience.deleteMany({ where: { resumeId } });

  // 2. Update resume with new parsed data
  await prisma.resume.update({
    where: { id: resumeId },
    data: {
      resumeTitle: parsedData.resumeTitle || "Untitled",
      description: summary || "",
      firstName,
      lastName,
      jobTitle,
      email,
      phone,
      address,
      website,
      linkedin,
      gitHub,
      parsed: parsed ?? true,
      summary: summary || "",
      // string[] fields
      skills: skills || [],
      interest: interests || [],
      // related records
      techSkills: {
        create: skills?.map((skill: string) => ({ name: skill })) || [],
      },
      education: {
        create:
          education?.map((edu: any) => ({
            degree: edu.degree,
            school: edu.school,
            location: edu.location,
            // startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            // endDate: edu.endDate ? new Date(edu.endDate) : undefined,
            startDate: safeDate(edu.startDate),
            endDate: safeDate(edu.endDate),
            description: edu.description,
          })) || [],
      },
      workExperience: {
        create:
          workExperience?.map((job: any) => ({
            position: job.position,
            company: job.company,
            location: job.location,
            // startDate: job.startDate ? new Date(job.startDate) : undefined,
            // endDate: job.endDate ? new Date(job.endDate) : undefined,
            startDate: safeDate(job.startDate),
            endDate: safeDate(job.endDate),
            description: job.description,
            status: job.status,
            clearance: job.clearance,
            duties: job.duties,
            responsibilities: job.responsibilities,
            grade: job.grade,
            hours: job.hours,
          })) || [],
      },
    },
  });
}
