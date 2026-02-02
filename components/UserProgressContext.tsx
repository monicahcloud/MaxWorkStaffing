// components/UserProgressContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type UserProgress = {
  hasResume: boolean;
  hasCoverLetter: boolean;
  hasJob: boolean;
  hasInterview: boolean; // Added
  refreshProgress: () => void;
};

const UserProgressContext = createContext<UserProgress>({
  hasResume: false,
  hasCoverLetter: false,
  hasJob: false,
  hasInterview: false, // Added
  refreshProgress: () => {},
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
      const res = await fetch("/api/progress");
      const data = await res.json();
      setProgress({
        hasResume: !!data.hasResume,
        hasCoverLetter: !!data.hasCoverLetter,
        hasJob: !!data.hasJob,
        hasInterview: !!data.hasInterview, // Ensure your API returns this
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
      value={{ ...progress, refreshProgress: fetchProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};
