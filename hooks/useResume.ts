import { getResumeById } from "@/app/(dashboard)/resumes/action";
import { useQuery } from "@tanstack/react-query";

export function useResume(resumeId: string) {
  return useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => getResumeById(resumeId),
    enabled: !!resumeId, // won't run if ID is not available
    staleTime: 1000 * 60 * 5, // optional: 5 mins cache
  });
}
