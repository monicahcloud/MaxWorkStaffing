import EditJobForm from "@/components/jobComponents/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function JobDetailPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
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
