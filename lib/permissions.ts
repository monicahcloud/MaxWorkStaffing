// lib/permissions.ts
import { SubscriptionLevel } from "./subscription";

/**
 * Checks if a user can create another resume based on their subscription tier.
 * Free: 1 | 7-Day: 3 | Monthly/Quarterly: Unlimited
 */
export function canCreateResume(
  level: SubscriptionLevel,
  currentCount: number,
) {
  const limits: Record<SubscriptionLevel, number> = {
    free: 1,
    "7Day": 3,
    monthly: Infinity,
    quarterly: Infinity,
  };
  return currentCount < limits[level];
}

/**
 * Checks if a user can create another cover letter based on their subscription tier.
 * Free: 1 | 7-Day: 3 | Monthly/Quarterly: Unlimited
 */
export function canCreateLetter(
  level: SubscriptionLevel,
  currentCount: number,
) {
  const limits: Record<SubscriptionLevel, number> = {
    free: 1,
    "7Day": 3,
    monthly: Infinity,
    quarterly: Infinity,
  };
  return currentCount < limits[level];
}

/**
 * The "Paywall Gate": Determines if a user can Download, Print, or Email a document.
 * Access is denied for users on the "free" tier.
 */
export function canExportDocument(level: SubscriptionLevel) {
  return level !== "free";
}

/**
 * AI Mock Interview Logic.
 * Free: 0 sessions
 * 7Day: 1 session total (one-time taste of the tech)
 * Monthly/Quarterly: 20 sessions (High cap to manage API costs)
 */
export function canUseMockInterview(
  level: SubscriptionLevel,
  sessionCount: number,
) {
  if (level === "free") return false;

  if (level === "7Day") {
    return sessionCount < 1;
  }

  if (level === "monthly" || level === "quarterly") {
    return sessionCount < 20;
  }

  return false;
}

/**
 * Determines if AI generation tools (summary, duties, etc.) are available in the editor.
 * We allow this for everyone so they see the value of the AI,
 * but they must pay (canExportDocument) to get the final PDF.
 */
export function canUseAITools(level: SubscriptionLevel) {
  return true;
}

/**
 * Determines if premium customizations (theme colors, specific federal layouts) are available.
 */
export function canUseCustomizations(level: SubscriptionLevel) {
  return level !== "free";
}
