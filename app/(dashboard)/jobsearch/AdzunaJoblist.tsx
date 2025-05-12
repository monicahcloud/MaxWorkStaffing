"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type Job = {
  title: string;
  company: { display_name: string };
  location: {
    area: string[]; // e.g., ["US", "California", "San Francisco"]
    display_name: string;
  };
  description: string;
  redirect_url: string;
};

type AdzunaJobListProps = {
  jobs: Job[];
};

export default function AdzunaJobList({ jobs }: AdzunaJobListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {jobs.slice(0, 10).map((job, i) => {
        const area = job.location?.area || [];
        const state = area[1] || "Unknown State";
        const city = area[2] || "Unknown City";

        return (
          <Card key={i} className="p-4 flex flex-col justify-between relative">
            {i < 3 && (
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
            <h4 className="text-lg font-bold mt-6">{job.title}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {job.company?.display_name || "Unknown Company"} in {city},{" "}
              {state}
            </p>
            <div className="mt-auto">
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block">
                <Button
                  variant="outline"
                  className="flex items-center justify-end gap-2 text-blue-700">
                  View Job
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
