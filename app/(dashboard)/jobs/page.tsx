import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import SearchForm from "@/components/jobComponents/SearchForm";
import JobList from "@/components/jobComponents/JobsList";

async function AllJobsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobList />
    </HydrationBoundary>
  );
}

export default AllJobsPage;
