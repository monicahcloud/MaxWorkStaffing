import { parseResumeWithAI } from "@/app/(dashboard)/editor/forms/action";
import { NextResponse } from "next/server";

// This tells Vercel specifically to use the Node.js runtime (required for PDF parsing libs)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // Check if the body is too large before processing
    const body = await req.json();
    const { rawText } = body;

    if (!rawText || typeof rawText !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing rawText" },
        { status: 400 },
      );
    }

    // AI calls are the main reason for timeouts.
    // Ensure parseResumeWithAI uses a modern OpenAI instantiation.
    const parsedData = await parseResumeWithAI(rawText);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    // Check for specific timeout errors to give better feedback
    if (error instanceof Error && error.message.includes("timeout")) {
      return NextResponse.json(
        { error: "AI processing took too long. Try a shorter resume." },
        { status: 504 },
      );
    }

    console.error("Parse Error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 },
    );
  }
}
