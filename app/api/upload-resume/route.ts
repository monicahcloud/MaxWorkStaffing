import { NextRequest, NextResponse } from "next/server"; // Import Next.js API types
import { auth } from "@clerk/nextjs/server"; // Clerk authentication for getting the current user
import { put } from "@vercel/blob"; // Vercel's Blob Storage API for file uploads
import prisma from "@/lib/prisma"; // Prisma client for database access
import pdfParse from "pdf-parse"; // Library to parse PDF content into plain text
import mammoth from "mammoth"; // Library to extract raw text from DOCX files
import {
  parseResumeWithAI,
  saveParsedResumeData,
} from "@/app/(dashboard)/editor/forms/action"; // Custom AI function to extract structured data from resume text

// Helper function to extract raw text from uploaded files
async function parseFileContent(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer()); // Convert file into buffer for parsing

  if (file.name.endsWith(".pdf")) {
    const data = await pdfParse(buffer); // Extract text from PDF
    return data.text;
  }

  if (file.name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer }); // Extract raw text from DOCX
    return result.value;
  }

  return "Unsupported file type."; // Fallback for unsupported formats
}

// POST route handler to handle resume uploads
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth(); // Get authenticated user ID

    if (!userId) {
      // If user is not authenticated, return 401
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData(); // Extract form data from request
    const file = formData.get("file") as File; // Get the uploaded file

    if (!file) {
      // If no file is included in the request, return 400
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const parsedText = await parseFileContent(file); // Convert file to plain text

    // Upload original file to Vercel Blob Storage
    const blob = await put(
      `uploaded_resumes/${Date.now()}-${file.name}`, // Unique path using timestamp
      file,
      { access: "public" } // Make file publicly accessible
    );

    console.log("✅ Uploaded to Blob:", blob.url); // Log the blob URL

    // Save uploaded resume metadata and text content in the database
    const resume = await prisma.resume.create({
      data: {
        userId,
        user: {
          connect: {
            clerkId: userId, // Connect resume to user via Clerk ID
          },
        },
        resumeTitle: file.name, // Use file name as default title
        uploadedFileUrl: blob.url, // Store blob URL in DB
        isUploaded: true, // Mark as uploaded (not manually created)
        rawTextContent: parsedText, // Store extracted plain text
      },
    });

    // Parse structured content (like skills, experience) from raw text using AI
    const parsedData = await parseResumeWithAI(parsedText);

    // // (Optional) Save parsed structured data in a separate table or schema
    // await prisma.resume.create({
    //   data: {
    //     userId,
    //     user: {
    //       connect: {
    //         clerkId: userId,
    //       },
    //     },
    //     resumeId: resume.id, // Link structured data to original resume
    //     content: parsedData, // Save structured content (assumed to be JSON or text)
    //   },
    // });
    // 4. Save structured data to same resume
    await saveParsedResumeData(resume.id, parsedData);

    // Respond with success and metadata
    return NextResponse.json(
      {
        success: true,
        url: blob.url,
        resumeId: resume.id,
        resumeType: "Uploaded",
        resumeTitle: file.name,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("🔥 Error uploading file:", err); // Log any unexpected error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
