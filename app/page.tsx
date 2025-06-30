"use client";

import { Hero } from "@/components/landingPage/Hero";
// import { NavBar } from "@/components/landingPage/NavBar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <header>
        <NavBar />
      </header> */}
      <main>
        <Hero />
      </main>
    </div>
  );
}
