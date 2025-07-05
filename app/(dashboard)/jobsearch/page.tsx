// This file is intentionally tiny – it simply renders the client
// component so that routing (and layout nesting) stays in the App Router.

import dynamic from "next/dynamic";

/* Dynamically import with `"use client"` component */
const JobSearch = dynamic(() => import("./JobSearch"), { ssr: false });

export default function JobSearchPage() {
  return <JobSearch />;
}
// This page is used to render the JobSearch component in the App Router
