// app/(dashboard)/DashboardLayoutClient.tsx
"use client";

import { useState, PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.png";
// import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Toaster } from "sonner";
import { UserButton } from "@clerk/nextjs";
import { DashboardLinks } from "@/components/DashboardLink";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import PremiumModal from "@/components/premium/PremiumModal";
import FirstTimeModal from "@/components/FirstTimeModal";
import MainFooter from "@/components/MainFooter";
import { UserProgressProvider } from "@/components/UserProgressContext";
import { GroupedSidebarLinks } from "@/utils/links";
import { SubscriptionLevel } from "@/lib/subscription";

interface DashboardLayoutClientProps extends PropsWithChildren {
  shouldShowModal: boolean;
  userSubscriptionLevel: string;
  userStats: {
    // NEW INTERFACE ADITION
    level: SubscriptionLevel;
    resumeCount: number;
    letterCount: number;
    interviewCount: number;
  };
}

export default function DashboardLayoutClient({
  children,
  shouldShowModal,
  userSubscriptionLevel,
  userStats, // DESTRUCTURE STATS
}: DashboardLayoutClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <SubscriptionLevelProvider
      userSubscriptionLevel={userSubscriptionLevel as SubscriptionLevel}>
      <UserProgressProvider>
        <main className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
          <aside className="hidden border-r bg-white md:block">
            <div className="flex h-full flex-col gap-4">
              <div className="h-16 flex items-center border-b border-slate-100 px-6">
                <Link href="/home">
                  <Image
                    src={Logo}
                    alt="Logo"
                    priority
                    width={160}
                    height={40}
                    className="brightness-0"
                  />
                </Link>
              </div>

              {/* DESKTOP NAVIGATION */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
                {/* PASS STATS HERE */}
                <DashboardLinks userStats={userStats} />
              </nav>

              <div className="p-4 mt-auto border-t border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    AI Engine: Active
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex flex-col ">
            <header className="flex h-14 items-center gap-4 px-4 border-b bg-muted/40 lg:h-15 lg:px-6">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTitle></SheetTitle>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col h-full">
                  <nav className="grid gap-2 mt-15 flex-1 overflow-y-auto">
                    {/* MOBILE NAVIGATION - PASS STATS HERE TOO */}
                    <GroupedSidebarLinks
                      onLinkClick={() => setOpen(false)}
                      userStats={userStats}
                    />
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="ml-auto flex items-center gap-4">
                {/* <ThemeToggle /> */}
                <UserButton
                  appearance={{
                    elements: { avatarBox: { width: 35, height: 35 } },
                  }}
                />
              </div>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
              {children}
              <FirstTimeModal openOnLoad={shouldShowModal} />
              <PremiumModal />
            </main>
          </div>
        </main>
        <MainFooter />
        <Toaster richColors closeButton theme="light" />
      </UserProgressProvider>
    </SubscriptionLevelProvider>
  );
}
