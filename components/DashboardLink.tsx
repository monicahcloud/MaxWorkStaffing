"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { User as UserIcon, ShieldCheck } from "lucide-react";

import { SubscriptionLevel } from "@/lib/subscription";
import { GroupedSidebarLinks } from "@/utils/links";

interface DashboardLinksProps {
  userStats?: {
    level: SubscriptionLevel;
    interviewCount: number;
    resumeCount: number;
    letterCount: number;
  };
}

export function DashboardLinks({ userStats }: DashboardLinksProps) {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center h-full">
      {/* Profile Image Section */}
      <div className="relative group mb-6 shrink-0">
        <div className="absolute -inset-1 bg-blue-600 rounded-full blur opacity-0 group-hover:opacity-10 transition duration-500"></div>

        <div className="relative h-32 w-32 rounded-full border-2 border-slate-100 p-1 bg-white">
          <div className="h-full w-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            ) : (
              <UserIcon className="w-8 h-8 text-slate-400" />
            )}
          </div>

          <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 border-2 border-white shadow-sm">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="text-center mb-8 shrink-0">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-1">
          Identity Verified
        </p>
        <h2 className="text-[16px] font-black text-slate-900 uppercase tracking-tight leading-tight">
          {user?.firstName || user?.username || "User"}
        </h2>
        <p className="text-[11px] text-slate-400 font-bold lowercase truncate max-w-[180px]">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      {/* Navigation Links & Usage Tracker */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar">
        <GroupedSidebarLinks userStats={userStats} />
      </div>
    </div>
  );
}
