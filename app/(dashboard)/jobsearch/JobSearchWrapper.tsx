"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/utils/states";
import AdzunaJobList from "./AdzunaJoblist";

type Job = {
  id: string;
  title: string;
  company: { display_name: string };
  location: { area: string[]; display_name: string };
  redirect_url: string;
};

const RESULTS_PER_PAGE = 30; //  ← keep in sync with API route

export default function JobSearchWrapper() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // user inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  /** Fetch helper (append or replace based on reset flag) */
  const fetchJobs = async (pageToLoad = 1, reset = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        state,
        city,
        page: pageToLoad.toString(),
      });
      const res = await fetch(`/api/adzuna?${params.toString()}`);
      const data = (await res.json()) as Job[];

      setJobs((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === RESULTS_PER_PAGE); // if less, last page
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
      if (reset) setJobs([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  /** Initial load */
  useEffect(() => {
    fetchJobs(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Top “Search” button */
  const runNewSearch = () => fetchJobs(1, true);

  /** Bottom “Load More” button */
  const loadNextPage = () => fetchJobs(page + 1);

  return (
    <section className="p-6 rounded-xl">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Job Search</h2>
      </div>

      {/* controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Job title / keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:flex-1"
        />

        <Select onValueChange={setState}>
          <SelectTrigger className="md:flex-1">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="md:flex-1"
        />

        <Button onClick={runNewSearch} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {/* results grid */}
      {jobs.length === 0 && !loading && (
        <p className="italic text-center">
          No jobs found. Try different terms.
        </p>
      )}

      {/* dynamic heading */}
      {jobs.length > 0 && (
        <h3 className="text-xl font-semibold mb-3">
          Showing {jobs.length} result{jobs.length > 1 && "s"}
        </h3>
      )}

      <AdzunaJobList jobs={jobs} />

      {/* load-more control */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={loadNextPage} disabled={loading}>
            {loading ? "Loading…" : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
}
