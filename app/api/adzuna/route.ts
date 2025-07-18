// app/api/adzuna/route.ts
import { getCategoryMap } from "@/utils/categories.server";
import { NextRequest, NextResponse } from "next/server";

/* Title-case helper for cleaner queries, e.g. “new york” → “New York” */
const toTitle = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export async function GET(req: NextRequest) {
  const { ADZUNA_APP_ID: id, ADZUNA_APP_KEY: key } = process.env;
  if (!id || !key)
    return NextResponse.json(
      { error: "Missing Adzuna creds" },
      { status: 500 }
    );

  /* ─────── Parse & normalise query params ─────── */
  const p = req.nextUrl.searchParams;
  const q = p.get("q") ?? "developer";
  const state = p.get("state") ?? "";
  const cityRaw = p.get("city") ?? "";
  const page = +(p.get("page") ?? 1) || 1;
  const catRaw = p.get("cat") ?? "";

  const cityTC = cityRaw ? toTitle(cityRaw) : "";

  /* Category: user may pass friendly label or slug */
  const map = await getCategoryMap();
  const catSlug = map.get(catRaw) ?? catRaw; // label ➜ slug OR slug

  /* Common query string fragments */
  const base =
    `https://api.adzuna.com/v1/api/jobs/us/search/${page}` +
    `?app_id=${id}&app_key=${key}` +
    `&results_per_page=30` +
    `&what=${encodeURIComponent(q)}` +
    (catSlug ? `&category=${encodeURIComponent(catSlug)}` : "");

  const buildWhere = () =>
    [cityTC, state] // "Atlanta, Georgia" or just "Atlanta"
      .filter(Boolean)
      .join(", ");

  /* ─────── 1. Try hierarchy (only if STATE exists) ─────── */
  let url = "";
  if (state) {
    const loc: string[] = [
      "location0=us",
      `location1=${encodeURIComponent(state)}`,
    ];
    if (cityTC) loc.push(`location3=${encodeURIComponent(cityTC)}`);
    url = `${base}&${loc.join("&")}&content-type=application/json`;
  } else if (cityTC) {
    /* city-only search → jump straight to where= */
    url = `${base}&where=${encodeURIComponent(
      buildWhere()
    )}&content-type=application/json`;
  } else {
    /* no city, no state → nationwide */
    url = `${base}&location0=us&content-type=application/json`;
  }

  let res = await fetch(url);
  let ok = res.ok && res.headers.get("content-type")?.includes("json");

  /* ─────── 2. Fallback to where= once, if hierarchy failed ─────── */
  if (!ok && cityTC) {
    const whereURL =
      `${base}` +
      `&where=${encodeURIComponent(buildWhere())}` +
      `&content-type=application/json`;

    res = await fetch(whereURL);
    ok = res.ok && res.headers.get("content-type")?.includes("json");
  }

  /* ─────── Final response handling ─────── */
  if (!ok) {
    const text = await res.text().catch(() => "");
    console.error("❌ Adzuna error payload:", text.slice(0, 200));
    return NextResponse.json({ error: "Adzuna error" }, { status: 502 });
  }
  console.log("🔍 Adzuna URL:", url);
  console.log("🧭 category:", { input: catRaw, resolved: catSlug });

  const { results = [] } = await res.json();
  return NextResponse.json(results);
}
