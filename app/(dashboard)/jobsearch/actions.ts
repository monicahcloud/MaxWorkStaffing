// export async function fetchJobsByCategory(category: string) {
//   const endpoint = `/api/adzuna?category=${encodeURIComponent(category)}`;
//   const res = await fetch(endpoint);
//   if (!res.ok) throw new Error("Failed to fetch jobs");

import { categoryMap } from "@/utils/category";

export async function fetchJobs(filters: {
  keyword?: string;
  location?: string;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (filters.keyword) query.append("what", filters.keyword);
  if (filters.location) query.append("where", filters.location);

  if (filters.category) {
    const tag = categoryMap[filters.category];
    if (tag) {
      query.append("category", tag);
    } else {
      console.warn(`Unknown category: ${filters.category}`);
    }
  }
  console.log("Fetching with:", query.toString());

  const endpoint = `/api/adzuna?${query.toString()}`;
  const res = await fetch(endpoint);
  const data = await res.json();

  console.log(" fetchJobs Adzuna API raw response:", data);

  const jobsArray = Array.isArray(data.results)
    ? data.results
    : Array.isArray(data)
    ? data
    : [];

  if (jobsArray.length === 0) {
    throw new Error("No jobs found or invalid structure.");
  }

  return jobsArray
    .filter((job: any) => {
      if (!filters.category) return true;

      const categoryLabel = job.category?.label?.toLowerCase();
      const selectedCategory = filters.category.toLowerCase();

      return categoryLabel?.includes(selectedCategory);
    })
    .map((job: any, index: number) => ({
      id: job.id || index,
      title: job.title,
      location: job.location?.display_name || "Unknown",
      type: job.contract_time || "N/A",
      salary: job.salary_display || "N/A",
      posted: job.created || "N/A",
      description: job.description,
      requirements: [],
      category: job.category?.label || "Uncategorized",
    }));
}
