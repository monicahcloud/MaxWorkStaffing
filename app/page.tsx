"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Search,
  BookOpen,
  Lightbulb,
  ArrowUpRight,
  Download,
  Zap,
  FileText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ✅ FIXED: Added missing Next.js Image import
import { Hero } from "@/components/landingPage/Hero";
import { RainbowButton } from "@/components/landingPage/RainbowButton";
import logo from "../assets/logo.png"; // ✅ Ensure this path is correct for your project

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans">
      {/* --- HERO SECTION --- */}
      <Hero />

      {/* --- BENTO GRID FEATURES --- */}
      <section id="features" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none">
                The Career <br />
                <span className="text-red-600">Command Center.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold text-lg max-w-xs">
              Powerful AI tools designed to give you an unfair advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
            {/* 1. AI INTERVIEW COACH */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-2 bg-black rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/20">
                  <Mic className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight mb-4">
                  AI Interview <br />
                  Simulator
                </h3>
                <p className="text-slate-400 font-medium text-lg max-w-xs">
                  Practice real-time behavioral interviews. Get instant feedback
                  on your pacing, keywords, and confidence.
                </p>
              </div>

              <div className="mt-12 flex items-end gap-1.5 h-20 group-hover:opacity-100 opacity-60 transition-opacity">
                {[0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.9, 1, 0.6, 0.8, 0.4].map(
                  (h, i) => (
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
                      className="w-full bg-red-600 rounded-t-lg"
                    />
                  ),
                )}
              </div>
            </motion.div>

            {/* 2. JOB SEARCH */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest">
                    <Search className="w-4 h-4" />
                    <span>Real-Time Engine</span>
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase">
                    Smart Job Search
                  </h3>
                </div>
                <div className="h-10 w-10 bg-white rounded-full border border-slate-200 flex items-center justify-center group-hover:border-red-600 transition-colors">
                  <ArrowUpRight className="text-slate-400 group-hover:text-red-600 transition-colors w-5 h-5" />
                </div>
              </div>
              <p className="text-slate-500 font-medium mt-4">
                Access millions of listings. Use AI Match Scores to prioritize
                applications where your profile stands out most.
              </p>
            </motion.div>

            {/* 3. EXPERT TIPS */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] p-8 border-2 border-black flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-black uppercase leading-tight mb-2">
                Expert Strategy
              </h3>
              <p className="text-slate-500 text-xs font-bold italic tracking-tight">
                Curated resume & interview tips.
              </p>
            </motion.div>

            {/* 4. FREE E-BOOK */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-red-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group">
              <Download className="absolute -bottom-2 -right-2 w-20 h-20 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black uppercase leading-tight mb-2">
                Free E-Book
              </h3>
              <p className="text-red-100 text-xs font-bold uppercase tracking-tighter underline italic">
                Download Guide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECONDARY TOOLS --- */}
      <section className="py-24 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI Analysis",
                desc: "Pass the ATS with keyword suggestions powered by industry data.",
              },
              {
                icon: FileText,
                title: "Smart Templates",
                desc: "Clean, high-performance designs built for modern hiring software.",
              },
              {
                icon: BarChart3,
                title: "Job Tracking",
                desc: "Never miss a follow-up with our intuitive application dashboard.",
              },
            ].map((feature, i) => (
              <div key={i} className="space-y-4 p-4 text-center md:text-left">
                <feature.icon className="w-8 h-8 text-red-600 mx-auto md:mx-0" />
                <h4 className="text-xl font-black text-black uppercase tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 rounded-full blur-[120px]" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Ready to stand out <br />
                <span className="text-red-600">from the crowd?</span>
              </h2>
              <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
                Join thousands of professionals securing interviews with
                MaxResumeBuilder.com.
              </p>
              <Link href="/sign-up" className="block">
                <RainbowButton className="h-16 px-12 text-xl font-bold uppercase tracking-widest">
                  Create Account Free
                </RainbowButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src={logo}
              alt="MaxResumeBuilder.com"
              width={160}
              height={40}
              className="brightness-0"
            />
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              The Intelligence Behind Your Career.
            </p>
          </div>
          <div className="flex gap-10 text-black font-black uppercase text-[11px] tracking-widest">
            <Link
              href="/job-search"
              className="hover:text-red-600 transition-colors">
              Job Search
            </Link>
            <Link
              href="/interview-prep"
              className="hover:text-red-600 transition-colors">
              Interview AI
            </Link>
            <Link href="/tips" className="hover:text-red-600 transition-colors">
              Career Tips
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-900 font-black text-sm uppercase tracking-tighter">
              MaxResumeBuilder.com
            </p>
            <p className="text-slate-400 text-[10px] font-bold uppercase italic mt-1">
              © 2026 Built by VitaNova Designs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
