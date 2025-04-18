// app/(dashboard)/jobs/[id]/page.tsx
import EditJobForm from "@/components/jobComponents/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// ✅ Correctly define props to match Next.js expectations
type JobDetailPageProps = {
  params: {
    id: string;
  };
};

async function JobDetailPage({ params }: JobDetailPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}

export default JobDetailPage;
