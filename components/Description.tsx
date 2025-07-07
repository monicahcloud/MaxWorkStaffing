"use client";

import React from "react";
import { resumes } from "../utils/resumes";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  activeImage: number;
  clickNext: () => void;
  clickPrev: () => void;
};

const Description = ({ activeImage, clickNext, clickPrev }: Props) => {
  const { desc } = resumes[activeImage];

  return (
    <motion.div
      key={activeImage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="w-full text-center space-y-4">
      {/* Description Text */}
      <p className="text-gray-800 italic text-base md:text-lg leading-relaxed px-4 md:px-8">
        {desc}
      </p>

      {/* View Templates Button */}
      <Link href="/resumebuilder" passHref>
        <button className="bg-red-600 text-white uppercase px-6 py-2 rounded-md hover:bg-red-700 transition">
          View Templates
        </button>
      </Link>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-8 mt-4">
        <button
          aria-label="Previous"
          onClick={clickPrev}
          className="text-red-600 hover:text-red-800 transition">
          <ChevronLeft size={28} />
        </button>
        <button
          aria-label="Next"
          onClick={clickNext}
          className="text-red-600 hover:text-red-800 transition">
          <ChevronRight size={28} />
        </button>
      </div>
    </motion.div>
  );
};

export default Description;
