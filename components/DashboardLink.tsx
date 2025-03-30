"use client";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import LinksDropdown from "./LinksDropdown";

export function DashboardLinks() {
  const { user } = useUser(); // Get user data from Clerk

  return (
    <>
      <h1 className="text-xl text-primary mx-auto mb-4">
        Welcome, {user?.firstName || "User"}
      </h1>
      <Button
        className="rounded-full flex mx-auto mb-10 w-40 h-40 overflow-hidden p-0 border"
        variant="outline"
        size="lg">
        {user?.imageUrl ? (
          <Image
            priority
            src={user.imageUrl}
            alt="User Profile Picture"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </Button>
      <LinksDropdown />
    </>
  );
}
