import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"; // Adjust path as needed
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Branding (Visible only on LG+) */}
      <div className="hidden lg:flex flex-col justify-between bg-black p-12 text-white relative overflow-hidden">
        {/* Decorative Red Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />

        <Link href="/">
          <Image
            src={logo}
            alt="MaxResumeBuilder"
            width={180}
            height={45}
            className="invert brightness-0"
          />
        </Link>

        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Back, Professional</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
            Resume <br />
            <span className="text-red-600">Intelligence</span> <br />
            Awaits.
          </h2>
          <p className="text-slate-400 font-medium max-w-sm">
            Sign in to access your command center, track your applications, and
            optimize your career trajectory.
          </p>
        </div>

        <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          © 2026 MaxResumeBuilder.com
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-8">
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
              Sign In
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              New here?{" "}
              <Link
                href="/sign-up"
                className="text-red-600 font-bold hover:underline">
                Create an account for free
              </Link>
            </p>
          </div>

          <div className="w-full bg-white">
            <SignIn
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
