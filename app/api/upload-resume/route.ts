import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";

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

    // Upload to Vercel Blob
    const blob = await put(
      `uploaded_resumes/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
      }
    );

    console.log("✅ Uploaded to Blob:", blob.url);

    // Save to database
    await prisma.resume.create({
      data: {
        userId,
        resumeTitle: file.name,
        uploadedFileUrl: blob.url,
        isUploaded: true,
      },
    });

    return NextResponse.json({ success: true, url: blob.url }, { status: 200 });
  } catch (err: unknown) {
    console.error("🔥 Error uploading file:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
