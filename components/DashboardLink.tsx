"use client";

import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import LinksDropdown from "./LinksDropdown";
import { User as UserIcon } from "lucide-react"; // Lucide User icon

export function DashboardLinks() {
  const { user } = useUser(); // Get user data from Clerk

  return (
    <>
      {/* Replace dynamic name with static fallback */}
      <div className="flex mx-auto justify-center items-center text-center mb-4">
        <h1 className="text-3xl font-extrabold text-blue-900 capitalize">
          Welcome, {user?.firstName || user?.username || "User"}{" "}
          {user?.lastName || ""}
        </h1>
      </div>

      <Button
        className="rounded-full flex items-center justify-center mx-auto mb-10 w-40 h-40 overflow-hidden p-0 border"
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
          <UserIcon className="w-16 h-16 text-muted-foreground" />
        )}
      </Button>

      <LinksDropdown />
    </>
  );
}
