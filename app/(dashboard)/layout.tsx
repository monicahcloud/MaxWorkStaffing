export const dynamic = "force-dynamic";

import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Logo from "../../assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";
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
import LinksDropdown from "@/components/LinksDropdown";
import { DashboardLinks } from "@/components/DashboardLink";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import PremiumModal from "@/components/premium/PremiumModal";
import FirstTimeModal from "@/components/FirstTimeModal";
import MainFooter from "@/components/MainFooter";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { getUserMetadata, markUserAsReturning } from "@/lib/user";
import { Metadata } from "next";
import { UserProgressProvider } from "@/components/UserProgressContext";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboardlayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch metadata and subscription level in parallel
  const [isFirstTimeUser, userSubscriptionLevel] = await Promise.all([
    getUserMetadata(userId),
    getUserSubscriptionLevel(userId),
  ]);

  // Decide whether to show the modal
  let shouldShowModal = false;

  if (isFirstTimeUser) {
    shouldShowModal = true;
    await markUserAsReturning(userId); // ✅ Mark BEFORE using the flag
  }

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <UserProgressProvider>
        <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
          {/* Sidebar */}
          <aside className="hidden border-r bg-muted/40 md:block">
            <div className="flex flex-col  gap-2 ">
              <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/home" className="flex items-center  ">
                  <Image
                    src={Logo}
                    alt="Logo"
                    priority
                    width={400}
                    height={400}
                    className="px-4 my-2"
                  />
                </Link>
              </div>
              <nav className="flex-1 grid items-start text-white text-sm font-medium mt-20 px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex flex-col">
            {/* Header */}
            <header className="flex h-14 items-center gap-4 px-4 border-b bg-muted/40 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTitle />
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
                  <nav className="grid gap-2 mt-15">
                    <LinksDropdown />
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
                <UserButton
                  appearance={{
                    elements: { avatarBox: { width: 35, height: 35 } },
                  }}
                />
              </div>
            </header>

            {/* Body */}
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

export default Dashboardlayout;
