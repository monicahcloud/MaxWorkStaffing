"use client";

import { checkUserProgress } from "@/app/(dashboard)/home/action";
import { useEffect, useState } from "react";

export default function useResumeProgress() {
  const [progress, setProgress] = useState({
    hasResume: false,
    hasCoverLetter: false,
    hasJob: false,
  });

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await checkUserProgress();
        setProgress(data);
      } catch (err) {
        console.error("Error fetching progress", err);
      }
    }

    fetchProgress();
  }, []);

  return progress;
}
