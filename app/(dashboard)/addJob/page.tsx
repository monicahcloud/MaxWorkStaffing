import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CreateJobForm from "@/components/jobComponents/CreateJobForm";
import { getAllJobsAction } from "@/utils/actions";
import SearchForm from "@/components/jobComponents/SearchForm";
import JobList from "@/components/jobComponents/JobsList";

export default async function AddJobPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
        <SearchForm />
        <JobList />
      </HydrationBoundary>
    </>
  );
}
