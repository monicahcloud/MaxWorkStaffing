import { toast } from "sonner";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { generateSummary } from "./action";
import LoadingButton from "@/components/LoadingButton";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  category: string;
  onSummaryGenerated: (summary: string) => void; //callback
}

export default function GenerateSummaryButton({
  resumeData,
  category,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
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
      const aiResponse = await generateSummary({ ...resumeData, category });
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
      <WandSparkles className="size-4" />
      Generate (AI) Suggestion
    </LoadingButton>
  );
}
