export const dynamic = "force-dynamic";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Image from "next/image";
import Logo from "../../assets/maxworklogo.png";
import LinksDropdown from "@/components/LinksDropdown";
import { DashboardLinks } from "@/components/DashboardLink";
import { UserButton } from "@clerk/nextjs";
import PremiumModal from "@/components/premium/PremiumModal";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

async function Dashboardlayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/home" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" priority />
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start text-white lg:px-4 px-2 text-sm font-medium mt-20">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-14 items-center gap-4 px-4 border-b bg-muted/40 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid-2 gap-2 mt-10">
                  <LinksDropdown />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center ml-auto gap-4">
              <ThemeToggle />
              <UserButton
                appearance={{
                  elements: { avatarBox: { width: 35, height: 35 } },
                }}
              />
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
            {children}
            <PremiumModal />
          </main>
        </div>
      </main>
      <Toaster richColors closeButton theme="light" />
    </SubscriptionLevelProvider>
  );
}

export default Dashboardlayout;
