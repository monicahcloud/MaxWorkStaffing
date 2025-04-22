import { nanoid } from "nanoid";
import interviewee from "../../../assets/rename.jpg";
import resumes from "../../../assets/resume.jpg";
import jobinterview from "../../../assets/interview.jpg";
import SingleResource from "./SingleResource";
// import ServicePromoCard from "@/components/ServicePromoCard";

const resources = [
  {
    id: nanoid(),
    align: "right",
    title: "Types of Interviews",
    image: interviewee,
    info: " Interview  formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
  },
  {
    id: nanoid(),
    align: "left",
    title: "Interview Questions",
    image: jobinterview,
    info: "Interview  formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
  },
  {
    id: nanoid(),
    align: "right",
    title: "Types of Resumes",
    image: resumes,
    info: " Interview  formats have evolved, with employers now using a variety of methods to assess candidates. While conventional face-to-face interviews are still impactful, video interviews via platforms like Zoom or Skype have become increasingly common in the initial screening stages, especially due to their ease of use. Understanding the differences between the types of interviews is essential before you prepare for them.",
  },
];

const Resources = () => {
  return (
    <>
      {" "}
      <h1 className="text-4xl py-5 font-semibold text-center">
        Your guide to a perfect job interview
      </h1>
      {/* <ServicePromoCard /> */}
      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12">
        {resources.map((resource) => {
          return (
            <SingleResource
              key={resource.id}
              title={resource.title}
              image={resource.image}
              info={resource.info}
            />
          );
        })}
      </div>
    </>
  );
};

export default Resources;
