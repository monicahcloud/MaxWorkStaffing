"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WandSparkles } from "lucide-react";
import { generateDuties } from "./action";
import usePremiumModal from "@/hooks/usePremiumModal";
// import { ResumeValues } from "@/lib/validation";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import LoadingButton from "@/components/LoadingButton";
import { canUseAITools } from "@/lib/permissions";

interface GenerateDutiesButtonProps {
  jobTitle: string;
  onDutiesGenerated: (duties: string) => void;
}

export default function GenerateDutiesButton({
  jobTitle,
  onDutiesGenerated,
}: GenerateDutiesButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!canUseAITools(subscriptionLevel)) {
      toast.error("Upgrade your subscription to use this feature");
      premiumModal.setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const duties = await generateDuties({ jobTitle });
      onDutiesGenerated(duties);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate duties.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}>
      <WandSparkles className="size-4" />
      Generate Duties (AI)
    </LoadingButton>
  );
}
