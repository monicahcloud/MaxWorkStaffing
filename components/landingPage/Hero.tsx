"use client";

import Link from "next/link";
import { RainbowButton } from "./RainbowButton";
import { HeroCarousel } from "../HeroCarousel";
import { Bot, PencilLine, Mail, BarChart2, Mic, Briefcase } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

export function Hero() {
  return (
    <section className="relative w-full pt-20 px-6 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* <span className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold text-sm rounded-full shadow-sm">
            Max ResumeBuilder 1.0
          </span> */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {/* Max <span className="text-red-600">ResumeBuilder</span> */}
            <Image src={logo} alt="logo" />
            <span className="block mt-3 text-3xl sm:text-4xl font-medium bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent animate-pulse">
              Build <span className="text-black mx-2">|</span>
              Track <span className="text-black mx-2">|</span>
              Succeed
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            All-in-one career toolkit — create standout resumes and cover
            letters, monitor job applications, prep for interviews, and more.
          </p>

          <div className="mt-6 space-y-3 text-left text-sm sm:text-base text-gray-700">
            {[
              {
                icon: Bot,
                text: "Generate custom resumes with A.I. assistance",
              },
              {
                icon: PencilLine,
                text: "Build custom cover letters in minutes",
              },
              {
                icon: Mail,
                text: "Download, print, email or create shareable links for your documents",
              },
              { icon: BarChart2, text: "Track your job application progress" },
              { icon: Mic, text: "Practice and prepare for interviews" },
              { icon: Briefcase, text: "Search and apply for jobs in-app" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-red-600" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/sign-up">
              <RainbowButton className="bg-red-600 text-white hover:bg-red-700">
                Let&apos;s Get Started
              </RainbowButton>
            </Link>
          </div>

          {/* Carousel on Mobile */}
          <div className="mt-12 lg:hidden w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <HeroCarousel />
            </div>
          </div>
        </div>

        {/* Carousel on Desktop */}
        <div className="hidden lg:block lg:w-1/2 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <HeroCarousel />
          </div>

          <div
            className="absolute -top-16 -right-16 w-80 h-80 bg-rose-300 opacity-30 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
