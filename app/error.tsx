"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import serverdown from "../assets/serverdown.svg";
export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("An unexpected error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-6 text-center">
      {/* 🔺 Error Image */}
      <Image
        src={serverdown} // Change this path to your image
        alt="Error Illustration"
        width={200}
        height={200}
        className="mb-6"
        priority
      />

      <h1 className="text-4xl font-bold text-destructive mb-2">
        Something Went Wrong
      </h1>
      <p className="text-muted-foreground mb-4">
        An unexpected error occurred. It’s not you — it’s us.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Try refreshing the page. If that doesn’t work,{" "}
        <Link href="/support" className="underline text-primary">
          contact customer support
        </Link>
        .
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>

        <Button variant="secondary" asChild>
          <Link href="/home">Go Back</Link>
        </Button>
      </div>
    </div>
  );
}
