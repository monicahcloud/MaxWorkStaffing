"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserProgress = {
  hasResume: boolean;
  hasCoverLetter: boolean;
  hasJob: boolean;
  hasInterview: boolean;
  refreshProgress: () => Promise<void>;
};

const UserProgressContext = createContext<UserProgress>({
  hasResume: false,
  hasCoverLetter: false,
  hasJob: false,
  hasInterview: false,
  refreshProgress: async () => {},
});

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState({
    hasResume: false,
    hasCoverLetter: false,
    hasJob: false,
    hasInterview: false,
  });

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/progress", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Progress request failed with status ${res.status}`);
      }

      const data = await res.json();

      setProgress({
        hasResume: Boolean(data.hasResume),
        hasCoverLetter: Boolean(data.hasCoverLetter),
        hasJob: Boolean(data.hasJob),
        hasInterview: Boolean(data.hasInterview),
      });
    } catch (err) {
      console.error("Failed to fetch user progress", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <UserProgressContext.Provider
      value={{
        ...progress,
        refreshProgress: fetchProgress,
      }}>
      {children}
    </UserProgressContext.Provider>
  );
};
