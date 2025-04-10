"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";

function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button onClick={() => premiumModal.setOpen(true)}>
      Get Premium Subscription
    </Button>
  );
}

export default GetSubscriptionButton;
