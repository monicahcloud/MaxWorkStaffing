import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CreateJobForm from "@/components/jobComponents/CreateJobForm";
import { getAllJobsAction } from "@/utils/actions";
import JobList from "@/components/jobComponents/JobsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker",
};

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
        <JobList />
      </HydrationBoundary>
    </>
  );
}
