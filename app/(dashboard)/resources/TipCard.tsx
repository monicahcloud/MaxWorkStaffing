"use client";

import React from "react";
import { motion } from "framer-motion";

interface TipCardProps {
  title: string;
  emoji: string;
  bullets: string[];
  onClick?: () => void;
}

export const TipCard = ({ title, emoji, bullets, onClick }: TipCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-white rounded-xl shadow p-6 space-y-3 transition cursor-pointer hover:shadow-lg`}>
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
};
