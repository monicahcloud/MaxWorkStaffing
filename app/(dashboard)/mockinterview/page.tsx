import Agent from "@/components/mockinterview/Agent";
import SectionTitle from "@/components/SectionTitle";
import { currentUser } from "@clerk/nextjs/server";

import React from "react";

const MockInterviewRoute = async () => {
  const user = await currentUser();

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
      />
    </>
  );
};

export default MockInterviewRoute;
