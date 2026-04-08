import prisma from "@/lib/prisma";
import { InterviewSchema } from "@/lib/validation";
import { getInterviewCover } from "@/utils/utils";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const generatedInterviewQuestionsSchema = z.object({
  questions: z.array(z.string().min(1)).min(3).max(10),
});

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = InterviewSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { role, industry, level, type, focusAreas, amount, clerkId } =
    parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true, clerkId: true },
    });

    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const interviewTypeInstruction =
      type === "behavioral"
        ? "Focus primarily on behavioral questions about communication, teamwork, conflict resolution, leadership, adaptability, and decision-making."
        : type === "role-specific"
          ? "Focus primarily on role-specific questions that test knowledge, responsibilities, real-world scenarios, and job-relevant skills for this role and industry."
          : type === "leadership"
            ? "Focus primarily on leadership questions about ownership, strategic thinking, team management, decision-making, accountability, and influence."
            : "Balance behavioral, role-specific, and situational questions appropriately for the role and industry.";

    const { object } = await generateObject({
      model: openai("gpt-5"),
      schema: generatedInterviewQuestionsSchema,
      prompt: `
Create interview questions for a mock interview.

Candidate role: ${role}
Industry: ${industry}
Experience level: ${level}
Interview style: ${type}
Key skills or focus areas: ${focusAreas || "General professional competencies"}
Number of questions: ${amount}

Instructions:
- Tailor the questions to the candidate's role, industry, and experience level.
- Do not assume the role is technical unless the role or focus areas clearly indicate that.
- ${interviewTypeInstruction}
- Make the questions sound natural in a live spoken interview.
- Avoid symbols like "/" or "*" that could sound awkward in voice delivery.
- Return exactly ${amount} questions.
      `,
    });

    const parsedQuestions = object.questions.slice(0, amount);

    const interview = await prisma.interview.create({
      data: {
        role,
        industry,
        type,
        level,
        techstack: focusAreas
          ? focusAreas
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        questions: parsedQuestions,
        userId: user.id,
        finalized: false,
        coverImage: getInterviewCover(industry),
      },
    });

    return Response.json({ success: true, interview }, { status: 201 });
  } catch (error) {
    console.error("Interview generation error:", error);
    return Response.json(
      { success: false, error: "Server error while generating interview." },
      { status: 500 },
    );
  }
}
