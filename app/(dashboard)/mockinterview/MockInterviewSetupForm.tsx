"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MockInterviewSetupFormProps {
  clerkId: string;
  userName?: string;
}

const industries = [
  "Technology",
  "Marketing",
  "Sales",
  "Finance",
  "Healthcare",
  "Education",
  "Operations",
  "Human Resources",
  "Customer Service",
  "Administrative",
  "Legal",
  "Retail",
  "Hospitality",
  "Other",
];

const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid Level",
  "Senior",
  "Manager",
  "Executive",
];

const interviewTypes = ["Behavioral", "Role-Specific", "Mixed", "Leadership"];

const roleExamples = [
  "Marketing Manager",
  "Sales Associate",
  "Data Analyst",
  "Nurse",
  "Customer Support Specialist",
  "Frontend Developer",
];

const MockInterviewSetupForm = ({
  clerkId,
  userName,
}: MockInterviewSetupFormProps) => {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [level, setLevel] = useState("Mid Level");
  const [type, setType] = useState("Mixed");
  const [focusAreas, setFocusAreas] = useState("");
  const [amount, setAmount] = useState(5);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const greeting = useMemo(() => {
    return userName ? `Hi ${userName},` : "Let’s";
  }, [userName]);

  const helperExamples = useMemo(
    () => [
      "Customer service, conflict resolution, scheduling",
      "Excel, reporting, stakeholder communication",
      "React, APIs, system design",
    ],
    [],
  );

  const normalizedInterviewType = useMemo(() => {
    switch (type) {
      case "Behavioral":
        return "behavioral";
      case "Role-Specific":
        return "role-specific";
      case "Leadership":
        return "leadership";
      case "Mixed":
      default:
        return "mixed";
    }
  }, [type]);

  const validateForm = () => {
    if (!role.trim()) return "Please enter a job title or role.";
    if (!industry.trim()) return "Please select an industry.";
    if (amount < 3 || amount > 10) {
      return "Number of questions must be between 3 and 10.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role.trim(),
          industry: industry.trim(),
          level,
          type: normalizedInterviewType,
          focusAreas: focusAreas.trim(),
          amount,
          clerkId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data?.error?.message ||
            data?.error ||
            "We could not create your interview right now.",
        );
        return;
      }

      router.push(`/interview/${data.interview.id}`);
    } catch (err) {
      console.error("Failed to create interview:", err);
      setError("Something went wrong while creating your interview.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white">
        <p className="text-sm text-slate-400">
          {greeting} build a mock interview tailored to your job.
        </p>

        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Practice interviews for any role, any industry
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-slate-300">
          Create a mock interview tailored to your role industry, and experience
          level — whether you work in tech, marketing, sales, healthcare,
          operations, education, or beyond.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {roleExamples.map((example) => (
            <span
              key={example}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
              {example}
            </span>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-6 text-white md:p-8">
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-200">
              Job Title or Role
            </label>
            <input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Examples: Marketing Manager, Nurse, Data Analyst, Frontend Developer"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-medium text-slate-200">
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
                required>
                <option value="" className="bg-[#0B1020] text-slate-300">
                  Select an industry
                </option>
                {industries.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#0B1020] text-slate-300">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-medium text-slate-200">
                Experience Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400">
                {experienceLevels.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#0B1020] text-slate-300">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-slate-200">
                Interview Style
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400">
                {interviewTypes.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#0B1020] text-slate-300">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-slate-200">
                Number of Questions
              </label>
              <input
                id="amount"
                type="number"
                min={3}
                max={10}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
              <p className="mt-2 text-xs text-slate-400">
                Choose between 3 and 10 questions.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="focusAreas"
              className="mb-2 block text-sm font-medium text-slate-200">
              Key Skills or Topics
            </label>
            <textarea
              id="focusAreas"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
              rows={4}
              placeholder="Examples: customer service, conflict resolution, Excel, stakeholder communication, React, APIs, budgeting, patient care"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <p>Examples:</p>
              {helperExamples.map((example) => (
                <p key={example}>• {example}</p>
              ))}
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[240px] rounded-full bg-white px-8 py-6 text-base font-semibold text-black hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting
                ? "Creating Interview..."
                : "Create and Start Interview"}
            </Button>

            <p className="text-center text-sm text-slate-400">
              You’ll go straight into your interview session after setup.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MockInterviewSetupForm;
