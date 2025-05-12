import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import robot from "../../../assets/robot.png";
import { dummyInterviews } from "@/utils/constants";
import InterviewCard from "./InterviewCard";

function page() {
  return (
    <>
      <SectionTitle
        text="Get Interview-Ready with AI -Powered Reactice & Feedback"
        subtext="Practice on real interview questions & get instant feedback"
      />
      <section className="flex flex-row  bg-gradient-to-b from-[#171532] to-[#08090D] rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
        <div className="flex  md:flex-row items-center gap-6 max-w-lg">
          <Button asChild variant="outline" className="bg-muted max-sm:w-full">
            <Link href="/mockinterview">Start an Interview</Link>
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
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-3xl font-semibold">Conduct a Practice Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
        <p> There are no interviews available</p>
      </section>
    </>
  );
}

export default page;
