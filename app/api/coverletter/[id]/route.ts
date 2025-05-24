import { getcoverLetterById } from "@/app/(dashboard)/coverletterbuilder/editor/actions";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const coverLetter = await getcoverLetterById(id);
  if (!coverLetter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(coverLetter);
}
