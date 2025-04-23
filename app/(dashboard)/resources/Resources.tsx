import { nanoid } from "nanoid";
import interviewee from "../../../assets/rename.jpg";
import resumes from "../../../assets/resume.jpg";
import jobinterview from "../../../assets/interview.jpg";
import SingleResource from "./SingleResource";
import SingleInterviewQuestion from "./SingleInterviewQuestion";
import { interviewQuestions } from "@/utils/questions";
import TypesofInterviews from "./TypesofInterviews";
import ResumeTypes from "./ResumeTypes";

const resources = [
  {
    id: nanoid(),
    video: "https://www.youtube.com/embed/S49RQc_OtfU",
    align: "right",
    title: "Types of Interviews",
    image: interviewee,
    info: "Interview formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
    componentId: "interview-details",
  },
  {
    id: nanoid(),
    video: "https://www.youtube.com/embed/hMDO8QCajPk",
    align: "left",
    title: "Types of Resumes",
    image: resumes,
    info: "Interview formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
    componentId: "resume-details",
  },
  {
    id: nanoid(),
    video: "https://www.youtube.com/embed/wIjK-6Do6lg",
    align: "right",
    title: "Interview Questions",
    image: jobinterview,
    info: "Interview formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
    componentId: "questions-details",
  },
];

const Resources = () => {
  return (
    <>
      <h1 className="text-4xl py-5 font-semibold text-center">
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
