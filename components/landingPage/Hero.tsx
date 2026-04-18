import Image from "next/image";
import Link from "next/link";

import { PrimaryButton } from "./PrimaryButton";
import { OutlineButton } from "./OutlineButton";
import { SectionGridBackground } from "./SectionGridBackground";
import dashboardMockup from "../../assets/LandingImg.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-16 lg:pb-28 lg:pt-24">
      <SectionGridBackground opacity="0.03" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/CareerOSLogo.png"
            alt="CareerOS"
            width={280}
            height={280}
            priority
            className="mb-8 h-auto w-auto"
          />

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-red-600">
            The Operating System for Your Next Career
          </p>

          <h1 className="max-w-5xl text-3xl font-black tracking-tighter text-black sm:text-4xl lg:text-5xl">
            Build. Apply. <span className="text-red-600">Get Hired.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 ">
            CareerOS gives you one place to build resumes and cover letters,
            track jobs and applications, prepare for interviews, and grow
            through career content every step of the way.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <PrimaryButton asChild className="h-14 px-10 text-base font-bold">
              <Link href="/sign-up">Get Started Free</Link>
            </PrimaryButton>

            <OutlineButton href="#how-it-works">See How It Works</OutlineButton>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <div className="relative z-10 overflow-hidden rounded-4xl border border-gray-200 bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] lg:rounded-[2.5rem]">
            <Image
              src={dashboardMockup}
              alt="CareerOS dashboard preview"
              priority
              className="h-auto w-full rounded-3xl border border-gray-200 lg:rounded-4xl"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]"
          />
        </div>
      </div>
    </section>
  );
}
