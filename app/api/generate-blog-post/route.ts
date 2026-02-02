import { generateBlogPostsIfNeeded } from "@/app/(dashboard)/home/action";
import { NextResponse } from "next/server";

export async function POST() {
  await generateBlogPostsIfNeeded();
  return NextResponse.json({ success: true });
}
