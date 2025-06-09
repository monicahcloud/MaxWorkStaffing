import { getCoverLetterById } from "@/lib/coverletter";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const coverLetter = await getCoverLetterById(id);
  if (!coverLetter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(coverLetter);
}
