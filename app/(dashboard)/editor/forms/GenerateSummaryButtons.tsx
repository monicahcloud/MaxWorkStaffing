import { toast } from "sonner";
// import usePremiumModal from "@/hooks/usePremiumModal";
// import { canUseAITools } from "@/lib/permissions";
// import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { ResumeValues } from "@/lib/validation";
import { Brain } from "lucide-react";
import { useState } from "react";

import { generateSummary } from "./action";
import LoadingButton from "@/components/LoadingButton";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  // const subscriptionLevel = useSubscriptionLevel();
  // const premiumModal = usePremiumModal();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // if (!canUseAITools(subscriptionLevel)) {
    //   toast.error("Upgrade your subscription to use this feature");
    //   premiumModal.setOpen(true);
    //   return;
    // }

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
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
      <Brain className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
