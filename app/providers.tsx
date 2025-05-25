"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/lib/react-query-client";
import { NextStep, NextStepProvider } from "nextstepjs";
import steps from "@/components/tourGuide/tour";
import { UserProgressProvider } from "@/components/UserProgressContext"; // ← Add this line

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <UserProgressProvider>
          {" "}
          {/* ← Wrap here */}
          <NextStepProvider>
            <NextStep steps={steps}>{children}</NextStep>
          </NextStepProvider>
        </UserProgressProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
