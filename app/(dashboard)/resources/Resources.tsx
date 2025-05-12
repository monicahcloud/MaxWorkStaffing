import { nanoid } from "nanoid";
// import interviewee from "../../../assets/questionsthumb.png";
// import resumes from "../../../assets/resumesthumb.png";
import jobinterview from "../../../assets/interviewthumb.png";
import SingleResource from "./SingleResource";
import SingleInterviewQuestion from "./SingleInterviewQuestion";
import { interviewQuestions } from "@/utils/questions";
import TypesofInterviews from "./TypesofInterviews";
import ResumeTypes from "./ResumeTypes";
import InterviewTips from "./InterviewTips";

const questions = "/commonquestions.mp4";
// const resumesvideo = "/resumesvideo.mp4";
// const interviews = "/interviews.mp4";
const resources = [
  // {
  //   id: nanoid(),
  //   video: interviews,
  //   align: "right",
  //   title: "Types of Interviews",
  //   image: interviewee,
  //   info: "Interview formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
  //   componentId: "interview-details",
  // },
  // {
  //   id: nanoid(),
  //   video: resumesvideo,
  //   align: "left",
  //   title: "Types of Resumes",
  //   image: resumes,
  //   info: "There are several resume formats to choose from, depending on your experience. Chronological resumes highlight work history, while functional ones focus on skills—great for career changers. A combination format blends both. Choosing the right style helps present your background more effectively.",
  //   componentId: "resume-details",
  // },
  {
    id: nanoid(),
    video: questions,
    align: "right",
    title: "Common Interview Questions",
    image: jobinterview,
    info: "Most interviews include a few common questions designed to learn about your experience, problem-solving, and personality. Questions like “Tell me about yourself”, “What are your strengths?”, and “Why do you want this job?” often come up. Preparing answers ahead of time helps you respond clearly and confidently.",
    componentId: "questions-details",
  },
];

const Resources = () => {
  return (
    <>
      <h1 className="text-5xl uppercase py-5 font-semibold text-center ">
        Your guide to a perfect job interview
      </h1>
      {/* <ServicePromoCard /> */}
      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12">
        {resources.map((resource) => {
          return (
            <SingleResource
              key={resource.id}
              video={resource.video}
              title={resource.title}
              image={resource.image}
              info={resource.info}
              componentId={resource.componentId}
            />
          );
        })}
      </div>
      <InterviewTips />
      <hr className="mt-10 border-t-2 border-red-500 mb-4 w-full" />
      <h1
        id="interview-details"
        className="text-4xl py-5  mt-5 font-semibold text-center">
        Types of Interviews
      </h1>
      <div>
        <TypesofInterviews />
      </div>
      <hr className="mt-10 border-t-2 border-red-500 mb-4 w-full" />
      <h1
        id="resume-details"
        className="text-4xl py-5  mt-5 font-semibold text-center">
        Resume Types
      </h1>
      <div>
        <ResumeTypes />
      </div>
      <hr className="mt-10 border-t-2 border-red-500 mb-4 w-full" />
      <h1
        id="questions-details"
        className="text-4xl py-5  mt-5 font-semibold text-center">
        Common Interview Questions
      </h1>
      <div>
        <SingleInterviewQuestion questions={interviewQuestions} />
      </div>
    </>
  );
};

export default Resources;
