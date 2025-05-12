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

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div className="bg-muted p-4 mb-4 rounded flex items-center justify-between gap-10 ">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-3xl font-extrabold text-blue-900  capitalize">
            Hey, {username}!
          </h1>
          <p className="text-muted-foreground">
            Your dashboard is a personalized space to stay organized, access and
            create resumes and cover letters, search for jobs and get current
            tips and trends.
          </p>
        </div>
        <ResumeProgress completedSteps={completedSteps} /> <br />
        <TakeTourButton />
      </div>
    </>
  );
}

export default ClientHome;
