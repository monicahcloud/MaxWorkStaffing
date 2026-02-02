// page.tsx stays a **Server** component
import dynamic from "next/dynamic";

const JobSearch = dynamic(() => import("./JobSearch"));

export default function JobSearchPage() {
  return <JobSearch />;
}
