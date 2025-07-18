// app/(dashboard)/jobsearch/JobSearchWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { US_STATES } from "@/utils/states";
import { loadCategories } from "@/utils/categories.client";
import AdzunaJobList from "./AdzunaJoblist";

/* ---------- types ---------- */
type Job = {
  id: string;
  title: string;
  company: { display_name: string };
  location: { area: string[]; display_name: string };
  redirect_url: string;
};

/* ---------- constants ---------- */
const CARDS_ON_HOME = 12;

/* ---------- component ---------- */
export default function JobSearchWrapper() {
  /* categories fetched client-side */
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);

  /* jobs */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  /* form inputs (uncontrolled by network) */
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [catSlug, setCatSlug] = useState("");

  /* load categories once */
  useEffect(() => {
    loadCategories().then(setCats).catch(console.error);
  }, []);

  /* fetch helper – called ONLY on initial mount + Search click */
  const fetchJobs = async (
    opts: { q?: string; state?: string; city?: string; cat?: string } = {}
  ) => {
    setLoading(true);
    try {
      const p = new URLSearchParams({
        q: opts.q?.trim() ?? "",
        state: opts.state ?? "",
        city: opts.city?.trim() ?? "",
        page: "1",
      });
      if (opts.cat) p.set("cat", opts.cat);

      const res = await fetch(`/api/adzuna?${p.toString()}`);
      const data = (await res.json()) as Job[];
      setJobs(data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* initial blank load once */
  useEffect(() => {
    fetchJobs(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* onClick handler */
  const onSearch = () => fetchJobs({ q: query, state, city, cat: catSlug });

  /* ---------- UI ---------- */
  return (
    <section className="p-6 rounded-xl">
      <h2 className="mb-4 text-2xl font-bold">Job Search</h2>

      {/* controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Job Title / Keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:flex-1"
        />

        {/* state */}
        <Select value={state} onValueChange={setState}>
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

        {/* city */}
        <Input
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="md:flex-1"
        />
        {/* category */}
        <Select value={catSlug} onValueChange={setCatSlug}>
          <SelectTrigger className="md:flex-1">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {cats.map(({ label, slug }) => (
              <SelectItem key={slug} value={slug}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onSearch} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {/* results */}
      {!loading && jobs.length === 0 && (
        <p className="italic text-center">No jobs found.</p>
      )}

      {jobs.length > 0 && (
        <>
          <h3 className="mb-3 text-xl font-semibold">
            Showing {Math.min(jobs.length, CARDS_ON_HOME)} result
            {Math.min(jobs.length, CARDS_ON_HOME) > 1 && "s"}
          </h3>

          <AdzunaJobList jobs={jobs.slice(0, CARDS_ON_HOME)} />

          <div className="mt-6 text-center">
            <Link
              href={{
                pathname: "/joblistings",
                query: {
                  q: query || undefined,
                  state: state || undefined,
                  city: city || undefined,
                  cat: catSlug || undefined,
                },
              }}
              className="inline-block font-semibold text-blue-600 hover:text-blue-800">
              See More Jobs →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
