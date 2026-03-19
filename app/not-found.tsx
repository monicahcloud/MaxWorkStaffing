"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import dog404 from "../assets/dog404.svg";

export default function NotFoundPage() {
  const { isSignedIn, isLoaded } = useUser();

  // Prevent flicker while Clerk loads
  if (!isLoaded) return null;

  const redirectHref = isSignedIn ? "/" : "/";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-6 text-center">
      {/* Image */}
      <Image
        src={dog404}
        alt="Page not found illustration"
        width={200}
        height={200}
        className="mb-6"
        priority
      />

      {/* Heading */}
      <h1 className="mb-2 text-4xl font-black uppercase tracking-tight text-red-600">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mb-4 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Support (mailto) */}
      <p className="mb-6 text-sm text-muted-foreground">
        Try refreshing the page or{" "}
        <a
          href="mailto:support@careeros.app"
          className="font-bold text-red-600 underline hover:text-black">
          contact support
        </a>{" "}
        if the problem continues.
      </p>

      {/* Dynamic Button */}
      <Button asChild>
        <Link href={redirectHref}>
          {isSignedIn ? "Go to Dashboard" : "Back to Home"}
        </Link>
      </Button>
    </div>
  );
}
