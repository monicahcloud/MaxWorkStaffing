/* eslint-disable @typescript-eslint/no-explicit-any */
// **no** server-only imports here – runs in the client
// no server-only imports here – runs in the client
/* ─── fetchJobsBrowser.ts ─────────────────────────────────────────── */
import type { Filters, Job } from "./types";

export async function fetchJobsBrowser(filters: Filters): Promise<Job[]> {
  const qs = new URLSearchParams({ page: "1" });
  if (filters.keyword) qs.set("q", filters.keyword);
  if (filters.state) qs.set("state", filters.state);
  if (filters.city) qs.set("city", filters.city);
  if (filters.category) qs.set("cat", filters.category); // ← already slug

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  console.log("[fetchJobs] →", `${base}/api/adzuna?${qs}`);
  const res = await fetch(`${base}/api/adzuna?${qs}`);
  const raw = (await res.json()) as any[];
  console.log("[fetchJobs] raw results:", raw.slice(0, 3)); // first 3 rows
  return raw.map((j: any, i: number): Job => {
    const min = j.salary_min ?? 0;
    const max = j.salary_max ?? 0;

    /* date → “Jul 3 2025” */
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
          : min
          ? `$${min.toLocaleString()}`
          : "Not disclosed",
      posted: postedPretty,
      description: j.description ?? "",
      requirements: [],
      category: j.category?.label ?? "",
      url: j.redirect_url ?? "#",
    };
  });
}

// Note: This function is intended for client-side use only.
// It fetches job listings based on the provided filters and returns them as an array of Job objects.
// The function constructs a query string from the filters, makes a request to the Adzuna API,
// and maps the response to the Job interface defined in the types module.
