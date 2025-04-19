import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CreateJobForm from "@/components/jobComponents/CreateJobForm";

export default function AddJobPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
        <AddJobPage />
      </HydrationBoundary>
    </>
  );
}
