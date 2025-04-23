"use client";

import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import ComplexButtonContainer from "./ComplexButtonContainer";
import { useCallback, useEffect, useState } from "react";

function JobList() {
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const pageNumber = Number(searchParams.get("page")) || 1;
  const fetchJobs = useCallback(() => {
    return getAllJobsAction({ search, jobStatus, page: pageNumber });
  }, [search, jobStatus, pageNumber]);

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: fetchJobs,
    enabled: ready, // Only run after hydration
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (!ready || isPending) return <h2 className="text-xl">Please Wait...</h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold capitalize">{count} jobs found</h2>
        {totalPages > 1 && (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobList;
