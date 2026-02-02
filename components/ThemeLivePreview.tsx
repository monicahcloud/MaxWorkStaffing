/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ThemeLivePreview.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import DynamicResumePreview from "./DynamicResumePreview";
import { ResumeThemeToken } from "@/lib/resume-theme-registry";
import { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";

const DUMMY_DATA = {
  firstName: "ALEX",
  lastName: "STERLING",
  jobTitle: "SENIOR DESIGN ARCHITECT",
  summary:
    "Results-driven professional with 10+ years of experience in scaling enterprise solutions and leading cross-functional teams.",
  email: "alex.sterling@example.com",
  phone: "+1 (555) 000-1234",
  address: "San Francisco, CA",
  skills: [
    "STRATEGIC PLANNING",
    "TEAM LEADERSHIP",
    "UI/UX DESIGN",
    "PROJECT MANAGEMENT",
  ],
  workExperiences: [
    {
      position: "Lead Architect",
      company: "TECH GLOBAL",
      startDate: "2020-01-01",
      description:
        "Directed the architectural vision for high-traffic platforms serving millions of users.",
    },
    {
      position: "Regional Director",
      company: "Global Logistics Corp",
      startDate: "2018-06-01",
      description:
        "Optimized supply chain routes resulting in a 20% reduction in annual overhead.",
    },
  ],
  education: [
    { school: "University of Design", degree: "Master of Architecture" },
    { school: "University of Design", degree: "Master of Architecture" },
    { school: "University of Design", degree: "Master of Architecture" },
  ],
};

export default function ThemeLivePreview({
  theme,
}: {
  theme: ResumeThemeToken;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // We measure the width of the Dialog body
  const { width: containerWidth } = useDimensions(
    containerRef as React.RefObject<HTMLElement>
  );

  // A4 Standard is 794px. We calculate a scale ratio to fit the container.
  // We add a little padding (48px) so it doesn't touch the edges.
  const scale = containerWidth ? (containerWidth - 48) / 794 : 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/90 shadow-sm z-50">
          <Maximize2 className="size-4 mr-2" />
          Live Preview
        </Button>
      </DialogTrigger>

      {/* 1. We widen the dialog to 1100px to give it breathing room */}
      <DialogContent className="max-w-[1100px] w-[95vw] h-[90vh] flex flex-col p-0 bg-slate-100 border-none overflow-hidden">
        <DialogHeader className="p-6 bg-white border-b shrink-0">
          <DialogTitle className="uppercase font-black text-center tracking-tighter">
            {theme.name}
          </DialogTitle>
        </DialogHeader>

        {/* 2. This is the main scrollable area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-6 flex flex-col items-center">
          {/* 3. The Scaling Wrapper
              We apply the 'scale' here so the 794px resume shrinks to fit the modal width 
          */}
          <div
            style={{
              transform: `scale(${scale > 1 ? 1 : scale})`,
              transformOrigin: "top center",
              width: "794px",
              // We calculate the visual height after scaling so the scrollbar works correctly
              marginBottom: `${1123 * (scale > 1 ? 1 : scale)}px`,
            }}
            className="shadow-2xl bg-white shrink-0">
            <DynamicResumePreview
              resumeData={DUMMY_DATA as any}
              theme={theme}
              // We pass a dummy width so the inner component doesn't try to scale itself again
              className="w-full h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
