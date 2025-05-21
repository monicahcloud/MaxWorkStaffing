// app/api/cover-letter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { coverLetterSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, ...rest } = body;

    const parsed = coverLetterSchema.parse(body);

    if (id) {
      const updated = await prisma.coverLetter.update({
        where: { id },
        data: { ...parsed, updatedAt: new Date() },
      });

      return NextResponse.json(updated);
    }

    const created = await prisma.coverLetter.create({
      data: {
        ...parsed,
        clerkId,
        user: {
          connect: { clerkId },
        },
      },
    });

    return NextResponse.json(created);
  } catch (err: any) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
