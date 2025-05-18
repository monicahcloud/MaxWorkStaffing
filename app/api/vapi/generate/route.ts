import prisma from "@/lib/prisma";
import { InterviewSchema } from "@/lib/validation";
import { getRandomInterviewCover } from "@/utils/utils";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = InterviewSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { type, role, level, techstack, amount, userId } = parsed.data;

  try {
    const { text: questions } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack || "N/A"}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]
      
Thank you! <3`,
    });

    let parsedQuestions: string[];
    try {
      parsedQuestions = JSON.parse(questions);
      if (!Array.isArray(parsedQuestions)) throw new Error("Not an array");
    } catch {
      console.error("Failed to parse questions:", questions);
      return Response.json(
        { success: false, error: "Invalid question format from AI." },
        { status: 500 }
      );
    }
    console.log(parsedQuestions);
    const interview = await prisma.interview.create({
      data: {
        role,
        type,
        level,
        techstack: techstack ? techstack.split(",").map((s) => s.trim()) : [],
        questions: parsedQuestions,
        userId,
        finalized: true,
        coverImage: getRandomInterviewCover(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(interview);

    return Response.json({ success: true, interview }, { status: 201 });
  } catch (error) {
    console.error("Interview generation error:", error);
    return Response.json(
      { success: false, error: "Server error while generating interview." },
      { status: 500 }
    );
  }
}
