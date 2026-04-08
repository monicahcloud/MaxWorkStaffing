import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mappings } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const interviewCoverMap: Record<string, string[]> = {
  Technology: ["/coding.jpg", "/technology.jpg"],
  Healthcare: ["/healthcare.jpg", "/ambulance.jpg"],
  Finance: ["/finance1.png", "/finance2.png"],
  Education: ["/education1.png", "/education2.png"],
  Marketing: ["/marketing1.png", "/marketing2.png"],
  Sales: ["/sales1.png", "/sales2.png"],
  Operations: ["/operations1.png"],
  "Human Resources": ["/hr1.png", "/hr2.png"],
  "Customer Service": ["/customer1.png", "/customer2.png"],
  General: ["/ambulance.jpg", "/general2.png"],
  Administrative: ["/admin1.png", "/admin2.png"],
  Legal: ["/legal1.png", "/legal2.png"],
  Retail: ["/retail1.png", "/retail2.png"],
  Hospitality: ["/hospitality1.png", "/hospitality2.png"],
  Other: ["/ambulance.jpg", "/general2.png"], // fallback
};

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    })),
  );

  return results;
};

// export const getRandomInterviewCover = () => {
//   const randomIndex = Math.floor(Math.random() * interviewCovers.length);
//   return `/covers${interviewCovers[randomIndex]}`;
// };

export const getInterviewCover = (industry?: string) => {
  const normalizedIndustry = industry?.toLowerCase().trim();

  if (!normalizedIndustry) {
    return getRandomFromCategory("general");
  }

  const matchedCategory = Object.keys(interviewCoverMap).find((key) =>
    normalizedIndustry.includes(key),
  );

  return getRandomFromCategory(matchedCategory || "general");
};

const getRandomFromCategory = (category?: string) => {
  // fallback safety
  const safeCategory =
    category && interviewCoverMap[category] ? category : "Other";

  const covers = interviewCoverMap[safeCategory];

  // extra guard (prevents crashes completely)
  if (!covers || covers.length === 0) {
    console.error("No covers found for category:", category);
    return "/covers/general1.png"; // guaranteed fallback
  }

  const randomIndex = Math.floor(Math.random() * covers.length);

  return `/covers${covers[randomIndex]}`;
};
