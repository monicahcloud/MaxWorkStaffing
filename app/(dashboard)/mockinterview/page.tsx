import Agent from "@/components/mockinterview/Agent";
import SectionTitle from "@/components/SectionTitle";
import React from "react";

const MockInterviewRoute = () => {
  return (
    <>
      <SectionTitle
        text="Interview Generation"
        subtext="Real-Time AI Vocie Interview Platform"
      />
      <Agent userName="You" userId="user1" type="generate" />
    </>
  );
};

export default MockInterviewRoute;
