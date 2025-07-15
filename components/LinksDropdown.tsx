"use client";
import { cn } from "@/lib/utils";
import links from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Tooltip descriptions for each link label
const tooltipDescriptions = {
  Dashboard: "Your central hub to manage your job search efficiently.",
  Resumes: "Create, upload, and organize all your resumes in one place.",
  "Cover Letter":
    "Build, upload, and manage custom cover letters for each job.",
  "Personal Profile":
    "Your shareable professional profile to impress recruiters.",
  "Job Tracker": "Keep track of applications and monitor their progress.",
  "Job Search": "Find and apply to job opportunities tailored to you.",
  Stats: "See real-time insights into your job search activity and results.",
  "AI Mock Interview": "Practice interviews with instant AI-powered feedback.",
  "Interviewing Tools": "Browse resources to help you prep and stand out.",
  Pricing: "Explore plans and features to level up your job search tools.",
  FAQs: "Get quick answers to the most common questions.",
  Support: "Reach out to our team for help and guidance.",
};

export default function LinksDropdown() {
  const pathname = usePathname();

  // Map link labels to unique class names for tour targeting
  const linkClassNames = {
    Dashboard: "dashboard-link",
    Resumes: "resumes-link",
    "Cover Letter": "coverletter-link",
    "Personal Profile": "profile-link",
    "Job Search": "job-search-link",
    "Job Tracker": "job-tracker-link",
    Stats: "stats-link",
    "AI Mock Interview": "mock-interview-link",
    "Expert Interview & Resume Tips": "interviewing-tools-link",
    FAQs: "faqs-link",
    Support: "support-link",
  };

  return (
    <TooltipProvider>
      {links.map((link) => (
        <Tooltip key={link.id}>
          <TooltipTrigger asChild>
            <Link
              className={cn(
                linkClassNames[link.label], // <-- Add unique class here
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground",
                "flex items-center gap-3 rounded-lg px-3 py-1.5 text-xl transition-all hover:text-primary"
              )}
              href={link.href}>
              {link.icon}
              <span className="capitalize">{link.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg border border-primary/60 text-base font-medium">
            {tooltipDescriptions[link.label]}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}
