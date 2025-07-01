import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    trial: Infinity,
    annual: Infinity,
    free: 0,
    "14Day": Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel == "trial" || "annual" || "monthly";
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "trial" || "annual" || "monthly";
}

export function canUseResume(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "trial" || "annual" || "monthly";
}
