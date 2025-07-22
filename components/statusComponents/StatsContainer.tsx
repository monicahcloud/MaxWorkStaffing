"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard, { StatsLoadingCard } from "./StatsCard";

function StatsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  if (isPending)
    return (
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  return (
    <>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2">
        <StatsCard title="pending jobs" value={data?.Pending || 0} />
        <StatsCard title="interviews set" value={data?.Interview || 0} />
        <StatsCard title="jobs declined" value={data?.Declined || 0} />
        <StatsCard title="hired" value={data?.Hired || 0} />
        <StatsCard title="offer extended" value={data?.Offered || 0} />
        <StatsCard
          title="applications submitted"
          value={data?.Submitted || 0}
        />
      </div>
    </>
  );
}
export default StatsContainer;
