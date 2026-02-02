import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-black p-12 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />

        <Link href="/">
          <Image
            src={logo}
            alt="MaxResumeBuilder"
            width={180}
            height={45}
            className="invert brightness-0"
          />
        </Link>

        <div className="space-y-8 relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
            Build the <br />
            <span className="text-red-600">Unfair</span> <br />
            Advantage.
          </h2>

          <ul className="space-y-4">
            {[
              "AI-Engineered Resumes",
              "Real-time Job Tracking",
              "AI Interview Simulation",
              "Expert Career Resources",
            ].map((text) => (
              <li
                key={text}
                className="flex items-center gap-3 font-bold uppercase text-xs tracking-widest text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-red-600" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          Join 50,000+ professionals.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-8 text-center">
            <Image
              src={logo}
              alt="MaxResumeBuilder"
              width={140}
              height={35}
              className="mx-auto"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-red-600 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="w-full">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-red-600 hover:bg-black text-sm uppercase tracking-widest font-black transition-all",
                  card: "shadow-none border-none p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border-slate-200 hover:bg-slate-50 font-bold text-slate-600",
                  footerAction: "hidden",
                },
              }}
            />
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-widest">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
