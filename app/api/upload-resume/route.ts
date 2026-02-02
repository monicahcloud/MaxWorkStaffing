/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf"; // Modern, fast, no Buffer warnings
import mammoth from "mammoth";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Force Node.js runtime for document processing
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const isFederal = formData.get("isFederal") === "true";

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Read file once into an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    let rawText = "";

    // --- 1. EXTRACT TEXT ---
    if (file.type === "application/pdf") {
      // unpdf is modern and avoids the deprecated Buffer() warning
      const { text } = await extractText(arrayBuffer);
      rawText = Array.isArray(text) ? text.join("\n") : text;
    } else if (
      file.name.endsWith(".docx") ||
      file.type.includes("wordprocessingml")
    ) {
      // Mammoth needs a Buffer
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return NextResponse.json(
        { error: "Please upload a PDF or DOCX file" },
        { status: 400 },
      );
    }

    if (!rawText.trim()) {
      throw new Error("Could not extract any text from this document.");
    }

    // --- 2. AI PARSING ---
    // Limit string length to protect against OpenAI token limits/timeouts
    const parsedJson = await parseResumeWithAI(
      rawText.substring(0, 15000),
      isFederal,
    );

    // --- 3. DATABASE OPERATIONS ---
    const newResume = await prisma.resume.create({
      data: {
        clerkId: userId,
        userId: userId,
        resumeTitle: file.name.replace(/\.[^/.]+$/, ""),
        rawTextContent: rawText,
        parsedWith: "OpenAI",
        themeId: isFederal ? "federal" : "modern",
        jobTitle: parsedJson.personalInfo?.jobTitle || "",
        firstName: parsedJson.personalInfo?.firstName || "",
        lastName: parsedJson.personalInfo?.lastName || "",
      },
    });

    // Save related tables (Work, Edu, Skills) via the refactored transaction
    await saveParsedResumeData(newResume.id, parsedJson);

    return NextResponse.json({
      success: true,
      resumeId: newResume.id,
    });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process document" },
      { status: 500 },
    );
  }
}
