"use client";
import { useUser } from "@clerk/nextjs";
import { useUserProgress } from "@/components/UserProgressContext";
import ResumeProgress from "../ResumeProgress";
import TakeTourButton from "./TakeTourButton";

function ClientHome() {
  const { user } = useUser();
  const username = user?.firstName || user?.username;
  const { hasResume, hasCoverLetter, hasJob } = useUserProgress();

  // const completedSteps = [hasResume, hasCoverLetter, hasJob].filter(
  //   Boolean
  // ).length;

  return (
    <div className="bg-muted p-4 sm:p-6 md:p-8 mb-4 rounded flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-col gap-4 w-full md:w-2/4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 capitalize">
          Hi, {username}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Your dashboard is a personalized space to stay organized, access and
          create resumes and cover letters, search for jobs, and get current
          tips and trends.
        </p>
      </div>

      <div className="flex flex-col items-start sm:items-center  mr-15 gap-4 w-full md:w-auto">
        <ResumeProgress
          completed={
            [
              hasResume && "Create Resume",
              hasCoverLetter && "Cover Letter",
              hasJob && "Job\nTracker",
            ].filter(Boolean) as string[]
          }
        />

        {/* <pre>
          {JSON.stringify(
            { hasResume, hasCoverLetter, hasJob, completedSteps },
            null,
            2
          )}
        </pre> */}
        <TakeTourButton />
      </div>
    </div>
  );
}

export default ClientHome;
