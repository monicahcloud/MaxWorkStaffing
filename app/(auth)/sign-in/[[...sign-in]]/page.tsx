import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 mt-2">
          Sign in to continue your job journey
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-red-600 hover:underline">
            Sign up free
          </Link>
        </p>
      </div>

      {/* Clerk Sign In */}
      <div className="w-full max-w-md rounded-xl shadow-lg bg-white p-6">
        <SignIn />
      </div>

      {/* Back to site */}
      <div className="mt-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline text-red-500">
          ← Back to MaxResumeBuilder overview
        </Link>
      </div>
    </main>
  );
}
