"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";
import { US_STATES } from "@/utils/states";
import { jobIndustries } from "@/utils/industry";
import { fetchJobs } from "./actions";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  category: string;
}

interface Filters {
  keyword?: string;
  state?: string; // we’ll split state vs city
  city?: string;
  category?: string;
}

interface Props {
  filters: Filters;
  onBack: () => void;
}

export default function JobListingsView({ filters, onBack }: Props) {
  /* --------------------------- controlled inputs --------------------------- */
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const [state, setState] = useState(filters.state ?? "");
  const [city, setCity] = useState(filters.city ?? "");
  const [category, setCategory] = useState(filters.category ?? "");

  /* --------------------------- job data & ui state ------------------------- */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- keep inputs in sync if parent props change (Back button) ----- */
  useEffect(() => {
    setKeyword(filters.keyword ?? "");
    setState(filters.state ?? "");
    setCity(filters.city ?? "");
    setCategory(filters.category ?? "");
  }, [filters]);

  /* ----------------------------- fetch jobs -------------------------------- */
  const runSearch = async () => {
    setLoading(true);
    try {
      const newFilters: Filters = {
        keyword,
        state,
        city,
        category,
      };
      const fetched = await fetchJobs(newFilters);
      setJobs(fetched);
      setSelectedJob(fetched[0] ?? null);
    } catch (err) {
      console.error("Failed fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* fetch once on mount with initial filters */
  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  /* -------------------------------- render --------------------------------- */
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <SectionTitle text="Detailed Job Search" subtext="" />

      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={onBack} className="text-black">
          ← Back to Categories
        </Button>
        <h1 className="text-xl font-bold text-red-700">
          {category ? `Jobs in ${category}` : "Job Listings"}
        </h1>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Keyword */}
        <Input
          placeholder="Job Title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-[200px]"
        />

        {/* State */}
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="min-w-[160px]" aria-label="Select a state">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City */}
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 min-w-[160px]"
        />

        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="min-w-[160px]" aria-label="Category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {jobIndustries.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search button */}
        <Button
          onClick={runSearch}
          disabled={loading}
          className="bg-red-700 hover:bg-red-800 text-white">
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {/* Job list + detail pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-4 lg:col-span-1">
          {loading ? (
            <p>Loading jobs…</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <Card
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`border p-4 cursor-pointer hover:shadow-md ${
                  selectedJob?.id === job.id ? "border-red-700" : ""
                }`}>
                <p className="text-sm text-gray-500">{job.location}</p>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.type}</p>
                <p className="text-sm font-medium text-gray-800">
                  {job.salary}
                </p>
                <p className="text-xs text-gray-400 mt-2">{job.posted}</p>
              </Card>
            ))
          )}
        </div>

        {/* Detail pane */}
        {selectedJob && (
          <div className="lg:col-span-2 border p-6 rounded-xl bg-gray-50 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{selectedJob.title}</h2>
              <p className="text-sm text-gray-600">{selectedJob.location}</p>
              <p className="flex gap-4 mt-2 text-sm">
                <span>{selectedJob.type}</span>
                <span>{selectedJob.salary}</span>
                <span>{selectedJob.posted}</span>
              </p>
            </div>

            <Button className="bg-red-700 text-white w-fit">Apply</Button>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Description</h3>
              <p className="text-sm whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Requirements</h3>
              <ul className="list-disc pl-6 text-sm space-y-1">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
