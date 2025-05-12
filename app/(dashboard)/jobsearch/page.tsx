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
  // const [distance, setDistance] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  console.log(location);
  if (selectedCategory) {
    return (
      <JobListingsView
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="px-4 pt-4 max-w-7xl mx-auto shadow-2xl">
      <h1 className="text-6xl font-bold text-center mb-6  text-red-700">
        Find Your Perfect Job
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Whether you're looking for a new career or your next assignment, take a
        look at some of our open positions and find the perfect job for you.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <Input
          placeholder="Title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1"
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
        <Select onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="md:flex-1">
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
        <Button className="bg-red-700 hover:bg-red-800 text-white">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobCategories.map((category, index) => (
          <Card key={index} className="relative group overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300"
            />
            <CardContent className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <h2 className="text-lg text-center font-semibold">
                {category.title}
              </h2>
              <Button
                variant="secondary"
                className="mt-2 bg-gray-200 text-black hover:bg-gray-200"
                onClick={() => setSelectedCategory(category.title)}>
                View Opportunities
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm text-center text-gray-700 mt-10">
        {moreCategories.map((category, index) => (
          <Button
            variant="outline"
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="hover:underline hover:text-red-700 transition-colors text-stone-900 font-semibold">
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default JobSearch;
