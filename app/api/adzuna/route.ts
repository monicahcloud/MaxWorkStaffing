import { NextRequest, NextResponse } from "next/server";

/* Utility: Title-case city names */
const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export async function GET(req: NextRequest) {
  const { ADZUNA_APP_ID: appId, ADZUNA_APP_KEY: appKey } = process.env;
  if (!appId || !appKey) {
    return NextResponse.json(
      { error: "Adzuna credentials missing" },
      { status: 500 }
    );
  }

  // ─ Parse query ───────────────────────────────────────
  const { searchParams } = new URL(req.url);
  const qRaw = searchParams.get("q") ?? "developer";
  const state = searchParams.get("state") ?? "";
  const city = searchParams.get("city") ?? "";
  const cityTC = city ? toTitleCase(city) : "";
  const page = parseInt(searchParams.get("page") ?? "1", 10) || 1;
  const perPage = 30; // keep in sync with UI

  // ─ Build hierarchical location string ───────────────
  const locParts = [`location0=us`];
  if (state) locParts.push(`location1=${encodeURIComponent(state)}`);
  if (cityTC) locParts.push(`location3=${encodeURIComponent(cityTC)}`);
  const locQuery = locParts.join("&");

  // ─ Base URL with correct page ────────────────────────
  const base = `https://api.adzuna.com/v1/api/jobs/us/search/${page}`;

  // ─ Primary (hierarchy) request ───────────────────────
  const apiURL =
    `${base}?app_id=${appId}&app_key=${appKey}` +
    `&results_per_page=${perPage}` +
    `&what=${encodeURIComponent(qRaw)}` +
    `&${locQuery}&content-type=application/json`;

  console.log("🔗 Adzuna request:", apiURL);

  try {
    let res = await fetch(apiURL);
    let cType = res.headers.get("content-type") ?? "";

    // ─ Fallback to free-text “where=” once ─────────────
    if (!res.ok || !cType.includes("application/json")) {
      console.warn("⚠️ Hierarchy failed, falling back to where=");

      const where = [cityTC, state].filter(Boolean).join(", ");
      const fbURL =
        `${base}?app_id=${appId}&app_key=${appKey}` +
        `&results_per_page=${perPage}` +
        `&what=${encodeURIComponent(qRaw)}` +
        `&where=${encodeURIComponent(where)}&content-type=application/json`;

      res = await fetch(fbURL);
      cType = res.headers.get("content-type") ?? "";
    }

    if (!res.ok || !cType.includes("application/json")) {
      const body = await res.text();
      console.error("❌ Adzuna error:", body.slice(0, 200));
      return NextResponse.json(
        { error: "Unexpected Adzuna response" },
        { status: 500 }
      );
    }

    const { results = [] } = await res.json();
    return NextResponse.json(results);
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
