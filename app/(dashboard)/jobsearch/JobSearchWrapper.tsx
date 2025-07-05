"use client";

import { useEffect, useState, useCallback } from "react";
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
import { loadCategories, Category } from "@/utils/categories.client";
import AdzunaJobList from "./AdzunaJoblist";

/* ---------------------------- Types ---------------------------- */
type Job = {
  id: string;
  title: string;
  company: { display_name: string };
  location: { area: string[]; display_name: string };
  redirect_url: string;
};

/* ---------------------------- Constants ---------------------------- */
const CARDS_ON_HOME = 12;

/* ---------------------------- Component ---------------------------- */
export default function JobSearchWrapper() {
  const [cats, setCats] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [catSlug, setCatSlug] = useState("");

  /* Load categories on mount */
  useEffect(() => {
    loadCategories()
      .then(setCats)
      .catch((err) => {
        console.error("⚠️ Failed to load categories:", err);
        setCats([]);
      });
  }, []);

  /* Fetch jobs from API */
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query.trim(),
        state,
        city: city.trim(),
        page: "1",
      });
      if (catSlug) params.set("cat", catSlug);

      const res = await fetch(`/api/adzuna?${params.toString()}`);
      const data = (await res.json()) as Job[];
      setJobs(data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [query, state, city, catSlug]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <section className="p-6 rounded-xl">
      <h2 className="mb-4 text-2xl font-bold">Job Search</h2>

      {/* ───────────── Search Controls ───────────── */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Job title / keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:flex-1"
        />

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

        <Input
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="md:flex-1"
        />

        <Button onClick={fetchJobs} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {/* ───────────── Results Section ───────────── */}
      {!loading && jobs.length === 0 && (
        <p className="text-center italic">No jobs found.</p>
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
              See more jobs →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
// This component wraps the Adzuna job search functionality, allowing users to search for jobs by title, state, city, and category.
