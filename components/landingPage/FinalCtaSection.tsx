"use client";

import Link from "next/link";
import { PrimaryButton } from "./PrimaryButton";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 text-center md:p-20">
          <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-white md:text-7xl">
              Ready to land that dream job  <br />
              <span className="text-red-600">or your next promotion?</span>
            </h2>

            <p className="mx-auto max-w-xl text-lg font-medium text-slate-400">
              Join thousands of professionals securing interviews with CareerOS.
            </p>

            <PrimaryButton
              asChild
              className="h-16 px-12 text-xl font-bold uppercase tracking-widest">
              <Link href="/sign-up">Create Account Free</Link>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
