"use client";
// app/(dashboard)/(routes)/joblisting/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import JobListingsView from "../../jobsearch/JobListings";

export default function JobsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const filters = {
    keyword: params.get("q") ?? undefined,
    location: params.get("state") ?? undefined,
    city: params.get("city") ?? undefined,
    category: params.get("cat") ?? undefined, // ✅ now supported
  };

  return <JobListingsView filters={filters} onBack={() => router.back()} />;
}
