import { StaticImageData } from "next/image";
// import federal from "../../../assets/federal.png";
// import functional from "../../../assets/functional.png";
// import combination from "../../../assets/combination.png";
import chronological from "../../../assets/chronological.png";
export interface ResumeTemplate {
  title: string;
  image: string | StaticImageData;
  href: string;
  description: string[];
  resumeType: string;
}

//  Resume Templates Data
export const resumeTemplates: ResumeTemplate[] = [
  // {
  //   title: "Federal Resume",
  //   image: federal,
  //   href: "/editor",
  //   description: [
  //     "Ideal for government jobs with strict formatting. Emphasizes detailed job history and accomplishments.",
  //   ],
  //   resumeType: "federal",
  // },
  {
    title: "Chronological Resume",
    image: chronological,
    href: "/editor",
    description: [
      "Best for steady work history. Lists experience in reverse order with a clean, professional look.",
    ],
    resumeType: "chronological",
  },
  // {
  //   title: "Functional Resume",
  //   image: functional,
  //   href: "/editor",
  //   description: [
  //     "Great for career changers or gaps. Focuses on skills rather than job timelines.",
  //   ],
  //   resumeType: "functional",
  // },
  // {
  //   title: "Combination Resume",
  //   image: combination,
  //   href: "/editor",
  //   description: [
  //     "Blends work experience and skills. Suitable for seasoned professionals who want the best of both worlds.",
  //   ],
  //   resumeType: "combination",
  // },
];
