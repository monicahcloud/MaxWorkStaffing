// app/api/cover-letter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { coverLetterSchema } from "@/lib/validation";
import { ZodError } from "zod";

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
        userId: clerkId,
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: err.errors },
        { status: 400 }
      );
    }
    console.error("❌ API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
