/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";
import mammoth from "mammoth";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let parsedJson: any = null;
  let newResumeId: string | null = null;

  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const isFederal = formData.get("isFederal") === "true";

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    let rawText = "";

    // --- 1. EXTRACT TEXT (PDF vs DOCX) ---
    if (file.type === "application/pdf") {
      const { text } = await extractText(arrayBuffer);
      rawText = Array.isArray(text) ? text.join("\n") : text;
    } else if (
      file.name.endsWith(".docx") ||
      file.type.includes("wordprocessingml")
    ) {
      // Mammoth requires a Buffer
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported format" },
        { status: 400 },
      );
    }

    if (!rawText.trim()) throw new Error("Could not extract text.");

    // --- 2. AI PARSING (Strict Schema) ---
    parsedJson = await parseResumeWithAI(rawText, isFederal);

    // --- 3. DB OPERATIONS ---
    const newResume = await prisma.resume.create({
      data: {
        clerkId: userId,
        userId: userId,
        resumeTitle: file.name.replace(/\.[^/.]+$/, ""),
        rawTextContent: rawText,
        parsedWith: "OpenAI",
        themeId: isFederal ? "federal" : "modern",
        firstName: parsedJson.personalInfo.firstName,
        lastName: parsedJson.personalInfo.lastName,
        jobTitle: parsedJson.personalInfo.jobTitle,
      },
    });

    newResumeId = newResume.id;
    await saveParsedResumeData(newResume.id, parsedJson);

    return NextResponse.json({
      success: true,
      resumeId: newResume.id,
      parsedJson,
    });
  } catch (error: any) {
    console.error("Upload Error:", error.message);

    // Recovery: Open modal even if DB failed
    if (parsedJson) {
      return NextResponse.json({
        success: true,
        resumeId: newResumeId,
        parsedJson,
      });
    }

    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
