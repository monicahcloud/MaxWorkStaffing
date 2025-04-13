"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CardDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "../assets/logo.png";
import LandingImg from "../assets/LandingImg.jpg"; // Uncomment or replace with your actual image
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to /home
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/home");
    }
  }, [isSignedIn, isLoaded, router]);

  // Prevent rendering until auth state is loaded
  if (!isLoaded || isSignedIn) return null;

  return (
    <main className="">
      {/* Header with logo */}
      <header className="max-w-2xl mx-auto px-8 py-4">
        <Image src={logo} alt="logo" priority />
      </header>

      {/* Two-column layout section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-10 min-h-[calc(100vh-250px)]">
        {/* Left column - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={LandingImg}
            alt="Landing page visual"
            className="rounded-xl shadow-lg w-full max-w-md"
            priority
          />
        </div>

        {/* Right column - Card */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center whitespace-nowrap">
                Welcome To Your
              </CardTitle>
              <CardDescription />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4 text-2xl text-black items-center">
                <h1 className="capitalize text-4xl md:text-6xl font-bold text-center my-3">
                  Client <span className="text-red-700">Portal</span>
                </h1>
                <Button asChild className="mt-4">
                  <Link href="/sign-in">Let&apos;s Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
