"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isNew?: boolean;
};

interface JobSearchProps {
  jobs: Job[];
}

export const JobSearch: React.FC<JobSearchProps> = ({ jobs }) => {
  return (
    <section className=" p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Job Search</h2>
        <a
          href="/jobsearch"
          className="text-sm font-medium underline text-black hover:text-blue-600">
          View more
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Job Title" className="md:flex-1" />
        <Input placeholder="Location" className="md:flex-1" />
        <Button className="bg-black text-white px-6 flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search available jobs
        </Button>
      </div>

      <h3 className="text-lg font-semibold mb-3">Search Results</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="p-4 flex flex-col justify-between relative">
            {job.isNew && (
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
            <h4 className="text-lg font-bold mt-6">{job.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{`${job.company} in ${job.location}`}</p>
            <div className="mt-auto flex justify-end">
              <Button variant="ghost" size="icon">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
