"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import {
//   CardDescription,
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
import Image from "next/image";
import logo from "../assets/logo.png";
import LandingImg from "../assets/landingpage.png";
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

  if (!isLoaded || isSignedIn) return null;

  return (
    <main className="h-screen w-full flex flex-col">
      {/* Header with logo */}
      <header className="max-w-2xl mx-auto px-8 py-4">
        <h1 className="text-3xl text-center whitespace-nowrap">
          Welcome To Your
        </h1>
        <h1 className="capitalize text-5xl md:text-6xl font-bold text-center my-3">
          Client <span className="text-red-700">Portal</span>
        </h1>
      </header>

      {/* Full height two-column section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center  px-4 ">
        {/* Left column - Image */}
        <div className="w-full  h-full flex items-center justify-center">
          <Image
            src={LandingImg}
            alt="Landing page visual"
            className="rounded-xl shadow-lg w-full md:max-w-lg lg:max-w-xl  max-w-md object-contain"
            priority
            style={{
              transform: "rotate(-8deg)", // tilt counter-clockwise (use positive for clockwise)
            }}
          />
        </div>

        {/* Right column - Card */}
        <div className="w-full  h-full flex items-center justify-center">
          {/* <Card className="w-full max-w-md">
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
          </Card> */}
          <div className="w-full  h-full flex items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              priority
              className="md:max-w-lg lg:max-w-xl  max-w-md "
            />
            <div>
              <Button asChild className="mt-4">
                <Link href="/sign-in">Let&apos;s Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
