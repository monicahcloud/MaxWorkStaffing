/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/jobsearch/actions.ts
// ─────────────────────────────────────
import "server-only";
import { getCategoryMap } from "@/utils/categories.server";
import type { Filters, Job } from "./types";

export async function fetchJobsServer(filters: Filters): Promise<Job[]> {
  /* ─── build query string ───────────────────────────── */
  const qs = new URLSearchParams({ page: "1" });
  if (filters.keyword) qs.set("q", filters.keyword);
  if (filters.state) qs.set("state", filters.state);
  if (filters.city) qs.set("city", filters.city);

  if (filters.category) {
    const map = await getCategoryMap(); // label → slug
    const slug = map.get(filters.category) ?? filters.category;
    qs.set("cat", slug);
  }

  /* ─── call internal API route ─────────────────────── */
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/adzuna?${qs}`);
  if (!res.ok) throw new Error(`Adzuna request failed (${res.status})`);

  const raw = (await res.json()) as any[];

  /* ─── map to unified Job shape ─────────────────────── */
  return raw.map((j: any, i: number): Job => {
    const min = j.salary_min ?? 0;
    const max = j.salary_max ?? 0;

    /* 2025-07-03T05:22:55Z → Jul 3 2025 */
    const postedPretty = j.created
      ? new Date(j.created).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown";

    return {
      id: j.id ?? i,
      title: j.title ?? "Untitled",
      company: j.company?.display_name ?? "Unknown",
      location: j.location?.display_name ?? "Unknown",
      type: j.contract_type ?? "Unknown",

      salaryMin: min || undefined,
      salaryMax: max || undefined,
      salaryDisplay:
        min && max
          ? `$${min.toLocaleString()} – $${max.toLocaleString()}`
          : "Not disclosed",

      posted: postedPretty,
      description: j.description ?? "",
      requirements: [], // add parsing if you like
      category: j.category?.label ?? "",
      url: j.redirect_url ?? "#",
    };
  });
}
