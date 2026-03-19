"use client";

import { motion } from "framer-motion";
import { featureCards } from "./feature-data";
type PlaybookDownloadProps = {
  /** Path to the file in /public (e.g., "/The_Ultimate_Interview_Guide.pdf") */
  filePath?: string;
  /** The filename the user will see when they download the file */
  fileName?: string;
  /** Optional custom heading */
  heading?: string;
  /** Optional sub-text under the heading  */
  subheading?: string;
  /** Optional brand logo or node */
  brand?: React.ReactNode;
};

const FeatureSection = ({
  filePath = "/TheUltimateInterviewPlaybookforSuccess.pdf",
  fileName = "The_Ultimate_Interview_Guide.pdf",
  heading = "The Interview Playbook Every Jobseeker Needs",
  subheading = "Your ultimate guide to mastering every stage of the interview process—from preparation to follow-up.",
  brand,
}: PlaybookDownloadProps) => {
  const { interview, jobSearch, strategy, ebook } = featureCards;
  const InterviewIcon = interview.icon;
  const JobSearchIcon = jobSearch.icon;
  const JobSearchActionIcon = jobSearch.actionIcon;
  const StrategyIcon = strategy.icon;
  const EbookIcon = ebook.icon;
  const EbookBgIcon = ebook.bgIcon;

  return (
    <section id="features" className="relative bg-white py-24">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-black md:text-6xl">
              The Career <br />
              <span className="text-red-600">Command Center.</span>
            </h2>
          </div>

          <p className="max-w-xs text-lg font-bold text-slate-500">
            Powerful AI tools designed to give you an unfair advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-black p-10 text-white md:col-span-2 md:row-span-2">
            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-500/20">
                <InterviewIcon className="h-7 w-7 text-white" />
              </div>

              <h3 className="mb-4 text-4xl font-black uppercase tracking-tight">
                AI Interview <br />
                Simulator
              </h3>

              <p className="max-w-xs text-lg font-medium text-slate-400">
                {interview.description}
              </p>
            </div>

            <div className="mt-12 flex h-20 items-end gap-1.5 opacity-60 transition-opacity group-hover:opacity-100">
              {interview.bars.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1 + h,
                    ease: "easeInOut",
                  }}
                  className="w-full rounded-t-lg bg-red-600"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="group flex flex-col justify-between rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 md:col-span-2">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600">
                  <JobSearchIcon className="h-4 w-4" />
                  <span>{jobSearch.label}</span>
                </div>

                <h3 className="text-2xl font-black uppercase text-black">
                  {jobSearch.title}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition-colors group-hover:border-red-600">
                <JobSearchActionIcon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-red-600" />
              </div>
            </div>

            <p className="mt-4 font-medium text-slate-500">
              {jobSearch.description}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col justify-between rounded-[2.5rem] border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black">
              <StrategyIcon className="h-5 w-5 text-red-600" />
            </div>

            <h3 className="mb-2 text-xl font-black uppercase leading-tight text-black">
              {strategy.title}
            </h3>

            <p className="text-xs font-bold italic tracking-tight text-slate-500">
              {strategy.description}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-red-600 p-8 text-white">
            <a href={filePath} download={fileName}>
              <EbookBgIcon className="absolute -bottom-2 -right-2 h-20 w-20 opacity-10 transition-transform group-hover:scale-110" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <EbookIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-black uppercase leading-tight">
                {ebook.title}
              </h3>
              <div>
                {/* Optional logo / brand */}
                {brand && <div className="flex justify-center">{brand}</div>}

                <h2 className="text-md font-bold text-white">{heading}</h2>

                <p className="text-sm text-gray-700 mx-auto">{subheading}</p>
              </div>
              <p className="pt-5 text-xs font-bold uppercase italic tracking-tighter text-red-100 underline">
                {ebook.description}
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default FeatureSection;
