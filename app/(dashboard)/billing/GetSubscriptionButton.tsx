"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";

function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button
      className="flex mx-auto text-2xl p-6 uppercase bg-blue-800 rounded-xl items-center justify-center"
      onClick={() => premiumModal.setOpen(true)}>
      Continue
    </Button>
  );
}

export default GetSubscriptionButton;
