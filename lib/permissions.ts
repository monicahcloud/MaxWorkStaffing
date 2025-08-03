import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    "7Day": 3,
    quarterly: Infinity,
    free: 1,
    monthly: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canCreateLetter(
  subscriptionLevel: SubscriptionLevel,
  currentLetterCount: number
) {
  const maxLetterMap: Record<SubscriptionLevel, number> = {
    free: 1,
    quarterly: Infinity,
    monthly: Infinity,
    "7Day": 3,
  };

  const maxLetters = maxLetterMap[subscriptionLevel];

  return currentLetterCount < maxLetters;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel == "free" || "7Day" || "quarterly" || "monthly";
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "free" || "7Day" || "quarterly" || "monthly";
}

export function canUseResume(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "free" || "7Day" || "quarterly" || "monthly";
}
