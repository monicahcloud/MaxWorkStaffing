/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

/* ——— Local content components ——— */
import InterviewTips from "./InterviewTips";
import InterviewTypes from "./InterviewTypes";
import InterviewEtiquette from "./InterviewEtiquette";
import SingleInterviewQuestion from "./SingleInterviewQuestion";

/* ——— Local images ——— */
import interviewtips from "./../../../assets/interviewtips.png";
import interviewtypes from "./../../../assets/interviewtypes.png";
import interviewetiquette from "./../../../assets/interviewetiquette.png";
import interviewquestions from "./../../../assets/interviewquestions.png";

/* ——— Data ——— */
import { interviewQuestions } from "@/utils/questions";

/* --------------------------------------------------------------------- */
/*  Config                                                              */
/* --------------------------------------------------------------------- */
const bullets = [
  "Interview Tips",
  "Interview Types",
  "Interview Etiquette",
  "Interview Questions",
] as const;
type BulletTitle = (typeof bullets)[number];

/*  Map a title → image  */
const imageMap: Record<BulletTitle, any> = {
  "Interview Tips": interviewtips,
  "Interview Types": interviewtypes,
  "Interview Etiquette": interviewetiquette,
  "Interview Questions": interviewquestions,
};

const bulletDetails: Record<BulletTitle, string> = {
  "Interview Tips":
    "Practical guidance on research, rehearsal, professional presentation, and follow-up.",
  "Interview Types":
    "Understand phone, video, behavioral, and panel formats so you can tailor your strategy.",
  "Interview Etiquette":
    "Learn punctuality, body language, note-taking, and thank-you-email best practices.",
  "Interview Questions":
    "Review common and tricky questions, plus STAR/CAR frameworks for structuring strong answers.",
};

const contentMap: Record<BulletTitle, () => React.JSX.Element> = {
  "Interview Tips": () => <InterviewTips />,
  "Interview Types": () => <InterviewTypes />,
  "Interview Etiquette": () => <InterviewEtiquette />,
  "Interview Questions": () => (
    <SingleInterviewQuestion questions={interviewQuestions} />
  ),
};

/*  Framer-motion variants  */
const variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function InterviewDetailsSection() {
  const [active, setActive] = useState<BulletTitle | null>(null);
  const Feature = active ? contentMap[active] : null;

  return (
    <section id="interview-details" className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ───────── Grid view ───────── */}
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
                    {/* ─ Image header ─ */}
                    <div className="relative h-40">
                      <Image
                        src={imageMap[title]}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw,
                               (max-width: 1200px) 50vw,
                               33vw"
                        priority
                      />
                      {/* Optional overlay for readability */}
                      <div className="absolute inset-0 bg-white/10 flex items-center justify-center"></div>
                    </div>

                    {/* ─ Description ─ */}
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

        {/* ───────── Detail view ───────── */}
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
