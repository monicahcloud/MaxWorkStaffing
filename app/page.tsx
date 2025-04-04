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
import logo from "../assets/maxworklogo.png";
import { Button } from "@/components/ui/button";
// import LandingImg from "../assets/LandingImg.jpg";
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
    <main className="">
      <header className="max-w-2xl mx-auto md:px-4 px-8 py-6">
        <Image src={logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto md:px-4 px-8 h-screen -mt-10 items-center">
        <div>
          {/* <Image
            src={LandingImg}
            alt="landing page image"
            className="hidden md:block rounded-xl max-w-2xl mx-auto px-8 pt-20 items-center shadow-sm"
            priority
          /> */}
          <div className="flex h-screen w-full items-center justify-center -mt-50 px-4">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center whitespace-nowrap">
                  Welcome To Your
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-4 text-2xl text-black items-center">
                  <h1 className="capitalize text-4xl md:text-7xl font-bold text-center my-3">
                    Client <span className="text-red-700">Portal</span>
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    <Button asChild className="mt-4">
                      <Link href="/sign-in">Let&apos;s Get Started</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
