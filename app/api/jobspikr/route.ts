/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.PIKR_CLIENT_AUTH_KEY;
  const userId = process.env.PIKR_CLIENT_ID;

  const query = new URL(req.url).searchParams.get("q") || "teacher";
  const url = `https://api.jobspikr.com/v2/dataflow/joblisting?user_id=${userId}&key=${apiKey}&q=${query}&country=us&num=10&format=json`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    if (!res.ok) {
      console.error("Jobspikr Error:", res.status, text);
      throw new Error(`Jobspikr API error: ${res.status}`);
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Jobspikr Fetch Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
