/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/ai-design-selector.ts

export const generateDesignPrompt = (resumeData: any) => {
  return `
    SYSTEM: You are an expert Resume Designer at MaxResumeBuilder.com.
    TASK: Based on the User's Resume Data, select the best Design Token.

    USER DATA SUMMARY:
    - Industry: ${resumeData.industry || "General"}
    - Job Title: ${resumeData.jobTitle}
    - Content Density: ${resumeData.workExperiences.length} jobs, ${
    resumeData.skills.length
  } skills.

    DESIGN REGISTRY:
    - Layouts: "top-header" (Best for high content), "sidebar-left" (Best for medium content), "minimal-grid" (Best for low content/entry-level).
    - Palettes: [Reference your ColorPalettes keys: "executive-navy", "saas-indigo", "medical-teal", etc.]
    - Fonts: "professional" (Sans/Roboto), "traditional" (Serif/Source), "technical" (Mono/Inter).

    INSTRUCTIONS:
    1. If the user has >5 jobs, prioritize "top-header" for space efficiency.
    2. Match the Palette to the Industry (e.g., "executive-navy" for Finance/Law, "cyber-lime" for Creative/Dev).
    3. Return ONLY a JSON object in this format:
    {
      "layout": "string",
      "paletteId": "string",
      "fontId": "string"
    }
  `;
};
