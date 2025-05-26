"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function FirstTimeModal({
  openOnLoad,
  userId,
}: {
  openOnLoad: boolean;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const username = user?.firstName || "there";

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
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
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
      <DialogTitle />
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="bg-red-300 p-6 flex justify-center">
          <Image src={Logo} alt="Logo" width={240} height={80} />
        </div>
        <div className="px-6 py-8 text-center">
          <h3 className="text-xl text-gray-700 mb-1">
            Hi, <strong>{username}</strong>
          </h3>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Welcome to your dashboard!
          </h2>
          <p className="text-lg text-gray-700 mb-6">From here, you can:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-800">
            {features.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-2xl">{item.icon}</div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <Button
            className="mt-10 bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full text-lg"
            onClick={() => handleClose(false)}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
