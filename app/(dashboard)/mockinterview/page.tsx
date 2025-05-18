export const dynamic = "force-dynamic";

import Agent from "@/components/mockinterview/Agent";
import SectionTitle from "@/components/SectionTitle";
import { currentUser } from "@clerk/nextjs/server";

import React from "react";

const MockInterviewRoute = async () => {
  const user = await currentUser();
  if (!user) {
    return <div className="text-white">Please sign in to continue.</div>;
  }

  return (
    <>
      <SectionTitle
        text="Interview Generation"
        subtext="Real-Time AI Voice Interview Platform"
      />
      <Agent
        userName={user?.firstName ?? "Guest"}
        userId={user?.id ?? ""}
        type="generate"
        imageUrl={user?.imageUrl ?? ""}
      />
    </>
  );
};

export default MockInterviewRoute;
