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
  Dashboard: "View your real-time job application stats",
  Resumes: "Upload, create and manage your resumes",
  "Job Tracker": "Track your job applications and their status",
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
    "Job Tracker": "job-tracker-link",
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-xl transition-all hover:text-primary"
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
