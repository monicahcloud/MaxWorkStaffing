"use client";

import { useEffect, useState } from "react";
import TakeTourButton from "./TakeTourButton";
import { useUser } from "@clerk/nextjs";
import ResumeProgress from "../ResumeProgress";

function ClientHome() {
  const [loaded, setLoaded] = useState(false);
  const completedSteps = 4;
  const { user } = useUser();
  const username = user?.firstName || user?.username;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="bg-muted p-4 sm:p-6 md:p-8 mb-4 rounded flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 capitalize">
          Hey, {username}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Your dashboard is a personalized space to stay organized, access and
          create resumes and cover letters, search for jobs, and get current
          tips and trends.
        </p>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-4 w-full md:w-auto">
        <ResumeProgress completedSteps={completedSteps} />
        <TakeTourButton />
      </div>
    </div>
  );
}

export default ClientHome;
