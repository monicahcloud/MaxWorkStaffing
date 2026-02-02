"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import resumeTipsImg from "@/assets/resume.jpg";
import Image from "next/image";
import MilitaryToCivilianDetail from "./details/MilitaryToCivilianDetail";
import CollegeToCareerDetail from "./details/CollegeToCareerDetail";
import CareerChangersDetail from "./details/CareerChangeDetail";
import UniversalTipsDetail from "./details/UniversalTipsDetail";

/* ── Animation variants ───────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

type ResumeTopic = "military" | "college" | "careerChange" | "universal" | null;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.10)" },
};

/* ── Re-usable card component ─────────────────────── */
interface TipCardProps {
  title: string;
  emoji: string;
  bullets: string[];
}

const TipCard = ({
  title,
  emoji,
  bullets,
  onClick,
}: TipCardProps & { onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    variants={cardVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    whileHover="hover"
    className="bg-white rounded-xl shadow p-6 space-y-3">
    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
      {emoji} {title}
    </h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  </motion.div>
);

/* ── Main component ───────────────────────────────── */
const ResumeTips = () => {
  const [activeTopic, setActiveTopic] = useState<ResumeTopic>(null);

  const renderDetailView = () => {
    switch (activeTopic) {
      case "military":
        return <MilitaryToCivilianDetail onBack={() => setActiveTopic(null)} />;
      case "college":
        return <CollegeToCareerDetail onBack={() => setActiveTopic(null)} />;
      case "careerChange":
        return <CareerChangersDetail onBack={() => setActiveTopic(null)} />;
      case "universal":
        return <UniversalTipsDetail onBack={() => setActiveTopic(null)} />;
      default:
        return null;
    }
  };

  if (activeTopic) return renderDetailView();

  return (
    <section className="">
      {/* Title + Image Side by Side on Desktop */}
      <div className="flex flex-col p-10 bg-gray-50 mb-5 md:flex-row items-center md:items-center justify-around gap-10 text-center">
        <div className="md:flex-1 space-y-3 ">
          <h2 className="text-3xl font-bold text-red-600">
            Resume Tips for Every Journey
          </h2>
          <p className="text-gray-700 ">
            Whether you're transitioning from the military, stepping out of
            college, or switching careers—these resume tips will help you tell
            your story with clarity and confidence.
          </p>
        </div>
        <div className="w-full max-w-[250px] mx-auto md:mx-0">
          <Image
            src={resumeTipsImg}
            alt="Resume Tips Illustration"
            width={400}
            height={300}
            className="rounded-lg shadow w-full h-auto "
          />
        </div>
      </div>

      {/* Tips Grid with stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 md:grid-cols-2">
        <TipCard
          emoji="🎖️"
          title="Military to Civilian"
          bullets={[
            "Translate military titles into civilian-friendly job roles.",
            "Highlight leadership, logistics, and training experience.",
            "Avoid acronyms unless they’re explained.",
            "Use a skills summary to connect your experience to the target job.",
          ]}
          onClick={() => setActiveTopic("military")}
        />

        <TipCard
          emoji="🎓"
          title="College to Career"
          bullets={[
            "Emphasize internships, group projects, and leadership roles.",
            "Focus on soft skills like communication, adaptability, and initiative.",
            "Include relevant coursework or certifications.",
            "Keep it to one page unless your experience warrants more.",
          ]}
          onClick={() => setActiveTopic("college")}
        />

        <TipCard
          emoji="🔄"
          title="Career Changers"
          bullets={[
            "Lead with a summary aligning transferable skills to the new role.",
            "Use a combination resume format (skills + experience).",
            "Show how previous roles build toward this new path.",
            'Explain your "why" in the cover letter.',
          ]}
          onClick={() => setActiveTopic("careerChange")}
        />

        <TipCard
          emoji="🌟"
          title="Universal Tips"
          bullets={[
            "Customize every resume—keywords matter.",
            "Maintain clean formatting and consistent spacing.",
            "Quantify results (“increased efficiency by 25%”).",
            "Proofread—typos are deal-breakers.",
          ]}
          onClick={() => setActiveTopic("universal")}
        />
      </motion.div>

      {/* Bonus Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-red-100 border-l-4 border-red-400 p-6 rounded-xl mt-6">
        <p className="text-gray-800 italic text-center">
          🗣️ “Walk in with stories, not just answers. Come with clarity, not
          just questions. And leave knowing you brought your full self to the
          table.”
        </p>
      </motion.div>
    </section>
  );
};

export default ResumeTips;
