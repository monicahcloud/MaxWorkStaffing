"use client";

import React from "react";
import { CheckCircle, Clock, Mail, ThumbsUp } from "lucide-react";

const etiquetteTips = [
  {
    icon: <Clock className="text-red-600 w-6 h-6" />,
    title: "Be Punctual",
    description:
      "Always arrive at least 10–15 minutes early, whether in-person or virtual. Tardiness gives the impression that you’re not serious about the opportunity.",
  },
  {
    icon: <CheckCircle className="text-red-600 w-6 h-6" />,
    title: "Dress Appropriately",
    description:
      "Choose attire that matches the company culture. When in doubt, go slightly more formal. Make sure you’re well-groomed and neat.",
  },
  {
    icon: <ThumbsUp className="text-red-600 w-6 h-6" />,
    title: "Show Confidence & Respect",
    description:
      "Give a firm handshake (or warm greeting), make eye contact, and use positive body language. Listen attentively and don’t interrupt.",
  },
  {
    icon: <Mail className="text-red-600 w-6 h-6" />,
    title: "Follow Up",
    description:
      "Always send a personalized thank-you email within 24 hours. Reiterate your interest and reference something meaningful from the conversation.",
  },
];

const InterviewEtiquette = () => {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
          Mastering Interview Etiquette
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          First impressions matter. Your conduct before, during, and after an
          interview can influence hiring decisions just as much as your resume.
          Here's what professional etiquette looks like in every stage.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {etiquetteTips.map((tip) => (
          <div
            key={tip.title}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-3">
              <div className="shrink-0">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-red-600">
                {tip.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-gray-50 border border-dashed border-red-200 rounded-xl p-6 sm:p-8 mt-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800">
          Bonus Tips from Max ResumeBuilder
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
          <li>
            Silence your phone and notifications before the interview starts.
          </li>
          <li>
            Address the interviewer by name and thank them for their time.
          </li>
          <li>Be aware of filler words — speak clearly and pause if needed.</li>
          <li>Have a few thoughtful questions ready to ask them.</li>
          <li>
            If it's virtual, check your lighting, camera angle, and audio
            beforehand.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InterviewEtiquette;
