import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

async function parseFileContent(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.name.endsWith(".pdf")) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (file.name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  return "Unsupported file type.";
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const parsedText = await parseFileContent(file);

    // Upload to Vercel Blob
    const blob = await put(
      `uploaded_resumes/${Date.now()}-${file.name}`,
      file,
      { access: "public" }
    );

    console.log("✅ Uploaded to Blob:", blob.url);

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        userId,
        user: {
          connect: {
            clerkId: userId,
          },
        },
        resumeTitle: file.name,
        uploadedFileUrl: blob.url,
        isUploaded: true,
        rawTextContent: parsedText,
      },
    });

    return NextResponse.json(
      { success: true, url: blob.url, resumeId: resume.id },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("🔥 Error uploading file:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
