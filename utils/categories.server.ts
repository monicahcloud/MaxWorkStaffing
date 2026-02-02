// utils/categories.server.ts
import "server-only";
import { cache } from "react";

const { ADZUNA_APP_ID: id, ADZUNA_APP_KEY: key } = process.env;
if (!id || !key) throw new Error("Missing Adzuna credentials");

/** Pull Adzuna’s live list once every 10 min (600 s) */
export const getCategories = cache(async () => {
  const url =
    `https://api.adzuna.com/v1/api/jobs/us/categories` +
    `?app_id=${id}&app_key=${key}&content-type=application/json`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Adzuna /categories failed");

  const { results = [] } = await res.json();

  return results.map((c: any) => ({
    label: c.label.replace(/ Jobs$/i, ""),
    slug: c.tag,
  })) as { label: string; slug: string }[];
});

/** Map (label ⇢ slug) plus (reverse) */
export const getCategoryMap = cache(async () => {
  const cats = await getCategories();
  const map = new Map<string, string>();
  cats.forEach(({ label, slug }) => map.set(label, slug));
  return map;
});
