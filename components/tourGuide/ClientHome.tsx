"use client";

import { useEffect, useState } from "react";
import TakeTourButton from "./TakeTourButton";

function ClientHome() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded flex items-center justify-between">
        <div>
          <span className="font-semibold text-blue-700">
            Welcome to MaxWork Staffing ResumeBuilder!
          </span>
          <span className="ml-2 text-blue-600">
            Ready to get started? Build a resume, add your first job and start
            tracking your applications today.
          </span>
        </div>

        <TakeTourButton />
      </div>
    </>
  );
}

export default ClientHome;
