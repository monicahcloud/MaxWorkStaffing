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
  Dashboard: "Your personalized space to stay organized.",
  Resumes: "Upload, create and manage your resumes",
  "Cover Letter": "Upload, create and manage your cover letter",
  "Personal Profile": "Online professional profile to share with recruiters.",
  "Job Tracker": "Track your job applications and their status",
  "Job Search": "Search for open positions and apply",
  Stats: "View your real-time job application stats",
  "AI Mock Interview": "AI-powered mock interview",
  "Interviewing Tools": "Access resources to prepare for interviews",
  FAQs: "Find answers to common questions",
  Support: "Contact support for help",
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
    "Interviewing Tools": "interviewing-tools-link",
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
