import { getFeedbackByInterviewId, getInterviewById } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  ArrowLeft,
  CalendarDays,
  RefreshCcw,
  Star,
  TrendingUp,
  TriangleAlert,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import DisplayTechIcons from "@/components/ui/DisplayTechIcons";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function getScoreLabel(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      description: "You gave a highly polished interview performance.",
    };
  }

  if (score >= 75) {
    return {
      label: "Strong",
      description: "You performed well with a few areas to sharpen.",
    };
  }

  if (score >= 60) {
    return {
      label: "Promising",
      description: "You have a solid base, but you need more refinement.",
    };
  }

  return {
    label: "Needs Work",
    description: "You need more practice before you are interview-ready.",
  };
}

function getScoreTone(score: number) {
  if (score >= 90) return "text-emerald-400 border-emerald-500/30";
  if (score >= 75) return "text-cyan-400 border-cyan-500/30";
  if (score >= 60) return "text-amber-400 border-amber-500/30";
  return "text-rose-400 border-rose-500/30";
}

function getLowestCategory(
  categories: { name: string; score: number; comment: string }[],
) {
  if (!categories.length) return null;
  return [...categories].sort((a, b) => a.score - b.score)[0];
}

const FeedbackPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await currentUser();

  if (!user) redirect("/");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/interview");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    clerkId: user.id,
  });
  // const feedback = {
  //   totalScore: 78,
  //   createdAt: new Date(),
  //   categoryScores: [
  //     {
  //       name: "Communication Skills",
  //       score: 82,
  //       comment: "Clear and structured responses, but could be more concise.",
  //     },
  //     {
  //       name: "Technical Knowledge",
  //       score: 70,
  //       comment: "Good fundamentals but lacks depth in some areas.",
  //     },
  //     {
  //       name: "Problem Solving",
  //       score: 75,
  //       comment: "Solid reasoning, but needs more structured thinking.",
  //     },
  //     {
  //       name: "Cultural Fit",
  //       score: 85,
  //       comment: "Strong alignment with values and teamwork mindset.",
  //     },
  //     {
  //       name: "Confidence and Clarity",
  //       score: 68,
  //       comment: "Some hesitation in answers, needs more confidence.",
  //     },
  //   ],
  //   strengths: [
  //     "Strong communication style",
  //     "Good understanding of core concepts",
  //   ],
  //   areasForImprovement: [
  //     "Be more confident in delivery",
  //     "Structure answers more clearly",
  //   ],
  //   finalAssessment:
  //     "Overall, this was a promising performance. With improved confidence and more structured responses, you can significantly increase your interview impact.",
  // };

  if (!feedback) {
    return (
      <>
        <SectionTitle
          text="Interview Feedback"
          subtext="Your coaching report will appear here after the interview is completed."
        />

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-8 text-white">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              No feedback available yet
            </h2>
            <p className="text-slate-300">
              It looks like this interview has not been completed or feedback
              has not been generated yet.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full">
                <Link href={`/interview/${id}`}>Go to Interview</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/interview">Back to Interviews</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const scoreMeta = getScoreLabel(feedback.totalScore);
  const scoreTone = getScoreTone(feedback.totalScore);
  const lowestCategory = getLowestCategory(feedback.categoryScores);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = feedback.totalScore / 100;
  const strokeDashoffset = circumference * (1 - progress);
  return (
    <>
      <SectionTitle
        text="Interview Feedback Report"
        subtext="A coaching-style breakdown of your mock interview performance."
      />

      <div className="flex flex-col gap-10">
        {/* HERO */}
        <section className="rounded-3xl bg-gradient-to-b from-[#171532] to-[#08090D] p-6 md:p-8 text-white border border-white/10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                  <CalendarDays className="h-4 w-4" />
                  {dayjs(feedback.createdAt).format("MMM D, YYYY")}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 capitalize">
                  <Star className="h-4 w-4" />
                  {interview?.type ?? "Mock"}
                </span>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {interview?.role ?? "Sample Role"} Interview
                </h2>
                <p className="mt-2 text-slate-300 max-w-2xl">
                  Here is your AI coaching report based on your mock interview
                  performance. Use this to improve your clarity, confidence, and
                  interview readiness before the real conversation.
                </p>
              </div>

              <DisplayTechIcons techStack={interview?.techstack || []} />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Overall Assessment
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  {scoreMeta.label}
                </h3>
                <p className="mt-2 text-slate-300">{scoreMeta.description}</p>
                <p className="text-sm text-slate-400">
                  Based on AI evaluation of your responses across 5 key
                  interview dimensions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href={`/interview/${id}`}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Retake Interview
                  </Link>
                </Button>

                <Button asChild variant="default" className="rounded-full">
                  <Link href="/interview">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Interviews
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div
                className={`w-full max-w-xs rounded-3xl border bg-white/5 p-6 text-center ${scoreTone}`}>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Total Score
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="relative h-36 w-36">
                    <svg className="h-full w-full rotate-[-90deg]">
                      {/* Background ring */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={
                          feedback.totalScore >= 85
                            ? "#34D399"
                            : feedback.totalScore >= 70
                              ? "#22D3EE"
                              : feedback.totalScore >= 55
                                ? "#FBBF24"
                                : "#FB7185"
                        }
                        strokeWidth="10"
                        fill="transparent"
                      />

                      {/* Progress ring */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        style={{
                          strokeDashoffset,
                        }}
                      />
                    </svg>

                    {/* Score text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">
                        {feedback.totalScore}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold">{scoreMeta.label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY BREAKDOWN */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">
              Performance Breakdown
            </h3>
            <p className="max-w-2xl text-slate-400 leading-7">
              This section shows how you performed across the core interview
              dimensions, so you can quickly spot both your strengths and the
              areas that need more repetition.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {feedback.categoryScores.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-5 text-white transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold leading-snug">
                    {item.name}
                  </h4>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium whitespace-nowrap">
                    {item.score}/100
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Score</span>
                    <span>{item.score}/100</span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${
                        item.score >= 85
                          ? "bg-emerald-400"
                          : item.score >= 70
                            ? "bg-cyan-400"
                            : item.score >= 55
                              ? "bg-amber-400"
                              : "bg-rose-400"
                      }`}
                      style={{
                        width: `${Math.max(0, Math.min(item.score, 100))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-sm leading-7 text-slate-300">
                    {item.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {lowestCategory && (
          <section className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-slate-500 backdrop-blur">
            <h3 className="text-xl font-semibold">Primary Focus Area</h3>

            <p className="mt-2 text-slate-900">
              Your weakest category was{" "}
              <span className="font-semibold text-slate-700">
                {lowestCategory.name}
              </span>
              .
            </p>

            <p className="mt-3 text-slate-500 leading-7">
              This is the area most likely to improve your overall interview
              performance. Put your next round of practice into this category
              first, then retake the interview and compare your score.
            </p>
          </section>
        )}
        {/* STRENGTHS + IMPROVEMENTS */}
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <h3 className="text-2xl font-semibold">Strengths</h3>
            </div>

            <div className="mt-5 space-y-3">
              {feedback.strengths.map((strength, index) => (
                <div
                  key={`${strength}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-slate-200">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="leading-7">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white">
            <div className="flex items-center gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-400" />
              <h3 className="text-2xl font-semibold">Areas for Improvement</h3>
            </div>

            <div className="mt-5 space-y-3">
              {feedback.areasForImprovement.length > 0 ? (
                feedback.areasForImprovement.map((area, index) => (
                  <div
                    key={`${area}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-slate-200">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <p className="leading-7">{area}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">
                  No improvement areas were returned.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FINAL ASSESSMENT */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 md:p-8 text-white">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            <h3 className="text-2xl font-semibold">Coach’s Final Assessment</h3>
          </div>

          <p className="mt-5 text-slate-300 leading-8 whitespace-pre-line">
            {feedback.finalAssessment}
          </p>
        </section>
        <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white p-6 text-white">
          <h3 className="text-xl font-semibold">What to Do Next</h3>
          <p className="mt-2 text-slate-300 leading-7">
            Focus your next practice session on your weakest category, then
            retake the interview to measure improvement. This feedback only
            works if you apply it.
          </p>

          <div className="mt-4 flex gap-3">
            <Button asChild className="rounded-full">
              <Link href={`/interview/${id}`}>Retake Interview</Link>
            </Button>

            <Button asChild variant="default" className="rounded-full">
              <Link href="/interview">Browse More Interviews</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeedbackPage;
