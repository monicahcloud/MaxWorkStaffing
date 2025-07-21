"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

import interviewee from "../../../assets/questionsthumb.png";
import resumes from "../../../assets/resumesthumb.png";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categories = [
  {
    id: "interview-details",
    title: "Cracking the Interview Code",
    poster: interviewee,
    bullets: [
      "Interview Tips",
      "Interview Types",
      "Interview Etiquette",
      "Interview Questions",
    ],
  },
  {
    id: "resume-details",
    title: "Resume Tips and Tricks",
    poster: resumes,
    bullets: [
      "Resume Tips",
      "Resume Types",
      "Resume Mistakes to Avoid",
      "Resume Optimization for ATS",
      "Resume Cover Letter Alignment",
    ],
  },
];

const ResourceCategories = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative w-full bg-white shadow-2xl border-t-4 border-red-500 z-10 py-20 px-4 sm:px-6 md:px-10">
      {/* Floating Title */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
        border-2 ring-2 ring-red-200 bg-white px-4 sm:px-6 py-2 sm:py-3  rounded-3xl shadow-2xl text-center w-[90%] sm:w-auto">
        <h2 className="text-red-500 text-2xl sm:text-4xl md:text-5xl font-extrabold">
          Explore Interview & Resume Tips
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* Promo CTA card */}
        <motion.div variants={item} className="hidden sm:block">
          <Card
            className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800
      text-white flex flex-col justify-between items-center
      min-h-[260px] sm:min-h-[300px] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Ace Your Next Interview
              </h3>
              <p className="text-sm sm:text-base italic max-w-xs">
                Tips, templates & practice questions in one place.
              </p>
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute bottom-4 right-4 opacity-20 text-[4rem] sm:text-[5rem] pointer-events-none select-none">
              🚀
            </motion.div>
          </Card>
        </motion.div>

        {/* Category cards */}
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={item}
            whileHover={{
              rotateX: 5,
              rotateY: -5,
              scale: 1.03,
              boxShadow: "0 0 20px rgba(239,68,68,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-3xl bg-white overflow-hidden cursor-pointer min-h-[260px] sm:min-h-[300px]"
            onClick={() => scrollTo(cat.id)}>
            <div className="flex flex-col gap-4 p-5 sm:p-6 h-full">
              <Image
                src={cat.poster}
                alt={cat.title}
                width={80}
                height={40}
                className="object-cover rounded"
              />
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {cat.title}
              </div>
              <hr />
              <ul className="text-sm sm:text-base text-red-700 font-semibold space-y-1">
                {cat.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourceCategories;
