"use client";

import React from "react";
import { interviewCards } from "./interview-cards";
import InterviewCard from "./InterviewCard";
// import Image from "next/image";

const InterviewTypes = () => {
  return (
    <main className="bg-gray-100">
      {/* —— Intro Copy —— */}
      <section className="text-center py-12 px-4">
        {/* <Image
          src="/blog/universaltips.png"
          alt="Man transitioning from military to civilian career"
          width={175}
          height={300}
          className="rounded-lg shadow mx-auto absolute  top-50 left-10 z-90 bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
        /> */}
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
          Explore Interview Formats
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Understanding the different types of interviews can help you prepare
          strategically and present your best self.
        </p>
        <p className="text-red-500 ">
          Click a tile below to learn more about each format.
        </p>
      </section>

      {/* —— Card Grid —— */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {interviewCards.map((card) => (
            <InterviewCard key={card.title} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default InterviewTypes;
