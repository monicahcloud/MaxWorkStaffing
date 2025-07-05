"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Job = {
  title: string;
  company: { display_name: string };
  location: { area: string[]; display_name: string };
  redirect_url: string;
};

export default function AdzunaJobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {jobs.map((job, i) => {
        const area = job.location.area ?? [];
        const state = area[1] ?? "Unknown";
        const city = area.length > 2 ? area[area.length - 1] : state;

        return (
          <Card
            key={job.redirect_url}
            className="p-4 flex flex-col justify-between relative">
            {i < 4 && (
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}

            <h4 className="text-lg font-bold mt-6">{job.title}</h4>

            <p className="text-sm text-gray-500 mt-1">
              {job.company.display_name} — {city}, {state}
            </p>

            <a
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2">
                View Job
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Card>
        );
      })}
    </div>
  );
}
