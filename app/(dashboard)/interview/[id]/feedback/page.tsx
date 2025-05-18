import { getFeedbackByInterviewId, getInterviewById } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await currentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/interview");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });
  console.log(feedback);
  return <div>Page</div>;
};

export default Page;
