"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { InterviewQuestion } from "@/utils/questions";

/* Tooltip span helper */
const FrameworkBadge = ({ type }: { type: "STAR" | "CAR" }) => (
  <span
    className={`ml-2 group relative cursor-help inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase   ${
      type === "STAR"
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"
    }`}>
    {type}
    {/* Tooltip */}
    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded-md bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
      {type === "STAR"
        ? "Situation • Task • Action • Result"
        : "Challenge • Action • Result"}
    </span>
  </span>
);

type Props = { questions: InterviewQuestion[] };

export default function SingleInterviewQuestion({ questions }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const groups = {
    Public: questions.filter((q) => q.type === "public"),
    Private: questions.filter((q) => q.type === "private"),
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-10 w-full">
      {/* Intro & Legend */}
      <section className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
          Mastering Interview Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Preparation is key to standing out. From behavioral prompts to
          technical challenges, review real-world questions and sample answers
          to craft responses that reflect your experience, values, and
          strengths.
        </p>

        {/* STAR / CAR legend */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FrameworkBadge type="STAR" />
            <span className="text-muted-foreground  sm:inline">
              Situation • Task • Action • Result
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FrameworkBadge type="CAR" />
            <span className="text-muted-foreground  sm:inline">
              Challenge • Action • Result
            </span>
          </div>
        </div>
        {/* Extended legend */}
        <div className="mt-4 text-sm text-muted-foreground text-center max-w-xl mx-auto">
          <p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold uppercase tracking-wide mr-1">
              Communication
            </span>{" "}
            Tag badges indicate the core competency or skill the question
            targets. These help you understand what employers are evaluating
            (e.g., "Teamwork", "Leadership", "Data Analysis").
          </p>
        </div>
      </section>

      {/* Question grids */}
      <div className="grid gap-10 md:grid-cols-2 w-full">
        {Object.entries(groups).map(([label, qs]) => (
          <div
            key={label}
            className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            <h3 className="text-xl font-bold sticky top-0 bg-gray-50 z-10 border-b py-2 text-center">
              15 {label} Sector Questions
            </h3>

            {qs.map((q) => {
              const isOpen = openId === q.id;
              const isCopied = copiedId === q.id;

              return (
                <motion.div
                  key={q.id}
                  className="relative"
                  initial={{ boxShadow: "0 0 0 0 rgba(239,68,68,0.4)" }}
                  animate={
                    !isOpen
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(239,68,68,0.4)",
                            "0 0 8px 4px rgba(239,68,68,0.15)",
                            "0 0 0 0 rgba(239,68,68,0.4)",
                          ],
                        }
                      : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
                  }
                  transition={
                    !isOpen
                      ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
                      : { duration: 0.3 }
                  }>
                  <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition">
                    {/* Trigger row */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : q.id)}
                      className="w-full flex justify-between items-start p-4"
                      aria-expanded={isOpen}>
                      <div className="text-left">
                        <span className="text-sm sm:text-base font-medium text-gray-800">
                          {q.question}
                        </span>

                        {/* Framework badge */}
                        {q.framework && <FrameworkBadge type={q.framework} />}

                        {/* Tags */}
                        {q.tags?.length && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {q.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold uppercase tracking-wide">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-red-600" />
                      </motion.div>
                    </button>

                    {/* Animated answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden px-4 pb-4">
                          <div className="bg-gray-50 p-4 rounded-md mt-1 text-sm text-gray-700 leading-relaxed relative">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-red-600">
                                Answer:
                              </span>
                              {q.framework && (
                                <FrameworkBadge type={q.framework} />
                              )}
                            </div>
                            {q.answer}

                            {/* Copy button */}
                            <button
                              onClick={() => handleCopy(q.answer, q.id)}
                              className="absolute top-2 right-2 text-xs px-2 py-1 border rounded-md bg-white hover:bg-red-50 text-red-600">
                              {isCopied ? (
                                <span className="inline-flex items-center gap-1">
                                  Copied <Check className="w-3 h-3" />
                                </span>
                              ) : (
                                "Copy"
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
