// app/(dashboard)/(routes)/joblistings/page.tsx
import { notFound } from "next/navigation";
import JobListingsView from "@/app/(dashboard)/jobsearch/JobListings"; // <-- normal import
import { fetchJobsServer } from "@/app/(dashboard)/jobsearch/actions";
import type { Filters, Job } from "@/app/(dashboard)/jobsearch/types";

export default async function JobListingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  /* 1 ▸ clean query → Filters */
  const filters: Filters = {
    keyword: typeof searchParams.q === "string" ? searchParams.q : undefined,
    state:
      typeof searchParams.state === "string" ? searchParams.state : undefined,
    city: typeof searchParams.city === "string" ? searchParams.city : undefined,
    category:
      typeof searchParams.cat === "string" ? searchParams.cat : undefined,
  };

  /* 2 ▸ first page fetched on the server (env vars available) */
  let initialJobs: Job[] = [];
  try {
    initialJobs = await fetchJobsServer(filters);
  } catch (err) {
    console.error("Server-side job fetch failed:", err);
  }

  if (initialJobs.length === 0) notFound();

  /* 3 ▸ hydrate client UI */
  return <JobListingsView initialJobs={initialJobs} filters={filters} />;
}
