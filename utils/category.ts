// Runs only on the server (App-Router). Safe to use "server-only".

import { cache } from "react";

const { ADZUNA_APP_ID: id, ADZUNA_APP_KEY: key } = process.env;
if (!id || !key) throw new Error("Missing Adzuna credentials");

/**  Pull the live Adzuna category list once every 10 minutes  */
export const getCategories = cache(async () => {
  const url =
    `https://api.adzuna.com/v1/api/jobs/us/categories` +
    `?app_id=${id}&app_key=${key}&content-type=application/json`;

  const res = await fetch(url, { next: { revalidate: 600 } }); // 10 min
  if (!res.ok) throw new Error("Adzuna /categories failed");

  const json = await res.json();
  return (json.results ?? []).map(({ label, tag }: any) => ({
    /** Adzuna labels end with “ Jobs” – strip it for display */
    label: label.replace(/ Jobs$/i, ""),
    slug: tag, // ← what Adzuna expects for the &category= parameter
  })) as { label: string; slug: string }[];
});
/**  Build a map of category label → slug  */
