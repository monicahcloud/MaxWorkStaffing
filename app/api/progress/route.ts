// app/api/user-progress/route.ts
import { checkUserProgress } from "@/app/(dashboard)/home/action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const progress = await checkUserProgress();
    return NextResponse.json(progress);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
