import { getInterviewById } from "@/utils/actions";
import { getRandomInterviewCover } from "@/utils/utils";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import DisplayTechIcons from "@/components/ui/DisplayTechIcons";
import Agent from "@/components/mockinterview/Agent";
import { currentUser } from "@clerk/nextjs/server";

const Page = async ({ params }: RouteParams) => {
  const user = await currentUser();
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!interview) redirect("/interview");
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[4opx]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
            <DisplayTechIcons techStack={interview.techstack} />
            <p className="bg-gray-600 px-4 py-2 rounded-lg h-fit text-white capitalize">
              {interview.type}
            </p>
          </div>
          <Agent
            userName={user?.firstName || "Guest"}
            userId={user?.id}
            interviewId={id}
            type="interview"
            questions={interview.questions}
          />
        </div>
      </div>
    </>
  );
};
export default Page;
