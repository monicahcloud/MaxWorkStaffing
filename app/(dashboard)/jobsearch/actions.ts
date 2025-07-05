// import "server-only";
// import { getCategoryMap } from "@/utils/categories.server";
// import { Filters, Job } from "./types";

// export async function fetchJobs(filters: Filters): Promise<Job[]> {
//   const p = new URLSearchParams({ page: "1" });

//   if (filters.keyword) p.set("q", filters.keyword);
//   if (filters.state) p.set("state", filters.state);
//   if (filters.city) p.set("city", filters.city);

//   if (filters.category) {
//     const map = await getCategoryMap();
//     p.set("cat", map.get(filters.category) ?? filters.category);
//   }

//   const r = await fetch(`/api/adzuna?${p.toString()}`);
//   const api = (await r.json()) as any[];

//   /* very light mapping – adjust to your taste */
//   return api.map(
//     (j, i): Job => ({
//       id: j.id ?? i,
//       title: j.title,
//       location: j.location?.display_name ?? "Unknown",
//       type: j.contract_time ?? "N/A",
//       salary: j.salary_display ?? "N/A",
//       posted: j.created ?? "N/A",
//       description: j.description ?? "",
//       requirements: [],
//       category: j.category?.label ?? "",
//     })
//   );
// }
// server-only file – safe to import creds & category map
import "server-only";
import { getCategoryMap } from "@/utils/categories.server";
import { Filters, Job } from "./types";

export async function fetchJobsServer(filters: Filters): Promise<Job[]> {
  const qs = new URLSearchParams({ page: "1" });

  if (filters.keyword) qs.set("q", filters.keyword);
  if (filters.state) qs.set("state", filters.state);
  if (filters.city) qs.set("city", filters.city);

  if (filters.category) {
    const map = await getCategoryMap(); // <- server-only import
    const slug = map.get(filters.category) ?? filters.category;
    qs.set("cat", slug);
  }

  /** call *internal* API route – fine on the server */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adzuna?${qs}`
  );
  if (!res.ok) throw new Error("Adzuna request failed (server)");
  const raw = (await res.json()) as any[];

  return raw.map(
    (j, i): Job => ({
      id: j.id ?? i,
      title: j.title,
      location: j.location?.display_name ?? "Unknown",
      type: j.contract_time ?? "N/A",
      salary: j.salary_display ?? "N/A",
      posted: j.created ?? "N/A",
      description: j.description ?? "",
      requirements: [],
      category: j.category?.label ?? "",
    })
  );
}
