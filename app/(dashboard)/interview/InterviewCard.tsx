import { Button } from "@/components/ui/button";
import DisplayTechIcons from "@/components/ui/DisplayTechIcons";
import { getRandomInterviewCover } from "@/utils/utils";
import dayjs from "dayjs";
import { Calendar1, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function InterviewCard({
  // userId,
  role,
  type,
  id,
  techstack,
}: InterviewCardProps) {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || Date.now()).format(
    "MMM D, YYYY"
  );
  return (
    <div className="w-full max-w-sm mx-auto p-0.5 mb-5 rounded-2xl bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] min-h-96">
      <div className="rounded-2xl bg-gradient-to-b from-[#1A1C20] to-[#08090D]  flex flex-col p-6 relative overflow-hidden gap-10 justify-between">
        <div>
          <div>
            <p className="text-sm text-white font-semibold capitalize absolute top-0 right-0 w-fit px-4 py-2 bg-slate-500 rounded-bl-lg">
              {normalizedType}
            </p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={60}
            height={60}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize text-white text-xl">
            {role} Interview
          </h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex text-white flex-row gap-2">
              <Calendar1 />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row text-white gap-3">
              <Star /> <p>{feedback?.totalScore || "---/100"}</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5 text-white">
            {feedback?.finalAssessment ||
              "Your haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between text-white">
          <DisplayTechIcons techStack={techstack} />
          <Button className="bg-gray-400 rounded-3xl text-black">
            <Link
              href={
                feedback ? `/interview/${id}/feedback` : `/interview/${id}`
              }>
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
