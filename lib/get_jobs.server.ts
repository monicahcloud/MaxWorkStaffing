// libs/get-jobs.server.ts
import "server-only";
import { getCategoryMap } from "@/utils/categories.server";

const { ADZUNA_APP_ID: id, ADZUNA_APP_KEY: key } = process.env;
if (!id || !key) throw new Error("Missing Adzuna credentials");

export type RawFilters = {
  q?: string;
  state?: string;
  city?: string;
  cat?: string; // may be “friendly” or already a slug
  page?: string; // (optional) for pagination
};

/** Title-case helper for city names */
const toTitle = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

export async function getJobs(filters: RawFilters) {
  const {
    q = "developer",
    state = "",
    city = "",
    cat = "",
    page = "1",
  } = filters;

  /* friendly-label → slug   */
  const map = await getCategoryMap();
  const slug = map.get(cat) ?? cat;

  /* build location hierarchy */
  const loc: string[] = ["location0=us"];
  if (state) loc.push(`location1=${encodeURIComponent(state)}`);
  if (city) loc.push(`location3=${encodeURIComponent(toTitle(city))}`);

  /* compose URL */
  const url =
    `https://api.adzuna.com/v1/api/jobs/us/search/${page}` +
    `?app_id=${id}&app_key=${key}` +
    `&results_per_page=30` +
    `&what=${encodeURIComponent(q)}` +
    (slug ? `&category=${encodeURIComponent(slug)}` : "") +
    `&${loc.join("&")}` +
    `&content-type=application/json`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`Adzuna returned ${res.status}`);

  const { results = [] } = await res.json();
  return results;
}
