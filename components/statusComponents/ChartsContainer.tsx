"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getChartsDataAction } from "@/utils/actions";
import { EmptyState } from "../EmptyState";

function ChartsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ["charts"],
    queryFn: getChartsDataAction,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl font-medium">Please wait...</h2>
      </div>
    );
  }

  const hasData = data && data.length > 0;

  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Monthly Applications
      </h1>

      {!hasData ? (
        <EmptyState
          buttontext="Add Job"
          description="Add a new job to view real-time stats"
          title="No Jobs Found"
          href="/addJob"
        />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default ChartsContainer;
