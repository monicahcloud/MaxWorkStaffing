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
// import { jobIndustries } from "@/utils/industry";
import { fetchJobsBrowser } from "./fetchJobsBrowser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { loadCategories } from "@/utils/categories.client";

interface Job {
  id: string | number;
  title: string;
  company: string; // 🆕
  location: string;
  type: string;
  salaryMin?: number; // 🆕 raw numbers
  salaryMax?: number; // 🆕
  salaryDisplay: string; // nicely formatted range / “N/A”
  posted: string;
  description: string;
  requirements: string[];
  category: string;
  url: string; // 🆕 redirect_url
}

interface Filters {
  keyword?: string;
  state?: string; // we’ll split state vs city
  city?: string;
  category?: string;
}

interface Props {
  initialJobs: Job[];
  filters: Filters;
}

export default function JobListingsView({ filters, initialJobs }: Props) {
  /* --------------------------- controlled inputs --------------------------- */
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const [state, setState] = useState(filters.state ?? "");
  const [city, setCity] = useState(filters.city ?? "");
  const [category, setCategory] = useState(filters.category ?? "");
  const router = useRouter();
  const [slugToLabel, setSlugToLabel] = useState<Record<string, string>>({});
  const pathname = usePathname(); // ← current route ( “/joblistings” )
  const searchParams = useSearchParams(); // ← live QueryString reader

  /* --------------------------- job data & ui state ------------------------- */
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    initialJobs[0] ?? null
  );
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [catSlug, setCatSlug] = useState<string | undefined>();
  useEffect(() => {
    loadCategories().then(setCats).catch(console.error);
  }, []);
  /* ---------- keep inputs in sync if parent props change (Back button) ----- */
  useEffect(() => {
    setKeyword(filters.keyword ?? "");
    setState(filters.state ?? "");
    setCity(filters.city ?? "");
    setCategory(filters.category ?? "");
  }, [filters]);

  /* extend the existing “load categories once” effect */
  useEffect(() => {
    loadCategories()
      .then((arr) => {
        const map: Record<string, string> = {};
        arr.forEach(({ slug, label }) => (map[slug] = label));
        setSlugToLabel(map);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const urlFilters: Filters = {
      keyword: searchParams.get("q") ?? undefined,
      state: searchParams.get("state") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      category: searchParams.get("cat") ?? undefined,
    };

    // avoid an extra network call the very first time (already have initialJobs)
    if (initialJobs.length === 0) runSearch(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // <- triggers whenever the URL query changes

  /* ----------------------------- fetch + push jobs -------------------------------- */

  const runSearch = async (next: Filters) => {
    /* 1️⃣ build the new query-string -------------------------------------- */
    const qs = new URLSearchParams();
    if (next.keyword) qs.set("q", next.keyword.trim());
    if (next.state) qs.set("state", next.state);
    if (next.city) qs.set("city", next.city.trim());
    if (next.category) qs.set("cat", next.category);

    /* 2️⃣ push it to the router  (this updates the address-bar *and*
           gives us a navigation entry we can “Back” to)               */
    router.push(`${pathname}?${qs.toString()}`);

    /* 3️⃣ fetch with the same params ------------------------------------- */
    setLoading(true);
    try {
      const result = await fetchJobsBrowser(next);
      setJobs(result);
      setSelectedJob(null); // clear right-hand pane
    } finally {
      setLoading(false);
    }
  };
  /* ----------------------------- render inputs ----------------------------- */
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <SectionTitle text="Detailed Job Search" subtext="" />

      <div className="flex justify-between items-center">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="text-black">
          ← Back to Categories
        </Button>
        <h1 className="text-xl font-bold text-red-700">
          {category
            ? `Jobs in ${slugToLabel[category] ?? category}`
            : "Job Listings"}
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
        <Select value={catSlug} onValueChange={setCatSlug}>
          <SelectTrigger className="w-full md:w-56 h-10">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {cats.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search button */}
        <Button
          onClick={() =>
            runSearch({
              keyword,
              state,
              city,
              category,
            })
          }
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
            <div className="rounded-lg border p-6 text-center text-gray-600">
              <p className="text-lg font-semibold">
                Nothing matched your search 🤔
              </p>
              <p className="mt-1 text-sm">
                Try a different keyword, broaden the location, check your
                spelling or pick another category.
              </p>
            </div>
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
                <p className="text-sm text-gray-600">{job.company}</p>{" "}
                {/* 🆕 */}
                <p className="text-sm">{job.salaryDisplay}</p> {/* 🆕 */}
                <p className="mt-1 text-xs text-gray-400">{job.posted}</p>
                <Button
                  asChild /* ⬅️  renders the child element itself   */
                  className="bg-red-700 text-white">
                  <a
                    href={job.url} /* external URL from Adzuna */
                    target="_blank"
                    rel="noopener noreferrer">
                    Apply
                  </a>
                </Button>
              </Card>
            ))
          )}
        </div>

        {/* Detail pane */}
        {selectedJob && (
          <div className="lg:col-span-2 border p-6 rounded-xl bg-gray-50 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{selectedJob.title}</h2>
              <p className="text-sm text-gray-600">
                {selectedJob.company} — {selectedJob.location}
              </p>
              <p className="flex gap-4 mt-2 text-sm">
                <span>{selectedJob.type}</span>
                <span>{selectedJob.salaryDisplay}</span>
                <span>{selectedJob.posted}</span>
              </p>
            </div>

            {/*  APPLY  */}
            <Button
              asChild /* ⬅️  renders the child element itself   */
              className="bg-red-700 text-white">
              <a
                href={selectedJob.url} /* external URL from Adzuna */
                target="_blank"
                rel="noopener noreferrer">
                Apply
              </a>
            </Button>

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
