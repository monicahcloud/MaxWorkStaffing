"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

import { US_STATES } from "@/utils/states";
import { jobIndustries } from "@/utils/industry";

/* ------------ local images ------------ */
import healthcare from "../../../assets/healthcare.jpg";
import manufactoring from "../../../assets/manufactoring.jpg";
import construction from "../../../assets/construction.jpg";
import media from "../../../assets/media.jpg";
import retail from "../../../assets/retail.jpg";
import telecom from "../../../assets/telecom.jpg";
import business from "../../../assets/business.jpg";
import engineer from "../../../assets/engineer.jpg";

/* ------------ helper data ------------ */
const featured = [
  { title: "Financial Services", image: business },
  { title: "Healthcare", image: healthcare },
  { title: "Manufacturing", image: manufactoring },
  { title: "Information Technology", image: engineer },
  { title: "Construction, Repair and Maintenance", image: construction },
  { title: "Media Communications", image: media },
  { title: "Retail and Customer Service", image: retail },
  { title: "Telecommunications", image: telecom },
];

const moreCategories = [
  "Hotels & Travel Accommodation",
  "Government & Public Administration",
  "Human Resources & Staffing",
  "Aerospace & Defense",
  "Agriculture",
  "Arts, Entertainment & Recreation",
  "Education",
  "Energy, Mining & Utilities",
  "Real Estate",
  "Insurance",
  "Personal Consumer Services",
  "Restaurants & Food Service",
  "Transportation & Logistics",
  "Legal",
  "Pharmaceutical & Biotechnology",
  "Nonprofit & NGO",
  "Management & Consulting",
];

/* =========================================================== */
/*                          COMPONENT                          */
/* =========================================================== */
export default function JobSearch() {
  const router = useRouter();

  /* controlled inputs */
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  /** Build query-string and navigate to /joblistings */
  const goToJobListings = (params: {
    q?: string;
    state?: string;
    cat?: string;
  }) => {
    const qs = new URLSearchParams();
    if (params.q) qs.set("q", params.q);
    if (params.state) qs.set("state", params.state);
    if (params.cat) qs.set("cat", params.cat);
    router.push(`/joblistings${qs.toString() ? `?${qs.toString()}` : ""}`);
  };

  /* ------------------------------ UI ------------------------------ */
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <SectionTitle
        text="Find Your Perfect Job"
        subtext="Whether you're looking for a new career or your next assignment, take a look at some of our open positions and find the perfect job for you."
      />

      {/* ───────────── Search Form ───────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <Input
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* State dropdown */}
        <Select value={state} onValueChange={setState}>
          <SelectTrigger>
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

        {/* Category dropdown */}
        <Select
          value={category}
          onValueChange={(v) => setCategory(v || undefined)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
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
          className="bg-red-700 hover:bg-red-800 text-white"
          onClick={() => goToJobListings({ q: keyword, state, cat: category })}>
          Search
        </Button>
      </div>

      {/* ───────────── Featured Categories ───────────── */}
      <section aria-label="Popular Job Categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map(({ title, image }) => (
            <Card
              key={title}
              className="relative group overflow-hidden focus-within:ring-2 focus-within:ring-red-500">
              <Image
                src={image}
                alt={title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-4">
                <h2 className="text-lg text-center font-bold">{title}</h2>
                <Button
                  variant="secondary"
                  className="mt-2 w-full bg-gray-100 text-black text-sm hover:bg-gray-200"
                  onClick={() => goToJobListings({ cat: title })}>
                  View Opportunities
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ───────────── More Categories chips ───────────── */}
      <section
        aria-label="More Job Categories"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-center mt-10">
        {moreCategories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            className="hover:underline hover:text-red-700 font-semibold text-sm whitespace-normal break-words"
            onClick={() => goToJobListings({ cat })}>
            {cat}
          </Button>
        ))}
      </section>
    </div>
  );
}
