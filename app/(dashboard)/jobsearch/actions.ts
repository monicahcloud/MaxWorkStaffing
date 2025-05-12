export async function fetchJobsByCategory(category: string) {
  const endpoint = `/api/adzuna?category=${encodeURIComponent(category)}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch jobs");

  const data = await res.json();
  console.log("Adzuna API response:", data); // <--- Add this line

  if (!data?.results) {
    throw new Error("Invalid response structure: 'results' field is missing");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.map((job: any, index: number) => ({
    id: job.id || index,
    title: job.title,
    location: job.location.display_name,
    type: job.contract_time || "N/A",
    salary: job.salary_display || "N/A",
    posted: job.created || "N/A",
    description: job.description,
    requirements: [],
    category: job.category?.label || category,
  }));
}
