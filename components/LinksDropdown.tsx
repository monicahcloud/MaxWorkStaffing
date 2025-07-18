"use client";

import { cn } from "@/lib/utils";
import { linkGroups } from "@/components/DashboardLink"; // ✅ Updated
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
  "Expert Interview & Resume Tips":
    "Browse resources to help you prep and stand out.",
  "Articles & Insights": "Explore expert-written posts and career insights.",
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
    "Articles & Insights": "articles-link",
    Pricing: "pricing-link",
    FAQs: "faqs-link",
    Support: "support-link",
  };

  return (
    <TooltipProvider>
      {linkGroups.map((group) => (
        <div key={group.title} className="mb-4">
          <div className="text-md font-bold uppercase text-muted-foreground px-3 mb-1">
            {group.title}
          </div>
          <div className="space-y-1">
            {group.items.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      linkClassNames[link.label as keyof typeof linkClassNames],
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground",
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-base transition-all hover:text-primary"
                    )}>
                    {link.icon}
                    <span className="capitalize">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg border border-primary/60 text-sm font-medium">
                  {tooltipDescriptions[link.label] ??
                    "Navigate to this section."}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <hr className="my-4 border-muted" />
        </div>
      ))}
    </TooltipProvider>
  );
}
