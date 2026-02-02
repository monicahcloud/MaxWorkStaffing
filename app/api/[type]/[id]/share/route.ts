import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
  { params }: { params: { type: string; id: string } }
) {
  const { type, id } = params;

  if (!["resume", "coverletter"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  // Select model dynamically
  let modelFindUnique: any;
  let modelUpdate: any;

  if (type === "resume") {
    modelFindUnique = prisma.resume.findUnique;
    modelUpdate = prisma.resume.update;
  } else if (type === "coverletter") {
    modelFindUnique = prisma.coverLetter.findUnique;
    modelUpdate = prisma.coverLetter.update;
  }

  const item = await modelFindUnique({
    where: { id },
  });

  if (!item) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  if (!item.shareToken) {
    const token = uuidv4();
    await modelUpdate({
      where: { id },
      data: { shareToken: token },
    });
    return NextResponse.json({ shareToken: token });
  }

  return NextResponse.json({ shareToken: item.shareToken });
}
