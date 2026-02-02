import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const isFederal = formData.get("isFederal") === "true"; // Captured from UI toggle

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    // 1. Handle File Formats
    if (file.type === "application/pdf") {
      const pdfData = await pdf(buffer);
      rawText = pdfData.text;
    } else if (
      file.name.endsWith(".docx") ||
      file.type.includes("wordprocessingml")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return NextResponse.json(
        { error: "Please upload PDF or DOCX" },
        { status: 400 }
      );
    }

    // 2. Parse with AI first to get the Job Title for the DB
    const parsedJson = await parseResumeWithAI(rawText, isFederal);

    // 3. Create Resume with Automatic Template Selection
    const newResume = await prisma.resume.create({
      data: {
        clerkId: userId,
        userId: userId,
        resumeTitle: file.name.replace(/\.[^/.]+$/, ""),
        rawTextContent: rawText,
        parsedWith: "OpenAI",
        // AUTO-TEMPLATE SELECTION
        themeId: isFederal ? "federal" : "modern",
        jobTitle: parsedJson.personalInfo?.jobTitle || "",
        firstName: parsedJson.personalInfo?.firstName || "",
        lastName: parsedJson.personalInfo?.lastName || "",
      },
    });

    // 4. Save structured related data (Work, Edu, Skills)
    await saveParsedResumeData(newResume.id, parsedJson);

    return NextResponse.json({
      success: true,
      resumeId: newResume.id,
      parsedJson,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
