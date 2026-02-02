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
import { Search, MapPin, Briefcase, Filter, ArrowUpRight } from "lucide-react";
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

const CARDS_ON_HOME = 12;

export default function JobSearchWrapper() {
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    loadCategories().then(setCats).catch(console.error);
  }, []);

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSearch = () => fetchJobs({ q: query, state, city, cat: catSlug });

  return (
    <section className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-600 p-2 rounded-xl">
          <Search className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-black text-black uppercase tracking-tighter">
          Market Search
        </h2>
      </div>

      {/* Controls Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Role / Keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-slate-50 border-none focus-visible:ring-red-600 transition-all font-medium"
          />
        </div>

        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="bg-slate-50 border-none focus:ring-red-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <SelectValue placeholder="State" />
            </div>
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
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-slate-50 border-none focus-visible:ring-red-600 font-medium"
        />

        <Select value={catSlug} onValueChange={setCatSlug}>
          <SelectTrigger className="bg-slate-50 border-none focus:ring-red-600">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {cats.map(({ label, slug }) => (
              <SelectItem key={slug} value={slug}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onSearch}
          disabled={loading}
          className="bg-black hover:bg-red-600 text-white font-black uppercase tracking-widest transition-all">
          {loading ? "Syncing..." : "Search"}
        </Button>
      </div>

      {/* Results */}
      {!loading && jobs.length === 0 && (
        <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
            No opportunities found.
          </p>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] whitespace-nowrap">
              Live Feed: {Math.min(jobs.length, CARDS_ON_HOME)} Results
            </p>
            <div className="h-px bg-slate-100 w-full" />
          </div>

          <AdzunaJobList jobs={jobs.slice(0, CARDS_ON_HOME)} />

          <div className="flex justify-center pt-4">
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
              className="group flex items-center gap-3 px-8 py-3 bg-white border-2 border-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Explore All Listings
              <ArrowUpRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
