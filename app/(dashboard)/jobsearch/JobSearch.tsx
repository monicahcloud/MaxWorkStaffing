/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SectionTitle from "@/components/SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { US_STATES } from "@/utils/states";
import { loadCategories } from "@/utils/categories.client";

/* ------------ local images ------------ */
import healthcare from "../../../assets/healthcare.jpg";
import manufactoring from "../../../assets/manufactoring.jpg";
import construction from "../../../assets/construction.jpg";
import media from "../../../assets/media.jpg";
import retail from "../../../assets/retail.jpg";
import telecom from "../../../assets/telecom.jpg";
import business from "../../../assets/business.jpg";
import engineer from "../../../assets/engineer.jpg";

/* ------------ featured category definitions ------------ */
const FEATURED: { title: string; image: any }[] = [
  { title: "Financial Services", image: business },
  { title: "Healthcare and Nursing", image: healthcare },
  { title: "Manufacturing", image: manufactoring },
  { title: "Information Technology", image: engineer },
  { title: "Trade and Construction", image: construction },
  { title: "PR, Advertising & Marketing", image: media },
  { title: "Retail", image: retail },
  { title: "Telecommunications", image: telecom },
];

export default function JobSearch() {
  const router = useRouter();

  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [catSlug, setCatSlug] = useState<string | undefined>();

  useEffect(() => {
    loadCategories().then(setCats).catch(console.error);
  }, []);

  const goToJobListings = (params: {
    q?: string;
    state?: string;
    city?: string;
    cat?: string;
  }) => {
    const qs = new URLSearchParams();
    if (params.q) qs.set("q", params.q.trim());
    if (params.state) qs.set("state", params.state);
    if (params.city) qs.set("city", params.city.trim());
    if (params.cat) qs.set("cat", params.cat);

    router.push(`/joblistings${qs.toString() ? `?${qs.toString()}` : ""}`);
  };

  const labelToSlug: Record<string, string> = Object.fromEntries(
    cats.map((c) => [c.label, c.slug])
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <SectionTitle
        text="Find Your Perfect Job"
        subtext="Search thousands of open positions across the U.S."
      />

      {/* ───────────── Search Form ───────────── */}
      <div className="my-8 flex flex-col md:flex-row flex-wrap gap-4">
        <Input
          placeholder="Job title / keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full md:flex-1 h-10"
        />

        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="w-full md:w-48 h-10">
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

        <Input
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full md:w-48 h-10"
        />

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

        <Button
          className="w-full md:w-auto h-10 bg-red-700 hover:bg-red-800 text-white"
          onClick={() =>
            goToJobListings({ q: keyword, state, city, cat: catSlug })
          }>
          Search
        </Button>
      </div>

      {/* ───────────── Featured Cards ───────────── */}
      <section aria-label="Popular job categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED.map(({ title, image }) => {
            const slug = labelToSlug[title] ?? title;
            return (
              <Card key={title} className="group relative overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardContent className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h3 className="text-center font-bold">{title}</h3>
                  <Button
                    variant="secondary"
                    className="mt-2 w-full bg-gray-100 text-black text-sm"
                    onClick={() => goToJobListings({ cat: slug })}>
                    View Opportunities
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ───────────── Dynamic Chip List ───────────── */}
      <section
        aria-label="More job categories"
        className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cats
          .filter((c) => !FEATURED.some((f) => f.title === c.label))
          .slice(0, 40)
          .map((c) => (
            <Button
              key={c.slug}
              variant="outline"
              className="text-sm font-semibold hover:text-red-700"
              onClick={() => goToJobListings({ cat: c.slug })}>
              {c.label}
            </Button>
          ))}
      </section>
    </div>
  );
}
