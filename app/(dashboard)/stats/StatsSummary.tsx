"use client";

import SectionTitle from "@/components/SectionTitle";
import ChartsContainer from "@/components/statusComponents/ChartsContainer";
import StatsContainer from "@/components/statusComponents/StatsContainer";

export default function StatsSummary() {
  return (
    <>
      <div>
        <SectionTitle
          text="Add Job"
          subtext="Track your job applications by entering key details for each position you've applied to."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <StatsContainer />
        <ChartsContainer />
      </div>
    </>
  );
}
