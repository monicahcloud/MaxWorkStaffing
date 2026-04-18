"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  FileText,
  Mail,
  Mic,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

export default function FirstTimeModal({
  openOnLoad,
}: {
  openOnLoad: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openOnLoad) {
      setOpen(true);
    }
  }, [openOnLoad]);

  const handleClose = async (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen && openOnLoad) {
      try {
        await fetch("/api/user/mark-returning", {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to update user first-time status", error);
      }
    }
  };

  const features = [
    {
      icon: FileText,
      title: "AI Resume Builder",
      text: "Create polished resumes faster with guided AI support.",
    },
    {
      icon: Mail,
      title: "Fast Cover Letters",
      text: "Generate custom letters tailored to each opportunity.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Application Tracking",
      text: "Organize roles, monitor status, and stay on top of every lead.",
    },
    {
      icon: Mic,
      title: "Interview Practice",
      text: "Train with AI-powered mock interviews and feedback.",
    },
    {
      icon: Search,
      title: "Job Search Tools",
      text: "Search and move through opportunities with less friction.",
    },
    {
      icon: Target,
      title: "Career Focus",
      text: "Keep your progress aligned with the role you actually want.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle className="hidden">Welcome to CareerOS</DialogTitle>

      <DialogContent className="max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090D] p-0 text-white shadow-2xl">
        <div className="relative">
          {/* Background accents */}
          <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left panel */}
            <div className="relative overflow-hidden border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
              <div className="mb-8">
                <Image
                  src="/CareerOSLogo.png"
                  alt="CareerOS logo"
                  width={190}
                  height={60}
                  className="h-auto w-auto"
                />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-200">
                <Sparkles className="h-3 w-3" />
                System Activated
              </div>

              <div className="mt-6 space-y-4">
                <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
                  Welcome to your
                  <br />
                  <span className="text-red-500">Career Command Center.</span>
                </h2>

                <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                  CareerOS gives you one place to build, apply, prepare, and
                  stay organized. Everything is designed to help you move with
                  more clarity and less job-search fatigue.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  What you can do here
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Build your resume, create tailored cover letters, track job
                  applications, practice interviews, and keep your search moving
                  from one dashboard.
                </p>
              </div>
            </div>

            {/* Right panel */}
            <div className="p-8 md:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-200 hover:border-red-500/20 hover:bg-white/[0.06]">
                      <div className="mb-4 inline-flex rounded-xl bg-red-500/10 p-2 text-red-300">
                        <Icon className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-black uppercase tracking-tight text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="w-full rounded-xl bg-red-600 px-8 py-6 text-sm font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-red-500"
                  onClick={() => handleClose(false)}>
                  Enter Dashboard
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-500 sm:text-left">
                Your tools are ready. Start with your resume, cover letter, job
                tracker, or interview prep.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
