"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── Animation variants ───────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

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

const TipCard = ({ title, emoji, bullets }: TipCardProps) => (
  <motion.div
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
  return (
    <section className="space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-red-600">
          Resume Tips for Every Journey
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Whether you're transitioning from the military, stepping out of
          college, or switching careers—these resume tips will help you tell
          your story with clarity and confidence.
        </p>
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
      {/* Top 20 Resume Tips Section */}
      {/* <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-6">
  <h2 className="text-2xl font-bold text-red-600 text-center">
    ✅ Top 20 Resume Tips (With Examples)
  </h2>
  <ul className="space-y-6 text-gray-800 text-base leading-relaxed list-decimal list-inside">
    {[
      {
        title: "Start With a Strong Summary",
        example: `“Results-driven project manager with 10+ years of experience... Seeking to contribute to a growing tech company.”`,
      },
      {
        title: "Customize for Every Job",
        example: `If a job description says “experience with CRM systems,” update your resume to include “CRM systems like Salesforce and HubSpot.”`,
      },
      {
        title: "Keep the Format Clean and Simple",
        example: `Use bold section titles like “Experience” and “Education,” 11-12 pt font, and consistent spacing.`,
      },
      {
        title: "Add a Skills or Core Competencies Section",
        example: `Skills: Project Management | Budgeting | Data Analysis | Excel | Remote Team Leadership | Government Contracting`,
      },
      {
        title: "Use Numbers to Show Impact",
        example: `“Increased client retention by 25% in 6 months.”`,
      },
      {
        title: "Start Bullet Points With Strong Verbs",
        example: `“Managed a team of 12 technicians across five locations.”`,
      },
      {
        title: "Focus on Results, Not Just Tasks",
        example: `✅ “Streamlined employee schedules, reducing overtime by 20%.”`,
      },
      {
        title: "Keep It 1–2 Pages",
        example: `1 page for early career, 2 pages if 10+ years. Focus on the last 10–15 years.`,
      },
      {
        title: "Ditch the Objective Statement",
        example: `✅ “Experienced logistics coordinator with a track record of reducing supply chain delays by 40%.”`,
      },
      {
        title: "Send as a PDF (Unless Told Otherwise)",
        example: `Only use Word if the employer requests it.`,
      },
      {
        title: "Show Career Growth",
        example: `Each job title in a promotion ladder proves progression.`,
      },
      {
        title: "List Certifications & Clearances",
        example: `CompTIA Security+ | PMP Certified | Active Secret Clearance`,
      },
      {
        title: "Translate Military to Civilian Language",
        example: `✅ “Led administrative operations for a 400-member unit.”`,
      },
      {
        title: "Use Job Description Keywords",
        example: `✅ “Managed vendor relationships to improve delivery time by 15%.”`,
      },
      {
        title: "Include Your LinkedIn Profile",
        example: `linkedin.com/in/yourname`,
      },
      {
        title: "Mention Remote or Hybrid Work Experience",
        example: `✅ “Managed virtual teams across 3 time zones.”`,
      },
      {
        title: "Prove Soft Skills with Actions",
        example: `✅ “Facilitated weekly cross-department meetings to reduce delays by 20%.”`,
      },
      {
        title: "Include Volunteer or Side Projects",
        example: `✅ “Coordinated logistics for a nonprofit food drive.”`,
      },
      {
        title: "Be Consistent with Formatting",
        example: `Same date formats, bullet style, and font throughout.`,
      },
      {
        title: "Proofread. Then Proofread Again.",
        example: `Use Grammarly or read out loud to catch typos.`,
      },
    ].map((tip, idx) => (
      <li key={idx}>
        <strong>{tip.title}</strong>
        <br />
        <span className="text-gray-600 italic">Example:</span> {tip.example}
      </li>
    ))}
  </ul>
</div> */}
    </section>
  );
};

export default ResumeTips;
