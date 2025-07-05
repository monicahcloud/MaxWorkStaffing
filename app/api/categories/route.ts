// app/api/categories/route.ts
import { getCategories } from "@/utils/categories.server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getCategories());
}
