// components/ResumeProgressServer.tsx
import ResumeProgress from "./ResumeProgress";
import { getResumeProgress } from "@/lib/getResumeProgress";

export default async function ResumeProgressServer() {
  const completedSteps = await getResumeProgress();

  return <ResumeProgress completedSteps={completedSteps} />;
}
