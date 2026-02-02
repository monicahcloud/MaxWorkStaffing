/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Helper to get specialized system instructions based on category
const getArchetypeInstructions = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "federal":
      return "STRICT RULE: Use formal government language. Focus on GS-grade levels, specific metrics, and regulatory compliance. Use detailed, long-form bullet points.";
    case "creative":
      return "STRICT RULE: Use punchy, modern action verbs. Keep descriptions concise to fit sidebar layouts. Focus on high-level branding.";
    case "technology":
      return "STRICT RULE: Emphasize the tech stack (languages, frameworks). Focus on quantitative impact (e.g., 'Reduced latency by 40%').";
    default:
      return "Use professional business language. Focus on achievements and results using active voice.";
  }
};

export async function generateSummary(
  input: GenerateSummaryInput & { category?: string }
) {
  // 1. Extract category from raw input immediately
  const { category } = input;

  // 2. Parse with Zod and remove 'education' from destructuring to stop the error
  const { jobTitle, workExperiences, skills, techSkills } =
    generateSummarySchema.parse(input) as any;

  const archetypeMsg = getArchetypeInstructions(category);

  const systemMessage = `
    You are a professional resume writer AI. Write a concise introduction summary.
    ${archetypeMsg}
    Return ONLY the summary text.
  `;

  const userMessage = `
    Please generate a professional resume summary from this data:
    Job title: ${jobTitle || "N/A"}
    Work experience: ${workExperiences
      ?.map(
        (exp: any) => `${exp.position} at ${exp.company}: ${exp.description}`
      )
      .join("; ")}
    Skills: ${skills?.join(", ")}
    Tech Skills: ${techSkills?.map((s: any) => s.name).join(", ")}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  return completion.choices[0].message.content?.trim() || "";
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput & { category?: string }
) {
  // Extract category first
  const { category } = input;
  const { description } = generateWorkExperienceSchema.parse(input);

  const archetypeMsg = getArchetypeInstructions(category);

  const systemMessage = `
    You are a resume generator AI. Generate a single work experience entry.
    ${archetypeMsg}
    Structure your response exactly like this:
    Job title: <title>
    Company: <name>
    Location: <location>
    Start date: <YYYY-MM-DD>
    End date: <YYYY-MM-DD>
    Description: <bullets>
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `Input: ${description}` },
    ],
  });

  const aiResponse = completion.choices[0].message.content || "";

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1]?.trim() || "",
    company: aiResponse.match(/Company: (.*)/)?.[1]?.trim() || "",
    location: aiResponse.match(/Location: (.*)/)?.[1]?.trim() || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } as WorkExperience;
}

export async function generateDuties(
  input: GenerateDutiesInput & { category?: string }
) {
  const archetypeMsg = getArchetypeInstructions(input.category);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Generate a summary of duties. ${archetypeMsg}`,
      },
      { role: "user", content: `Job title: ${input.jobTitle}` },
    ],
  });
  return completion.choices[0].message.content?.trim() || "";
}

export async function generateResponsibilities(
  input: GenerateResponsibilitiesInput & { category?: string }
) {
  const archetypeMsg = getArchetypeInstructions(input.category);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `Generate responsibilities. ${archetypeMsg}` },
      { role: "user", content: `Job title: ${input.jobTitle}` },
    ],
  });
  return completion.choices[0].message.content?.trim() || "";
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

function cleanJsonString(jsonStr: string): string {
  return jsonStr
    .replace(/```json\s*/i, "") // remove opening
    .replace(/```$/, "") // remove *all* triple backticks
    .trim();
}

function safeDate(value: any): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

export async function parseResumeWithAI(
  rawText: string,
  isFederal: boolean = false
) {
  const prompt = `
    You are an expert resume parser specialized in ${
      isFederal ? "Federal/Government" : "Standard Corporate"
    } resumes. 
    Extract ALL structured data from the resume text below.

    ${
      isFederal
        ? `
    STRICT FEDERAL INSTRUCTIONS:
    - DO NOT SUMMARIZE. Federal resumes require extreme detail.
    - Locate GS-Grades (e.g., GS-11, GS-12) and map to "grade".
    - Identify Security Clearances (e.g., Secret, TS/SCI) and map to "clearance".
    - Extract "Hours per Week" and map to "hours".
    - Look for "Series" numbers (e.g., 2210) and map to "status".
    - Look for KSA (Knowledge, Skills, and Abilities) keywords and include them in "skills".
    - Federal resumes list "Duties" and "Accomplishments" separately; you MUST extract them into the "duties" and "responsibilities" fields.
    `
        : `
    CORPORATE INSTRUCTIONS:
    - Extract the full job description into the "description" field.
    - Do not lose specific metrics or results.
    `
    }

    JSON STRUCTURE:
    {
      "personalInfo": {
        "firstName": "string", "lastName": "string", "jobTitle": "string",
        "email": "string", "phone": "string", "address": "string",
        "website": "string", "linkedin": "string", "gitHub": "string"
      },
      "summary": "string",
      "skills": ["string"],
      "education": [
        { "degree": "string", "location": "string", "school": "string", "startDate": "string", "endDate": "string", "description": "string" }
      ],
      "workExperience": [
        {
          "position": "string", "company": "string", "location": "string",
          "startDate": "string", "endDate": "string", 
          "description": "Full extracted description for corporate resumes",
          "status": "string", "clearance": "string", 
          "duties": "Detailed tasks for federal resumes",
          "responsibilities": "Detailed ownership for federal resumes",
          "grade": "string", "hours": "string"
        }
      ],
      "interest": ["string"]
    }

    Return ONLY raw JSON. Use YYYY-MM-DD for dates.
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Optimized for speed/cost balance
    messages: [
      {
        role: "system",
        content:
          "You are a JSON-only resume parser. You never summarize; you only extract.",
      },
      { role: "user", content: prompt + `\n\nResume Text:\n"""${rawText}"""` },
    ],
    temperature: 0,
    response_format: { type: "json_object" },
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) throw new Error("AI failed to respond");

  try {
    return JSON.parse(aiResponse);
  } catch (err) {
    console.error("Parse Error:", err);
    throw new Error("Invalid JSON structure returned by AI");
  }
}

export async function saveParsedResumeData(resumeId: string, parsedData: any) {
  console.log("🧠 parsedData received:", JSON.stringify(parsedData, null, 2));

  if (!resumeId) throw new Error("Missing resumeId");

  const {
    personalInfo = {},
    summary = "",
    skills = [],
    education = [],
    workExperience = [],
    interest = [],
    parsed = true,
  } = parsedData;

  const {
    firstName = "",
    lastName = "",
    jobTitle = "",
    email = "",
    phone = "",
    address = "",
    website = "",
    linkedin = "",
    gitHub = "",
  } = personalInfo;

  // Use a transaction to ensure consistency
  await prisma.$transaction(async (tx) => {
    // 1. Clear existing related data to prevent duplicates
    await Promise.all([
      tx.techSkill.deleteMany({ where: { resumeId } }),
      tx.education.deleteMany({ where: { resumeId } }),
      tx.workExperience.deleteMany({ where: { resumeId } }),
    ]);

    // 2. Update main resume record with personal info and summary
    await tx.resume.update({
      where: { id: resumeId },
      data: {
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        address,
        website,
        linkedin,
        gitHub,
        summary,
        parsed,
        // Optionally update resume title if present
        resumeTitle: parsedData.resumeTitle || undefined,
        interest,
      },
    });

    // 3. Create related tech skills
    if (skills.length > 0) {
      await tx.techSkill.createMany({
        data: skills.map((name: string) => ({ resumeId, name })),
      });
    }

    // 4. Create related education entries
    if (education.length > 0) {
      await tx.education.createMany({
        data: education.map((edu: any) => ({
          resumeId,
          degree:
            typeof edu.degree === "string"
              ? edu.degree
              : edu.degree?.education || "", // fallback
          school: edu.school || "",
          location: edu.location || "",
          startDate: safeDate(edu.startDate),
          endDate: safeDate(edu.endDate),
          description: edu.description || "", // <-- currently missing in some cases
        })),
      });
    }

    // 5. Create related work experience entries
   if (workExperience.length > 0) {
     await tx.workExperience.createMany({
       data: workExperience.map((job: any) => ({
         resumeId,
         position: job.position || "",
         company: job.company || "",
         location: job.location || "",
         startDate: safeDate(job.startDate),
         endDate: safeDate(job.endDate),
         description: job.description || "", // This captures the full corporate text
         status: job.status || "",
         clearance: job.clearance || "",
         duties: job.duties || "", // This captures detailed federal tasks
         responsibilities: job.responsibilities || "", // This captures federal ownership
         grade: job.grade || "",
         hours: job.hours || "",
       })),
     });
   }
  });
}

export async function analyzeContent(
  text: string,
  category: string,
  fieldName: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const systemMessage = `
    You are an expert Resume Critic. Analyze the user's input for a ${category} resume archetype.
    Field being analyzed: ${fieldName}.
    
    CRITIQUE CRITERIA:
    - Federal: Must be detailed, use GS-grade terminology, and include specific metrics.
    - Creative: Must be punchy and concise (under 200 chars).
    - Technology: Must mention specific tools/languages and quantitative impact.
    
    Provide a single, helpful suggestion (max 20 words). If it's perfect, say "Looks excellent for this design!"
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `Text to analyze: "${text}"` },
    ],
    temperature: 0,
  });

  return (
    completion.choices[0].message.content?.trim() ||
    "Unable to analyze at this time."
  );
}
