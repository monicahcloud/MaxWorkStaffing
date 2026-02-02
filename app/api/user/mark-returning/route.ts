import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        isFirstTimeUser: false,
      },
    });

    return new NextResponse("User marked as returning", { status: 200 });
  } catch (error) {
    console.error("Error marking user as returning:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
