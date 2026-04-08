import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import robot from "../../../assets/robot.png";
import InterviewCard from "./InterviewCard";
import { currentUser } from "@clerk/nextjs/server";
import { getInterviewsByClerkId, getLatestInterviews } from "@/utils/actions";
import { ArrowRight, Sparkles } from "lucide-react";

async function page() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByClerkId(user.id),
    getLatestInterviews({ clerkId: user.id }),
  ]);

  const hasPastInterviews = userInterviews.length > 0;
  const hasRecentInterviews = latestInterviews.length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-6 md:px-6">
      <SectionTitle
        text="Get Interview-Ready with AI-Powered Practice and Feedback"
        subtext="Practice with realistic interview questions, improve your delivery, and get instant coaching after every session."
      />

      {/* HERO */}
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] px-6 py-8 text-white md:px-10 md:py-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              AI-Powered Interview Practice
            </div>

            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                Practice smarter before the real interview.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Start a live mock interview, answer in real time, and receive a
                coaching-style feedback report that shows your strengths,
                weaknesses, and next focus area.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-white px-6 py-6 text-base font-semibold text-black hover:bg-slate-200">
                <Link href="/mockinterview/">
                  Start a New Interview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-transparent px-6 py-6 text-base text-white hover:bg-white/10">
                <Link href="#history">View Interview History</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={robot}
              alt="AI interview assistant"
              height={420}
              width={420}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[320px] md:max-w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-white">
            Your Interview History
          </h2>
          <p className="max-w-2xl text-slate-400 leading-7">
            Review your previous mock interviews, revisit sessions, and track
            how your practice is improving over time.
          </p>
        </div>

        {hasPastInterviews ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {userInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-8 text-white">
            <h3 className="text-xl font-semibold">No interviews yet</h3>
            <p className="mt-2 max-w-xl text-slate-300">
              You have not completed any mock interviews yet. Start your first
              interview to begin building your feedback history.
            </p>
            <div className="mt-5">
              <Button asChild className="rounded-full">
                <Link href="/mockinterview/">Start Your First Interview</Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* RECENT / PRACTICE */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-white">
            Recent Practice Sessions
          </h2>
          <p className="max-w-2xl text-slate-400 leading-7">
            Jump back into recent interview sessions and continue practicing
            your responses with AI-guided coaching.
          </p>
        </div>

        {hasRecentInterviews ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {latestInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-8 text-white">
            <h3 className="text-xl font-semibold">
              No recent practice sessions
            </h3>
            <p className="mt-2 max-w-xl text-slate-300">
              Once you generate or complete more interviews, they will appear
              here for quick access.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default page;
