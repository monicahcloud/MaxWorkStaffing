"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdzunaJobList from "./AdzunaJoblist"; // Your AdzunaJobList component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/utils/states";

// Updated Job type to match the expected structure
type Job = {
  id: string;
  title: string;
  company: { display_name: string };
  location: {
    display_name: string;
    area: string[]; // Added area property to match the structure expected in AdzunaJobList
  };
  description: string;
  redirect_url: string;
};

export default function JobSearchWrapper() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // User input for job title
  const [location, setLocation] = useState<string>(""); // User input for location

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/adzuna?q=${searchQuery}&location=${location}`
      );
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch default jobs on first load
    const fetchDefaultJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/adzuna?q=developer&location=California`); // default query
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch default jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs(); // Trigger the API call with the search query
  };

  return (
    <section className="p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Job Search</h2>
        <a
          href="/jobsearch"
          className="text-md font-medium underline text-black hover:text-blue-600">
          View more
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Job Title"
          className="md:flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update job title query
        />
        <Select onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="md:flex-1">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="bg-black text-white px-6 flex items-center gap-2"
          onClick={handleSearch}>
          Search available jobs
        </Button>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <>
          <h3 className="text-xl mt-5 font-semibold mb-3">
            {" "}
            Top 10 Search Results
          </h3>
          <AdzunaJobList jobs={jobs} />
        </>
      )}
    </section>
  );
}
