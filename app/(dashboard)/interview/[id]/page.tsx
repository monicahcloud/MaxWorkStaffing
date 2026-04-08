export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { getInterviewById } from "@/utils/actions";
import { getInterviewCover } from "@/utils/utils";
import Agent from "@/components/mockinterview/Agent";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

function formatInterviewType(type: string) {
  switch (type) {
    case "behavioral":
      return "Behavioral";
    case "role-specific":
      return "Role-Specific";
    case "leadership":
      return "Leadership";
    default:
      return "Mixed";
  }
}

const Page = async ({ params }: RouteParams) => {
  const user = await currentUser();
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!user) redirect("/sign-in");
  if (!interview) redirect("/interview");

  const industry = interview.industry || "Other";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 md:px-6">
      <SectionTitle
        text="Start Your Interview"
        subtext="You’re about to begin a live AI interview. Answer naturally, stay confident, and treat this like a real conversation."
      />

      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-5 text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={getInterviewCover(industry)}
              alt={`${industry} interview cover`}
              width={72}
              height={72}
              className="size-[72px] rounded-full object-cover ring-2 ring-white/10"
            />

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Interview Ready
              </p>
              <h2 className="mt-1 text-2xl font-semibold">{interview.role}</h2>
              <p className="mt-1 text-sm text-slate-300">
                Your AI interview is ready. Start when you’re ready.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs text-slate-400">Style</p>
              <p className="font-medium text-white">
                {formatInterviewType(interview.type)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs text-slate-400">Level</p>
              <p className="font-medium text-white">{interview.level}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs text-slate-400">Industry</p>
              <p className="font-medium text-white">{industry}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs text-slate-400">Questions</p>
              <p className="font-medium text-white">
                {interview.questions?.length ?? 0}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Agent
          userName={user.firstName || "Guest"}
          clerkId={user.id}
          interviewId={interview.id}
          questions={interview.questions}
          imageUrl={user.imageUrl || ""}
          role={interview.role}
          level={interview.level}
          industry={interview.industry || "general"}
        />
      </section>
    </div>
  );
};

export default Page;
