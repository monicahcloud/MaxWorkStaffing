"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Building2 } from "lucide-react";

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
        const state = area[1] ?? "US";
        const city = area.length > 2 ? area[area.length - 1] : state;

        return (
          <Card
            key={job.redirect_url}
            className="group p-5 flex flex-col justify-between border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all rounded-2xl relative">
            {i < 4 && (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest animate-pulse">
                New
              </span>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Building2 className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                  {job.company.display_name}
                </span>
              </div>

              <h4 className="text-base font-black text-black leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                {job.title}
              </h4>

              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3 h-3 text-red-600" />
                <span className="text-[10px] font-bold">
                  {city}, {state}
                </span>
              </div>
            </div>

            <a
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6">
              <Button
                variant="outline"
                className="w-full h-9 border-black text-black font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white rounded-lg transition-all flex items-center gap-2">
                View Opportunity
                <ArrowRight className="w-3 h-3" />
              </Button>
            </a>
          </Card>
        );
      })}
    </div>
  );
}
