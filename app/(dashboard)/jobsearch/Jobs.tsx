"use client";
import { useEffect, useState } from "react";

type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobspikr?q=teacher");
      const data = await res.json();
      setJobs(data?.data || []);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="grid gap-4">
      {jobs.map((job, i) => (
        <div key={i} className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-sm text-gray-600">
            {job.company} – {job.location}
          </p>
          <p className="text-sm mt-2">{job.description.slice(0, 150)}...</p>
          <a
            href={job.url}
            target="_blank"
            className="text-blue-500 underline mt-2 inline-block">
            View Job
          </a>
        </div>
      ))}
    </div>
  );
}
