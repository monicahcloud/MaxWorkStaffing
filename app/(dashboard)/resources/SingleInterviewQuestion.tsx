"use client";
import { useState } from "react";
import { InterviewQuestion } from "@/utils/questions";

type Props = { questions: InterviewQuestion[] };

export default function SingleInterviewQuestion({ questions }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const groups = {
    Public: questions.filter((q) => q.type === "public"),
    Private: questions.filter((q) => q.type === "private"),
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      {Object.entries(groups).map(([label, qs]) => (
        <div
          key={label}
          className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          <h3 className="text-xl font-bold text-center sticky top-0 bg-gray-50 py-2">
            {label} Sector
          </h3>

          {qs.map((q) => {
            const open = openId === q.id;
            return (
              <details
                key={q.id}
                open={open}
                onClick={() => setOpenId(open ? null : q.id)}
                className="border rounded-lg p-4 transition hover:shadow-sm">
                <summary className="cursor-pointer font-medium">
                  {q.question}
                </summary>
                <p className="mt-2 text-gray-700">Example: {q.answer}</p>
              </details>
            );
          })}
        </div>
      ))}
    </div>
  );
}
