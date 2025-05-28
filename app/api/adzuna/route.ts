// app/api/adzuna/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return NextResponse.json(
      { error: "Adzuna credentials missing" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "developer";
  const state = searchParams.get("state") || "";
  const location1 = state ? "&location1=" + state : "";
  const city = searchParams.get("city") || "";

  const apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(
    query
  )}&location0=us${location1}&content-type=application/json`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      console.error("Adzuna API error:", res.status, data);
      return NextResponse.json(
        { error: `Adzuna API error: ${res.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data.results || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Adzuna jobs" },
      { status: 500 }
    );
  }
}
