import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Your Free Account
        </h1>
        <p className="text-gray-600 mt-2">
          Start building job-winning resumes and cover letters today.
        </p>
        <ul className="text-sm text-gray-500 mt-4 space-y-1">
          <li>✓ Access powerful resume and cover letter tools</li>
          <li>✓ Track your job applications with ease</li>
          <li>✓ Get interview-ready with A.I.-powered practice</li>
        </ul>
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-red-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Clerk Sign Up */}
      <div className="w-full max-w-md rounded-xl shadow-lg bg-white p-6">
        <SignUp />
      </div>

      {/* Back to site */}
      <div className="mt-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline text-red-500">
          ← Back to MaxWork overview
        </Link>
      </div>
    </main>
  );
}
