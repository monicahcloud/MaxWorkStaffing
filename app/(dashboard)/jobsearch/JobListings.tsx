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
import { fetchJobs } from "./actions";
import SectionTitle from "@/components/SectionTitle";
import { US_STATES } from "@/utils/states";
import { categoryMap } from "@/utils/category";
import { jobIndustries } from "@/utils/industry";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  category: string; // Added category for filtering
}

interface Props {
  filters: {
    keyword?: string;
    location?: string;
    category?: string;
  };
  onBack: () => void;
}

export default function JobListingsView({ filters, onBack }: Props) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const fetchedJobs = await fetchJobs(filters); // ✅ Live call using filters
        setJobs(fetchedJobs);
        setSelectedJob(fetchedJobs[0] || null);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [filters]);

  return (
    <div className="p-6 space-y-6 max-w-7xl ">
      <SectionTitle text="Detailed Job Search" subtext="" />
      <div className="flex justify-between items-center">
        <Button variant="secondary" className="text-black" onClick={onBack}>
          ← Back to Categories
        </Button>
        <h1 className="text-xl font-bold text-red-700">
          {filters.category ? `Jobs in ${filters.category}` : "Job Listings"}
        </h1>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap gap-4">
        <Input placeholder="Job Title" className="flex-1 min-w-[200px]" />

        <Select onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="min-w-[160px]" aria-label="Select a state">
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
        <Input placeholder="city" className="flex-1 min-w-[200px]" />

        <Select onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="min-w-[160px]" aria-label="Category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {jobIndustries.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-red-700 hover:bg-red-800 text-white">
          Search
        </Button>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job List */}
        <div className="space-y-4 lg:col-span-1">
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found for this search.</p>
          ) : (
            jobs.map((job) => (
              <Card
                key={job.id}
                className={`border p-4 cursor-pointer hover:shadow-md ${
                  selectedJob?.id === job.id ? "border-red-700" : ""
                }`}
                onClick={() => setSelectedJob(job)}>
                <p className="text-sm text-gray-500">{job.location}</p>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.type}</p>
                <p className="text-sm font-medium text-gray-800">
                  {job.salary}
                </p>
                <p className="text-xs text-gray-400 mt-2">{job.posted}</p>
              </Card>
            ))
          )}
        </div>

        {/* Job Details */}
        {selectedJob && (
          <div className="lg:col-span-2 border p-6 rounded-xl bg-gray-50 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{selectedJob.title}</h2>
              <p className="text-sm text-gray-600">{selectedJob.location}</p>
              <p className="flex gap-4 mt-2 text-sm">
                <span>{selectedJob.type}</span>
                <span>{selectedJob.salary}</span>
                <span>{selectedJob.posted}</span>
              </p>
            </div>
            <Button className="bg-red-700 text-white w-fit">Apply</Button>
            <div>
              <h3 className="font-semibold mt-4 mb-2">Description</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mt-4 mb-2">Requirements</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            {/* <div className="flex gap-4 mt-6">
              <Button variant="secondary">Save this job</Button>
              <Button variant="secondary">Share this job</Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";

// const jobData = [
//   {
//     id: 1,
//     title: "Investment Analyst",
//     location: "New York, NY",
//     type: "Full-time",
//     salary: "$85,000 - $100,000 / Yearly",
//     posted: "3 days ago",
//     description: "Analyze market trends and support portfolio decisions.",
//     requirements: [
//       "Bachelor's degree in Finance or related field.",
//       "2+ years of experience in investment banking or analysis.",
//       "Strong analytical and Excel modeling skills.",
//     ],
//     category: "Financial Services",
//   },
//   {
//     id: 2,
//     title: "Registered Nurse (RN)",
//     location: "Los Angeles, CA",
//     type: "Permanent",
//     salary: "$70,000 - $90,000 / Yearly",
//     posted: "5 days ago",
//     description:
//       "Provide compassionate patient care in a busy hospital setting.",
//     requirements: [
//       "Valid RN license in California.",
//       "BLS and ACLS certifications.",
//       "Minimum 1 year hospital experience.",
//     ],
//     category: "Healthcare",
//   },
//   {
//     id: 3,
//     title: "CNC Machine Operator",
//     location: "Cleveland, OH",
//     type: "Full-time",
//     salary: "$40,000 - $50,000 / Yearly",
//     posted: "1 week ago",
//     description: "Operate CNC machines and inspect manufactured components.",
//     requirements: [
//       "2+ years experience with CNC machinery.",
//       "Ability to read blueprints.",
//       "High school diploma or GED.",
//     ],
//     category: "Manufacturing",
//   },
//   {
//     id: 4,
//     title: "Frontend Software Engineer",
//     location: "Remote",
//     type: "Permanent",
//     salary: "$110,000 - $130,000 / Yearly",
//     posted: "2 weeks ago",
//     description: "Build and maintain responsive web applications.",
//     requirements: [
//       "Proficiency in React, TypeScript, and CSS.",
//       "Experience with RESTful APIs.",
//       "Bachelor’s degree in Computer Science or related field.",
//     ],
//     category: "Information Technology",
//   },
//   {
//     id: 5,
//     title: "Construction Project Supervisor",
//     location: "Austin, TX",
//     type: "Contract",
//     salary: "$80,000 - $95,000 / Yearly",
//     posted: "3 days ago",
//     description:
//       "Oversee commercial building projects and ensure timelines are met.",
//     requirements: [
//       "5+ years construction management experience.",
//       "Familiarity with OSHA regulations.",
//       "Excellent leadership skills.",
//     ],
//     category: "Construction, Repair and Maintenance",
//   },
//   {
//     id: 6,
//     title: "Multimedia Designer",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     salary: "$65,000 - $75,000 / Yearly",
//     posted: "1 week ago",
//     description: "Create visually compelling assets for digital and print.",
//     requirements: [
//       "Expertise in Adobe Creative Suite.",
//       "Portfolio of design work.",
//       "Strong attention to detail.",
//     ],
//     category: "Media Communications",
//   },
//   {
//     id: 7,
//     title: "Retail Store Manager",
//     location: "Chicago, IL",
//     type: "Permanent",
//     salary: "$55,000 - $65,000 / Yearly",
//     posted: "5 days ago",
//     description: "Lead a team and drive sales at a high-traffic location.",
//     requirements: [
//       "3+ years of retail management experience.",
//       "Customer-focused and results-driven.",
//       "Strong communication skills.",
//     ],
//     category: "Retail and Customer Service",
//   },
//   {
//     id: 8,
//     title: "Network Operations Specialist",
//     location: "Denver, CO",
//     type: "Full-time",
//     salary: "$75,000 - $85,000 / Yearly",
//     posted: "4 days ago",
//     description: "Monitor and troubleshoot telecom network systems.",
//     requirements: [
//       "Experience with Cisco routers/switches.",
//       "Strong understanding of network protocols.",
//       "CCNA or equivalent certification.",
//     ],
//     category: "Telecommunications",
//   },
// ];

// export default function JobListingsView() {
//   const [selectedJob, setSelectedJob] = useState(jobData[0]);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Search Filters */}
//       <div className="flex flex-wrap gap-4">
//         <Input placeholder="e.g. developer" className="flex-1 min-w-[200px]" />
//         <Input placeholder="Dallas, GA" className="flex-1 min-w-[200px]" />
//         <Select>
//           <SelectTrigger className="min-w-[160px]">
//             <SelectValue placeholder="Location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="atlanta">Atlanta</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="min-w-[160px]">
//             <SelectValue placeholder="Distance" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="10">10 miles</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="min-w-[160px]">
//             <SelectValue placeholder="Specialization" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="developer">Developer</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="min-w-[160px]">
//             <SelectValue placeholder="Job Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="permanent">Permanent</SelectItem>
//             <SelectItem value="temporary">Temporary</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button className="bg-red-700 hover:bg-red-800 text-white">
//           Search
//         </Button>
//       </div>

//       {/* Listings & Detail Panel */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Job List */}
//         <div className="space-y-4 lg:col-span-1">
//           {jobData.map((job) => (
//             <Card
//               key={job.id}
//               className="border p-4 cursor-pointer hover:shadow-md"
//               onClick={() => setSelectedJob(job)}>
//               <p className="text-sm text-gray-500">{job.location}</p>
//               <h3 className="text-lg font-semibold">{job.title}</h3>
//               <p className="text-sm text-gray-600">{job.type}</p>
//               <p className="text-sm font-medium text-gray-800">{job.salary}</p>
//               <p className="text-xs text-gray-400 mt-2">{job.posted}</p>
//             </Card>
//           ))}
//         </div>

//         {/* Job Details */}
//         <div className="lg:col-span-2 border p-6 rounded-xl bg-gray-50 space-y-4">
//           {selectedJob && (
//             <>
//               <div>
//                 <h2 className="text-xl font-bold">{selectedJob.title}</h2>
//                 <p className="text-sm text-gray-600">{selectedJob.location}</p>
//                 <p className="flex gap-4 mt-2 text-sm">
//                   <span>{selectedJob.type}</span>
//                   <span>{selectedJob.salary}</span>
//                   <span>{selectedJob.posted}</span>
//                 </p>
//               </div>
//               <Button className="bg-red-700 text-white w-fit">Apply</Button>
//               <div>
//                 <h3 className="font-semibold mt-4 mb-2">Description</h3>
//                 <p className="text-sm text-gray-700 whitespace-pre-line">
//                   {selectedJob.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-semibold mt-4 mb-2">Requirements</h3>
//                 <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
//                   {selectedJob.requirements.map((req, idx) => (
//                     <li key={idx}>{req}</li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex gap-4 mt-6">
//                 <Button variant="secondary">Save this job</Button>
//                 <Button variant="secondary">Share this job</Button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
