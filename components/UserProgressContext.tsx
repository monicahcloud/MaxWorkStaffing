// components/UserProgressContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type UserProgress = {
  hasResume: boolean;
  hasCoverLetter: boolean;
  hasJob: boolean;
  refreshProgress: () => void;
};

const UserProgressContext = createContext<UserProgress>({
  hasResume: false,
  hasCoverLetter: false,
  hasJob: false,
  refreshProgress: () => {},
});

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasResume, setHasResume] = useState(false);
  const [hasCoverLetter, setHasCoverLetter] = useState(false);
  const [hasJob, setHasJob] = useState(false);

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/user-progress");
      const data = await res.json();
      setHasResume(data.hasResume);
      setHasCoverLetter(data.hasCoverLetter);
      setHasJob(data.hasJob);
    } catch (err) {
      console.error("Failed to fetch user progress", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const refreshProgress = () => {
    fetchProgress();
  };

  return (
    <UserProgressContext.Provider
      value={{
        hasResume,
        hasCoverLetter,
        hasJob,
        refreshProgress,
      }}>
      {children}
    </UserProgressContext.Provider>
  );
};
