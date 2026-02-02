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
    <section className="mt-5">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Monthly Applications
      </h1>
      <p className="">
        <span className="font-bold text-red-700">Note:</span> This chart
        displays your job applications over the past 6 months. Only applications
        with a recorded "Date Applied" will appear here.{" "}
      </p>
      {!hasData ? (
        <EmptyState
          buttontext="Add Job"
          description="Add a new job to view real-time stats"
          title="No Jobs Found"
          href="/addJob"
        />
      ) : (
        <ResponsiveContainer width="90%" height={250}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#cc0000" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default ChartsContainer;
