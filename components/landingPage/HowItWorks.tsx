import Link from "next/link";
import {
  FileText,
  Briefcase,
  BarChart3,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { OutlineButton } from "./OutlineButton";
import { SectionGridBackground } from "./SectionGridBackground";

const steps = [
  {
    number: "01",
    title: "Build",
    description:
      "Create polished resumes and cover letters tailored to the roles you want.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Apply",
    description:
      "Search opportunities and move through your applications with a clear process.",
    icon: Briefcase,
  },
  {
    number: "03",
    title: "Track",
    description:
      "Keep up with jobs applied for, follow-ups, and progress in one organized dashboard.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Interview",
    description:
      "Prepare with structured tools and career guidance so you can show up ready.",
    icon: MessageSquare,
  },
  {
    number: "05",
    title: "Learn",
    description:
      "Grow with career articles, insights, and guidance from the CareerOS blog.",
    icon: BookOpen,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white px-6 py-20 lg:py-28">
      <SectionGridBackground opacity="0.025" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xl font-bold uppercase  text-red-600">
            How{" "}
            <span className="font-black uppercase tracking-tighter text-slate-900">
              Career <span className="text-red-700"> OS</span>
            </span>
          </p>

          <h2 className="text-4xl font-black tracking-tighter text-black sm:text-5xl lg:text-6xl">
            One system for every step of your next move.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            CareerOS helps you build stronger applications, stay organized, and
            prepare with confidence from first draft to final interview.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex items-start justify-between">
                  <div className="inline-flex rounded-2xl bg-red-50 p-3 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-black">
                    {step.title}
                  </h3>
                  {/* <span className="text-xs font-black tracking-[0.2em] text-neutral-300">
                    {step.number}
                  </span> */}
                </div>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {step.description}
                </p>

                {/* <div className="mt-6 h-1 w-12 rounded-full bg-red-600 transition-all duration-200 group-hover:w-20" /> */}
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton asChild className="h-14 px-10 text-base font-bold">
            <Link href="/sign-up">Get Started Free</Link>
          </PrimaryButton>

          <OutlineButton href="/blog">Explore Career Tips</OutlineButton>
        </div>
      </div>
    </section>
  );
}
