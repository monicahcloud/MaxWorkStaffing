import { getFeedbackByInterviewId, getInterviewById } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface RouteParams {
  params: { id: string };
}

const FeedBackPage = async ({ params }: RouteParams) => {
  const { id } = params;
  const user = await currentUser();

  if (!user) redirect("/");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/interview");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  return (
    <div>
      <h1>Interview Feedback</h1>
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
    </div>
  );
};

export default FeedBackPage;
