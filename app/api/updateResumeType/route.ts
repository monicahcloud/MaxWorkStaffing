// /app/api/updateResumeType/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { resumeId, resumeType } = await req.json();

    if (!resumeId || !resumeType) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: { resumeType },
    });

    return NextResponse.json({ success: true, resume: updated });
  } catch (error) {
    console.error("Error updating resume type:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
