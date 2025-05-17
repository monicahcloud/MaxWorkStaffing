import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import robot from "../../../assets/robot.png";
import InterviewCard from "./InterviewCard";
import { currentUser } from "@clerk/nextjs/server";
import { getInterviewsByUserId, getLatestInterviews } from "@/utils/actions";

async function page() {
  const user = await currentUser();

  if (!user) {
    // Handle unauthenticated user (e.g., redirect, return null, or throw)
    throw new Error("User not found. Please log in.");
  }

  // Now it's safe to use user.id
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
      <SectionTitle
        text="Get Interview-Ready with AI -Powered Practice & Feedback"
        subtext="Practice on real interview questions & get instant feedback"
      />
      <section className="flex flex-row  bg-gradient-to-b from-[#171532] to-[#08090D] rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
        <div className="flex  md:flex-row items-center gap-6 max-w-lg">
          <Button asChild variant="outline" className="bg-muted max-sm:w-full">
            <Link href="/mockInterview">Start an Interview</Link>
          </Button>
          <Image
            src={robot}
            alt="robot"
            height={400}
            width={400}
            className="max-sm:hidden"
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-3xl font-semibold">Your Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p> You haven&apos;t taken any interviews.</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-3xl font-semibold">Conduct a Practice Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p> There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default page;
