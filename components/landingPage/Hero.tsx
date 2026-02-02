"use client";

import Link from "next/link";
import { RainbowButton } from "./RainbowButton";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import dashboardMockup from "../../assets/LandingImg.jpg";

export function Hero() {
  return (
    <section className="relative w-full pt-16 lg:pt-32 px-6 overflow-hidden bg-white">
      {/* Background Grid - Clean & Professional */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 space-y-8 animate-reveal">
          <Image
            src={logo}
            alt="MaxWork"
            width={180}
            height={45}
            className="mb-6 mx-auto lg:mx-0"
            priority
          />

          <h1 className="text-6xl lg:text-8xl font-black text-black tracking-tighter leading-[0.9] text-center lg:text-left">
            LAND YOUR <br />
            <span className="text-red-600">DREAM ROLE.</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left font-medium">
            The AI-powered command center for your career. Engineer high-impact
            resumes, track applications, and master interviews in one place.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            {["Resume Engine", "App Tracker", "Interview AI"].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 text-black font-bold">
                <CheckCircle2 className="w-5 h-5 text-red-600" />
                <span className="text-xs uppercase tracking-widest">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-start pt-4">
            <Link href="/sign-up">
              <RainbowButton className="h-14 px-12 text-lg font-bold">
                Get Started — Free
              </RainbowButton>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="relative z-10 p-2 bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
            <Image
              src={dashboardMockup}
              alt="Dashboard Preview"
              className="w-full h-auto rounded-[2rem] border border-gray-200"
              priority
            />
          </div>

          {/* Subtle Red Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-500/5 rounded-full blur-[120px] -z-10" />
        </div>
      </div>
    </section>
  );
}
