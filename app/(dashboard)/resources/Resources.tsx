"use client";

import ResourceCategories from "./ResourceCategories";
import SectionWithVideoModal from "./SectionWithVideoModal";

import TypesofInterviews from "./TypesofInterviews";
import ResumeTypes from "./ResumeTypes";
import SingleInterviewQuestion from "./SingleInterviewQuestion";
import { interviewQuestions } from "@/utils/questions";

/* ── Poster thumbnails ────────────────────────────── */
import interviewPoster from "../../../assets/questionsthumb.png";
import resumePoster from "../../../assets/resumesthumb.png";
import questionsPoster from "../../../assets/interviewthumb.png";
import InterviewPlaybookDownload from "./InterviewPlaybookDownload";

const Resources = () => (
  <>
    {/* ────────────────────── 4. Downloadable eBook ─────────────────────── */}
    <InterviewPlaybookDownload />
    {/* Top quick-nav grid */}
    <ResourceCategories />

    {/* ────────────────────── 1. Interview Types ────────────────────── */}
    <section id="interview-details" className="py-5 px-4 bg-gray-50">
      <SectionWithVideoModal
        title="Types of Interviews"
        description="Click on each card to learn about different interview formats and how to prepare for each."
        video="/interviewtypes.mp4"
        poster={interviewPoster}>
        <TypesofInterviews />
      </SectionWithVideoModal>
    </section>

    {/* ────────────────────── 2. Resume Types ──────────────────────── */}
    <section id="resume-details" className="py-5 px-4 bg-white">
      <SectionWithVideoModal
        title="Types of Resumes"
        description="Choose the resume format that best showcases your experience."
        video="/resumesvideo.mp4"
        poster={resumePoster}
        reverse>
        <ResumeTypes />
      </SectionWithVideoModal>
    </section>

    {/* ─────────────────── 3. Common Interview Questions ───────────── */}
    <section id="questions-details" className="py-5 px-4 bg-gray-50">
      <SectionWithVideoModal
        title="Common Interview Questions"
        description="Practice answers to the most frequently asked interview questions."
        video="/commonquestions.mp4"
        poster={questionsPoster}>
        <SingleInterviewQuestion questions={interviewQuestions} />
      </SectionWithVideoModal>
    </section>
  </>
);

export default Resources;
