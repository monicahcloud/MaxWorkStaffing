// lib/cover-letter-utils.ts
import { CoverLetterValues } from "@/lib/validation";

export function calculateLetterStrength(data: CoverLetterValues): number {
  let score = 0;

  // 1. Recipient Personalization (20 pts)
  if (data.recipientName && data.recipientName.length > 2) score += 10;
  if (data.companyName && data.companyName.length > 2) score += 10;

  // 2. Content Length Check (30 pts)
  // Strip HTML tags from Tiptap editor to get raw word count
  const rawText = data.body?.replace(/<[^>]*>/g, "") || "";
  const wordCount = rawText.trim().split(/\s+/).length;

  if (wordCount > 150 && wordCount < 400) score += 30; // Ideal length
  else if (wordCount > 50) score += 15;

  // 3. Structural Elements (30 pts)
  if (data.body?.includes("<ul>") || data.body?.includes("<ol>")) score += 10; // Bullet points for readability
  if (data.signatureUrl) score += 10; // Professional signature
  if (data.jobTitle) score += 10; // Clear target role

  // 4. Contact Info Verification (20 pts)
  if (data.userEmail && data.userPhone) score += 20;

  return Math.min(score, 100);
}
