"use client";

import ResourceCategories from "./ResourceCategories";
import SectionWithVideoModal from "./SectionWithVideoModal";
import TypesofInterviews from "./TypesofInterviews";

/* ── Poster thumbnails ────────────────────────────── */
import interviewPoster from "../../../assets/questionsthumb.png";
import resumePoster from "../../../assets/resumesthumb.png";
import questionsPoster from "../../../assets/interviewthumb.png";
import InterviewPlaybookDownload from "./InterviewPlaybookDownload";
import SectionTitle from "@/components/SectionTitle";
import TypesofResumes from "./TypesofResumes";

const Resources = () => (
  <>
    <SectionTitle
      text="Get Noticed. Get the Job."
      subtext="Supercharge your resume and master interviews with bold, actionable tips that work."
    />
    {/* Top quick-nav grid */}
    <ResourceCategories />

    {/* ────────────────────── 1. Interview Types ────────────────────── */}
    <section id="interview-details" className="py-5 px-4 bg-gray-50">
      <SectionWithVideoModal
        title="Cracking the Interview Code"
        description="Explore two key areas of interview prep: understanding different interview types and mastering how to respond to common questions with confidence."
        videos={[
          {
            src: "/interviewtypes.mp4",
            poster: questionsPoster,
            label: "Interview Types (1:25 mins)",
          },
          {
            src: "/commonquestions.mp4",
            poster: interviewPoster,
            label: "Common Interview Questions (1:10 mins)",
          },
        ]}
      />

      <TypesofInterviews />
    </section>

    {/* ────────────────────── 2. Resume Types ──────────────────────── */}
    <section id="resume-details" className="py-5 px-4 bg-white">
      <SectionWithVideoModal
        title="Resumes Tips and Tricks"
        description="Choose the resume format that best showcases your experience."
        videos={[
          {
            src: "/resumetypes.mp4",
            poster: resumePoster,
            label: "Resume Types (1:17 mins)",
          },
        ]}
      />
      <TypesofResumes />
    </section>

    {/* ────────────────────── 4. Downloadable eBook ─────────────────────── */}
    <InterviewPlaybookDownload />
  </>
);

export default Resources;
