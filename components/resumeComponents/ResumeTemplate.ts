// app/resumeBuilder/ResumeTemplate.ts

export interface ResumeTemplate {
  title: string;
  image: string;
  href: string;
  description: string[];
  resumeType: string; // Corrected to resumeType
}

// ✅ Resume Templates Data
export const resumeTemplates: ResumeTemplate[] = [
  {
    title: "Federal Resume",
    image: "/fed.png",
    href: "/resumeBuilder/federalResume",
    description: [
      "Used For: Government jobs and civil service positions.",
      "Key Features: Detailed job history, duties, accomplishments.",
      "Style: Formal, structured, follows federal hiring rules.",
    ],
    resumeType: "federal", // Corrected to resumeType
  },
  {
    title: "Chronological Resume",
    image: "/chron.png",
    href: "/resumeBuilder/chronologicalResume",
    description: [
      "Used For: Job seekers with solid work history.",
      "Key Features: Lists experience in reverse order.",
      "Style: Clean, professional, and easy to read.",
    ],
    resumeType: "chronological", // Corrected to resumeType
  },
  {
    title: "Functional Resume",
    image: "/interview.jpg",
    href: "/resumeBuilder/functionalResume",
    description: [
      "Used For: Career changers or employment gaps.",
      "Key Features: Focuses on skills over job history.",
      "Style: Structured by skill categories.",
    ],
    resumeType: "functional", // Corrected to resumeType
  },
  {
    title: "Combination Resume",
    image: "/combo.png",
    href: "/resumeBuilder/combinationResume",
    description: [
      "Used For: Experienced professionals.",
      "Key Features: Mix of skills and work experience.",
      "Style: Best of both worlds—skills & timeline.",
    ],
    resumeType: "combination", // Corrected to resumeType
  },
];
