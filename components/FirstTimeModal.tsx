"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
// import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export default function FirstTimeModal({
  openOnLoad,
}: {
  openOnLoad: boolean;
}) {
  const [open, setOpen] = useState(false);
  // const { user } = useUser();
  // const username = user?.firstName || "there";

  // Trust the openOnLoad prop and show modal
  useEffect(() => {
    if (openOnLoad) {
      setOpen(true);
    }
  }, [openOnLoad]);

  const handleClose = async (nextOpen: boolean) => {
    setOpen(nextOpen);

    // Only mark as returning when user closes the modal
    if (!nextOpen && openOnLoad) {
      try {
        await fetch("/api/user/mark-returning", {
          method: "POST",
          // body: JSON.stringify({ userId }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
      } catch (error) {
        console.error("Failed to update user first-time status", error);
      }
    }
  };

  const features = [
    { icon: "🤖", text: "Use our A.I. to help build your resume" },
    { icon: "📧", text: "Download or email your resume" },
    { icon: "📊", text: "Track your job application status" },
    { icon: "🎤", text: "Prep for upcoming interviews" },
    { icon: "✍️", text: "Create a custom cover letter in minutes" },
    { icon: "🌐", text: "Search for jobs" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle className="hidden" />
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[2rem] border-none bg-white shadow-2xl">
        {/* Top Header - Pure Black */}
        <div className="bg-black p-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl rounded-full" />
          <Image
            src={Logo}
            alt="Logo"
            width={180}
            height={60}
            className="invert brightness-0 relative z-10"
          />
        </div>

        <div className="px-10 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Access Granted
          </div>
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-none mb-6">
            Welcome to the <br />{" "}
            <span className="text-red-600">Command Center.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mt-10">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-xl border border-slate-100 hover:border-red-100 transition-colors">
                <div className="text-2xl grayscale group-hover:grayscale-0">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-slate-700 uppercase tracking-tight leading-tight">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <Button
            className="mt-12 bg-red-600 hover:bg-black text-white px-12 py-6 rounded-xl text-lg font-black uppercase tracking-widest shadow-xl shadow-red-200 transition-all"
            onClick={() => handleClose(false)}>
            Initialize Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
