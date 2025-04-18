// app/(dashboard)/jobs/[id]/page.tsx
import { redirect } from "next/navigation";
import EditJobForm from "@/components/jobComponents/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  const job = await getSingleJobAction(params.id);

  // ✅ Safe to use redirect here
  if (!job) {
    redirect("/jobs");
  }

  queryClient.setQueryData(["job", params.id], job);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}
