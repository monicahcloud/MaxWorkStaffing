"use client";

import Link from "next/link";
import { RainbowButton } from "./RainbowButton";
import { Bot, PencilLine, Mail, BarChart2, Mic, Briefcase } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import dashboardMockup from "../../assets/LandingImg.jpg"; // Place your generated mockup here
// import { HeroCarousel } from "../HeroCarousel";

export function Hero() {
  return (
    <section className="relative w-full pt-20 px-6 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <Image
            src={logo}
            alt="MaxWork logo"
            className="mb-4 mx-auto lg:mx-0"
          />
          <h1 className="text-4xl text-black sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Land Your Next Job Faster
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            All-in-one career toolkit — create standout resumes and cover
            letters, track applications, and prepare for interviews.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            {[
              { icon: Bot, text: "Generate resumes with A.I. assistance" },
              { icon: PencilLine, text: "Build tailored cover letters" },
              { icon: BarChart2, text: "Track job applications" },
              { icon: Mic, text: "Practice interview questions" },
              { icon: Briefcase, text: "Search and apply for jobs" },
              { icon: Mail, text: "Print, email, or share documents" },
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
                Get Started — It's Free
              </RainbowButton>
            </Link>
          </div>
        </div>

        {/* Right Column with Mockup */}
        <div className="w-full lg:w-1/2 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <Image
              src={dashboardMockup}
              alt="Dashboard Mockup"
              className="w-full h-auto"
              priority
            />
          </div>

          <div
            className="absolute -top-16 -right-16 w-80 h-80 bg-rose-300 opacity-30 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </div>
        {/* Add this at the very bottom of your Hero component */}
      </div>{" "}
      {/* <div className="mt-20">
        <HeroCarousel />
      </div> */}
    </section>
  );
}
