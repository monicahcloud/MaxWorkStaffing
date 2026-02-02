"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dog404 from "../assets/dog404.svg";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-6 text-center">
      {/* 🖼 Top Image */}
      <Image
        src={dog404} // Update this path to your image location
        alt="404 Not Found"
        width={200}
        height={200}
        className="mb-6"
        priority
      />

      <h1 className="text-4xl font-bold text-destructive mb-2">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mb-4">
        The page you’re looking for doesn’t exist. It might have been moved or
        deleted.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Try refreshing the page or{" "}
        <Link href="/support" className="underline text-primary">
          contact customer support
        </Link>{" "}
        if the problem continues.
      </p>
      <Button asChild>
        <Link href="/home">Go Back</Link>
      </Button>
    </div>
  );
}
