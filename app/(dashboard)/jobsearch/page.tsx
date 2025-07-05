// page.tsx stays a **Server** component
import dynamic from "next/dynamic";

// dynamic() without ssr:false is allowed – it’ll render
// a small shell on the server and hydrate on the client.
const JobSearch = dynamic(() => import("./JobSearch"));

export default function JobSearchPage() {
  return <JobSearch />;
}
