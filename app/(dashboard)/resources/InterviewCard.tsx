"use client";

import { useState } from "react";
import type { InterviewCard as Card } from "./types";
import { cn } from "@/lib/utils"; // optional helper for conditional classes

type Props = {
  card: Card;
};

export default function InterviewCard({ card }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      className={cn(
        "group relative bg-white rounded-2xl p-6 shadow-md transition",
        expanded && "shadow-lg"
      )}>
      {/** Icon & title */}

      <div className="mb-4">{card.icon}</div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">{card.title}</h3>
      <p className="text-sm text-gray-700">{card.short}</p>
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: expanded ? 280 : 0 }}>
        <p className="text-sm text-gray-800 mt-4 leading-relaxed text-left">
          {card.detail}
        </p>
      </div>
    </button>
  );
}
