import EditJobForm from "@/components/jobComponents/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function JobDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  const job = await getSingleJobAction(params.id);

  // ✅ Redirect is now safe here
  if (!job) {
    redirect("/jobs");
  }

  // ✅ Use the job data we already fetched
  queryClient.setQueryData(["job", params.id], job);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}

export default JobDetailPage;
