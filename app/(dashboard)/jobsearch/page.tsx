"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import healthcare from "../../../assets/healthcare.jpg";
import manufactoring from "../../../assets/manufactoring.jpg";
import construction from "../../../assets/construction.jpg";
import media from "../../../assets/media.jpg";
import retail from "../../../assets/retail.jpg";
import telecom from "../../../assets/telecom.jpg";
import business from "../../../assets/business.jpg";
import engineer from "../../../assets/engineer.jpg";
import JobListingsView from "./JobListings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/utils/states";
import { jobIndustries } from "@/utils/industry";
import SectionTitle from "@/components/SectionTitle";

const jobCategories = [
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

function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDropdownCategory, setSelectedDropdownCategory] = useState<
    string | undefined
  >();
  const [searchParams, setSearchParams] = useState<{
    keyword?: string;
    location?: string;
    category?: string;
  } | null>(null);

  if (searchParams) {
    return (
      <JobListingsView
        filters={searchParams}
        onBack={() => setSearchParams(null)}
      />
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <SectionTitle
        text=" Find Your Perfect Job"
        subtext=" Whether you're looking for a new career or your next assignment, take a
        look at some of our open positions and find the perfect job for you."
      />
      {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-red-700">
        Find Your Perfect Job
      </h1>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base max-w-2xl mx-auto">
        Whether you're looking for a new career or your next assignment, take a
        look at some of our open positions and find the perfect job for you.
      </p> */}

      {/* Search Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 mt-8">
        <Input
          placeholder="Job Title or keyword"
          aria-label="Search by job title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full"
        />

        <Select onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full" aria-label="Select a state">
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

        <Select onValueChange={(value) => setSelectedDropdownCategory(value)}>
          <SelectTrigger className="w-full" aria-label="Select a job category">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {jobIndustries.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() =>
            setSearchParams({
              keyword,
              location,
              category: selectedDropdownCategory,
            })
          }
          className="w-full bg-red-700 hover:bg-red-800 text-white">
          Search
        </Button>
      </div>

      {/* Job Categories */}
      <section aria-label="Popular Job Categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobCategories.map((category, index) => (
            <Card
              key={index}
              className="relative group overflow-hidden focus-within:ring-2 focus-within:ring-red-500">
              <Image
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-4">
                <h2 className="text-lg text-center font-bold drop-shadow-sm tracking-wide">
                  {category.title}
                </h2>
                <Button
                  variant="secondary"
                  className="mt-2 w-full bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 whitespace-normal break-words px-2 py-1 min-h-[2.5rem]"
                  onClick={() =>
                    setSearchParams({
                      category: category.title,
                    })
                  }
                  aria-label={`View jobs in ${category.title}`}>
                  View Opportunities
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* More Categories */}
      <section
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm text-center text-gray-700 mt-10"
        aria-label="More Job Categories">
        {moreCategories.map((category, index) => (
          <Button
            variant="outline"
            key={index}
            onClick={() =>
              setSearchParams({
                category,
              })
            }
            className="hover:underline hover:text-red-700 transition-colors text-stone-900 font-semibold text-sm px-2 py-1 whitespace-normal break-words"
            aria-label={`Browse ${category} jobs`}>
            {category}
          </Button>
        ))}
      </section>
    </div>
  );
}

export default JobSearch;
