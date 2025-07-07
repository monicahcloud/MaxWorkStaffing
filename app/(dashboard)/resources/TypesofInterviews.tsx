"use client";

import { useState } from "react";
import {
  Phone,
  Video,
  Utensils,
  Users,
  BookOpen,
  PanelTop,
  FileText,
  ThumbsUp,
  SquareUser,
} from "lucide-react";

import type { ReactElement } from "react";

type Card = {
  icon: ReactElement;
  title: string;
  short: string;
  detail: string;
};

const cards: Card[] = [
  {
    icon: <Phone className="w-8 h-8 text-red-600" />,
    title: "Phone Interview",
    short: "Initial screening over the phone for candidate evaluation.",
    detail:
      "Phone interviews serve as a typical initial phase in the recruitment process, evaluating the candidate’s communication abilities. Choose a quiet setting and articulate your thoughts clearly and confidently.",
  },
  {
    icon: <FileText className="w-8 h-8 text-red-600" />,
    title: "Traditional Interview",
    short: "In-person interview assessing skills, experience & qualifications.",
    detail:
      "A conventional interview is conducted face-to-face with structured, open-ended questions to judge culture and role fit.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-red-600" />,
    title: "Behavioral Interview",
    short: "Evaluates past behaviors to predict future performance.",
    detail:
      "Expect STAR-style questions such as “Describe a situation where…”. Employers look for problem-solving, collaboration and communication skills.",
  },
  {
    icon: <Video className="w-8 h-8 text-red-600" />,
    title: "Video Interview",
    short: "Remote interview via video-conferencing technology.",
    detail:
      "Set up a quiet, well-lit space and test your tech. Project confidence and keep eye contact with the camera.",
  },
  {
    icon: <Users className="w-8 h-8 text-red-600" />,
    title: "Group Interview",
    short: "Simultaneous assessment of multiple candidates.",
    detail:
      "Showcase teamwork and communication during group discussions or activities while respecting others’ input.",
  },
  {
    icon: <PanelTop className="w-8 h-8 text-red-600" />,
    title: "Panel Interview",
    short: "Evaluation by several interviewers at once.",
    detail:
      "Provide balanced eye contact to each panelist and prepare for rapid-fire questions from different perspectives.",
  },
  {
    icon: <Utensils className="w-8 h-8 text-red-600" />,
    title: "Lunch / Dinner Interview",
    short: "Informal meal-based meeting to assess social skills.",
    detail:
      "Demonstrate professionalism and etiquette while discussing your experience in a relaxed environment.",
  },
  {
    icon: <SquareUser className="w-8 h-8 text-red-600" />,
    title: "Informational Interview",
    short: "Conversation to gather career insights and advice.",
    detail:
      "Focus on learning about the role or industry, expand your network, and leave a positive impression for future opportunities.",
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-red-600" />,
    title: "Strength-Based Interview",
    short: "Identifies natural talents and passions.",
    detail:
      "Questions center on what energises you. Highlight tasks you enjoy and excel at rather than just past duties.",
  },
];

export default function TypesofInterviews() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const expanded = openIdx === i;
          return (
            <button
              key={c.title}
              onClick={() => setOpenIdx(expanded ? null : i)}
              aria-expanded={expanded}
              className="group relative bg-white rounded-xl p-6 shadow-md
                         flex flex-col items-center text-center transition-all">
              {/* Icon & title */}
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-gray-700">{c.short}</p>

              {/* Expandable detail */}
              <div
                className="overflow-hidden w-full transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: expanded ? 280 : 0 }}>
                <p className="text-sm text-gray-800 mt-4 leading-relaxed text-left">
                  {c.detail}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
