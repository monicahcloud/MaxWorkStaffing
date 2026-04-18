import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const benefits = [
  "Build polished resumes and cover letters",
  "Track jobs and application progress",
  "Prepare for interviews with confidence",
  "Access career insights and resources",
];

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-black text-white lg:flex">
        <div className="absolute -bottom-30 -left-30 h-80 w-80 rounded-full bg-red-600/20 blur-[120px]" />
        <div className="absolute -right-25 -top-25 h-72 w-72 rounded-full bg-red-700/10 blur-[100px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
          <div className="max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Start Strong</span>
            </div>

            <div className="space-y-5">
              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter xl:text-6xl">
                Build your
                <br />
                next move with
                <br />
                <span className="text-red-600">CareerOS</span>
              </h2>

              <p className="max-w-md text-base font-medium leading-7 text-slate-300 xl:text-lg">
                Create your account to build career assets, manage applications,
                prepare for interviews, and stay organized every step of the
                way.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            © 2026 CareerOS
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link
              href="/"
              aria-label="Go to CareerOS homepage"
              className="inline-flex w-full justify-center">
              <Image
                src="/CareerOSLogo.png"
                alt="CareerOS"
                width={150}
                height={38}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          <div className="mb-8 space-y-3 text-center lg:text-left">
            <Link
              href="/"
              aria-label="Go to CareerOS homepage"
              className="inline-flex">
              <Image
                src="/CareerOSLogo.png"
                alt="CareerOS"
                width={180}
                height={45}
                className="h-auto w-auto"
                priority
              />
            </Link>

            <h1 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
              Create your account
            </h1>

            <p className="text-sm font-medium leading-6 text-slate-500 sm:text-base">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-red-600 transition-colors hover:text-black hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.12)] sm:p-6">
            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  formButtonPrimary:
                    "bg-red-600 hover:bg-black text-sm uppercase tracking-[0.14em] font-black transition-colors",
                  formFieldInput:
                    "h-11 rounded-xl border-slate-200 focus:border-red-600 focus:ring-red-600",
                  formFieldLabel: "text-slate-700 font-bold text-sm",
                  socialButtonsBlockButton:
                    "h-11 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50",
                  socialButtonsBlockButtonText: "font-bold",
                  dividerLine: "bg-slate-200",
                  dividerText:
                    "text-xs font-bold uppercase tracking-[0.14em] text-slate-400",
                  footerAction: "hidden",
                  identityPreviewText: "text-slate-700",
                  formResendCodeLink: "text-red-600 hover:text-black",
                  otpCodeFieldInput:
                    "h-11 rounded-xl border-slate-200 focus:border-red-600 focus:ring-red-600",
                },
              }}
            />
          </div>

          <div className="mt-6 text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-red-600">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
