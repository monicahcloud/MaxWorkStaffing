// app/api/resumes/update-theme/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { resumeId, themeId } = await req.json();

    // Updates the resume record with the new Design Token ID
    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId,
        clerkId: userId,
      },
      data: {
        themeId: themeId,
      },
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("[THEME_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
