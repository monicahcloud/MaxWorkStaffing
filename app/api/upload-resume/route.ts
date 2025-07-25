import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

import { parseResumeWithAffinda } from "@/lib/parseWithAffinda";
import { mapAffindaToResumeValues } from "@/lib/utils";
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action";

/* -------------------------- Helpers -------------------------- */

async function bufferFromFile(file: File) {
  return Buffer.from(await file.arrayBuffer());
}

async function extractText(file: File): Promise<string> {
  const buffer = await bufferFromFile(file);
  const ext = file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return (await pdfParse(buffer)).text;
    case "doc":
    case "docx":
      return (await mammoth.extractRawText({ buffer })).value;
    case "txt":
      return buffer.toString("utf-8");
    default:
      throw new Error("Unsupported file type");
  }
}

/* -------------------------- Main Handler -------------------------- */

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get form data and file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    // 4. Extract raw text for fallback
    let parsedText = "";
    try {
      parsedText = await extractText(file);
    } catch (err) {
      console.error("❌ Failed to extract text:", err);
      return NextResponse.json(
        { error: "Unsupported file type or failed to extract content." },
        { status: 415 }
      );
    }

    // 5. Upload to Vercel Blob
    const blob = await put(
      `uploaded_resumes/${Date.now()}-${file.name}`,
      file,
      { access: "public" }
    );

    // 6. Create initial DB row
    const resume = await prisma.resume.create({
      data: {
        userId,
        user: { connect: { clerkId: userId } },
        resumeTitle: file.name,
        uploadedFileUrl: blob.url,
        isUploaded: true,
        rawTextContent: parsedText,
        parsedWith: "",
      },
    });

    // 7. Parse with Affinda
    let parserUsed = "Affinda";
    let mappedValues;

    try {
      const documentTypeId =
        process.env.AFFINDA_RESUME_DOC_TYPE_ID ?? undefined;
      const affindaParsed = await parseResumeWithAffinda(file, documentTypeId);
      console.log("✅ Using Affinda to parse the resume.");
      mappedValues = mapAffindaToResumeValues(affindaParsed, "standard");
    } catch (err: any) {
      console.error("❌ Affinda failed:", err?.response?.data || err);
      console.log("⚙️ Falling back to OpenAI...");
      parserUsed = "OpenAI";
      mappedValues = await parseResumeWithAI(parsedText);
    }

    // 8. Save structured data + tag parser
    await saveParsedResumeData(resume.id, mappedValues);
    await prisma.resume.update({
      where: { id: resume.id },
      data: { parsedWith: parserUsed },
    });

    // 9. Respond
    return NextResponse.json({
      success: true,
      url: blob.url,
      resumeId: resume.id,
      resumeType: "Uploaded",
      resumeTitle: file.name,
    });
  } catch (err) {
    console.error("🔥 Error in POST /upload-resume:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
