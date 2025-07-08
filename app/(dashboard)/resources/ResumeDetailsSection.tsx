/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

/* ─── Detail-view components (stub or real) ─── */

/* ─── Images for each bullet ─── */
import tipsImg from "../../../assets/resumeTips.png";
import typesImg from "../../../assets/resumeTypes.png";
import mistakesImg from "../../../assets/resumeMistakes.png";
import atsImg from "../../../assets/resumeAts.png";
import coverImg from "../../../assets/resumeCover.png";
import ResumeTips from "./ResumeTips";
import ResumeTypes from "./ResumeTypes";
import ResumeMistakes from "./ResumeMistakes";
import ResumeATS from "./ResumeATS";
import ResumeCoverAlign from "./ResumeCoverAlign";

/* ─── Bullet list mirrors ResourceCategories.bullets ─── */
const bullets = [
  "Resume Tips",
  "Resume Types",
  "Resume Mistakes to Avoid",
  "Resume Optimization for ATS",
  "Resume Cover Letter Alignment",
] as const;
type BulletTitle = (typeof bullets)[number];

/* ─── Map bullet → image ─── */
const imageMap: Record<BulletTitle, any> = {
  "Resume Tips": tipsImg,
  "Resume Types": typesImg,
  "Resume Mistakes to Avoid": mistakesImg,
  "Resume Optimization for ATS": atsImg,
  "Resume Cover Letter Alignment": coverImg,
};

/* ─── Short blurb for each card ─── */
const bulletDetails: Record<BulletTitle, string> = {
  "Resume Tips":
    "Formatting, layout, and phrasing hacks that lift your résumé above the stack.",
  "Resume Types":
    "Chronological, functional, hybrid—see which works best for your story.",
  "Resume Mistakes to Avoid":
    "Common pitfalls recruiters notice first (and how to dodge them).",
  "Resume Optimization for ATS":
    "Keyword, structure, and file-type tweaks to sail past the bots.",
  "Resume Cover Letter Alignment":
    "Sync tone, keywords, and achievements so both docs reinforce each other.",
};

/* ─── Map bullet → detail component ─── */
const contentMap: Record<BulletTitle, () => JSX.Element> = {
  "Resume Tips": () => <ResumeTips />,
  "Resume Types": () => <ResumeTypes />,
  "Resume Mistakes to Avoid": () => <ResumeMistakes />,
  "Resume Optimization for ATS": () => <ResumeATS />,
  "Resume Cover Letter Alignment": () => <ResumeCoverAlign />,
};

/* ─── Motion variants ─── */
const variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

/* ─────────────────────────────────────────────── */
export default function ResumeDetailsSection() {
  const [active, setActive] = useState<BulletTitle | null>(null);
  const Feature = active ? contentMap[active] : null;

  return (
    <section id="resume-details" className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ── Grid view ── */}
        {!active && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bullets.map((title, idx) => (
              <motion.div
                key={title}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={variants}>
                <button
                  onClick={() => setActive(title)}
                  className="w-full text-left">
                  <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] hover:shadow-2xl transition">
                    {/* Image header */}
                    <div className="relative h-40">
                      <Image
                        src={imageMap[title]}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw,
                               (max-width:1200px) 50vw,
                               33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                       
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-6">
                      <p className="text-muted-foreground text-sm line-clamp-6">
                        {bulletDetails[title]}
                      </p>
                    </div>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Detail view ── */}
        {active && Feature && (
          <div className="relative bg-white border rounded-2xl p-6 sm:p-10 shadow-2xl mt-10">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-red-600">{active}</h2>
              <button
                onClick={() => setActive(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close">
                ×
              </button>
            </div>
            <Feature />
          </div>
        )}
      </div>
    </section>
  );
}
