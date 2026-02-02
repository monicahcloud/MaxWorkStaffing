import { parseResumeWithAI } from "@/app/(dashboard)/editor/forms/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();

    if (!rawText) {
      return NextResponse.json({ error: "Missing rawText" }, { status: 400 });
    }

    const parsedData = await parseResumeWithAI(rawText);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
