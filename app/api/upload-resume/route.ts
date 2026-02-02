/* eslint-disable @typescript-eslint/no-explicit-any */
/*api/upload-resume/route.ts*/
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// 1. Force Node.js runtime for PDF/Docx processing
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

    // 2. Fix Buffer Deprecation: Use Buffer.from()
    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    if (file.type === "application/pdf") {
      // 3. Optimize PDF parsing to be faster and skip image rendering
      const pdfData = await pdf(buffer, {
        pagerender: (pageData: any) => {
          return pageData.getTextContent().then((textContent: any) => {
            return textContent.items.map((item: any) => item.str).join(" ");
          });
        },
      });
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
        { status: 400 },
      );
    }

    // 4. AI and DB operations follow...
    const parsedJson = await parseResumeWithAI(rawText, isFederal);

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
      { status: 500 },
    );
  }
}
