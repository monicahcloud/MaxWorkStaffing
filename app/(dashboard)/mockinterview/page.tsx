export const dynamic = "force-dynamic";

import SectionTitle from "@/components/SectionTitle";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import MockInterviewSetupForm from "./MockInterviewSetupForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MockInterviewRoute = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="text-2xl font-semibold">You’re not signed in</h2>

        <p className="mt-2 max-w-md text-slate-400">
          Sign in to practice interviews for any role — whether you're in tech,
          healthcare, business, or any other field.
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 md:px-6">
      {/* TITLE */}
      <SectionTitle
        text="Practice Interviews for Any Role — Powered by AI"
        subtext="Create a mock interview tailored to your job, industry, and experience level — then jump straight into a live AI session with real-time interaction and coaching feedback."
      />

      {/* ROLE SIGNALS */}
      {/* <div className="text-center text-sm text-slate-400">
        Try roles like:
        <span className="text-white"> Marketing Manager</span>,{" "}
        <span className="text-white"> Sales Associate</span>,{" "}
        <span className="text-white"> Data Analyst</span>,{" "}
        <span className="text-white"> Nurse</span>,{" "}
        <span className="text-white"> Customer Support</span>,{" "}
        <span className="text-white"> Frontend Developer</span>
      </div> */}

      {/* GUIDANCE */}
      {/* <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white">
        <h3 className="text-xl font-semibold">How this works</h3>

        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
          <li>• Choose your role, industry, and experience level</li>
          <li>• Practice real interview questions tailored to your job</li>
          <li>• Answer in real time with an AI interviewer</li>
          <li>• Get a personalized coaching report instantly</li>
        </ul>

        <p className="mt-4 text-sm text-slate-400">
          No matter your field — this interview adapts to your role.
        </p>
      </div> */}

      {/* FORM */}
      <MockInterviewSetupForm
        clerkId={user.id}
        userName={user.firstName ?? "Guest"}
      />
    </div>
  );
};

export default MockInterviewRoute;
