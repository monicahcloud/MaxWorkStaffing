"use client";
import React, { useState } from "react";
import {
  Phone,
  Video,
  Utensils,
  Users,
  BookOpen,
  PanelTop,
  FileText,
  ThumbsUp,
  SquareUser,
} from "lucide-react";

const interviews = [
  {
    icon: <Phone className="text-red-600 w-8 h-8" />,
    title: "Phone Interview",
    short: "Initial screening over the phone for candidate evaluation.",
    detail: `Phone interviews serve as a typical initial phase in the recruitment process, evaluating the qualifications and communication abilities of candidates. They provide a practical method for employers to filter applicants, particularly those located remotely. To succeed in this format, candidates should engage in comprehensive preparation, choose a quiet setting, and articulate their thoughts clearly and with confidence.`,
  },
  {
    icon: <FileText className="text-red-600 w-8 h-8" />,
    title: "Traditional Interview",
    short:
      "In-person interview assessing skills, experience, & qualifications.",
    detail: `A conventional interview consists of a personal meeting between the interviewer and the candidate, where they delve into the candidate’s qualifications and experiences. Usually, this process adheres to a structured approach featuring open-ended questions. This technique is effective in evaluating how well the candidate aligns with the position and the company culture.`,
  },
  {
    icon: <BookOpen className="text-red-600 w-8 h-8" />,
    title: "Behavioral Interview",
    short: "Assessing past behaviors for future performance prediction.",
    detail: `A behavioral interview aims to evaluate a candidate’s previous experiences and actions to forecast their future performance. Typically, questions begin with phrases like “Describe a situation where…” and utilize the STAR method (Situation, Task, Action, Result) to guide the answers. This approach enables employers to assess essential skills such as problem-solving, collaboration, and effective communication.`,
  },
  {
    icon: <Video className="text-red-600 w-8 h-8" />,
    title: "Video Interview",
    short: "Remote interview via video conferencing technology.",
    detail: `A video interview provides employers with the opportunity to evaluate candidates from a distance, emphasizing their qualifications and ability to communicate effectively. Candidates should set up a quiet, well-lit space and check that their technology is functioning correctly. To succeed, it’s essential to project confidence, communicate clearly, and maintain a professional appearance.`,
  },
  {
    icon: <Users className="text-red-600 w-8 h-8" />,
    title: "Group Interview",
    short: "Simultaneous assessment of multiple candidates.",
    detail: `A group interview consists of several candidates being assessed simultaneously, typically to gauge their teamwork and communication abilities. This format may feature group discussions or collaborative activities designed to mimic a team atmosphere. It allows employers to observe how candidates engage with one another and showcase their skills in a collective environment.`,
  },
  {
    icon: <PanelTop className="text-red-600 w-8 h-8" />,
    title: "Panel Interview",
    short: "Evaluation by a panel of interviewers representing stakeholders.",
    detail: `A panel interview features several interviewers evaluating one candidate at the same time. This approach provides a variety of viewpoints and a thorough assessment of how well the candidate aligns with the position. Additionally, it challenges the candidate to interact with various stakeholders and manage stress effectively.`,
  },
  {
    icon: <Utensils className="text-red-600 w-8 h-8" />,
    title: "Lunch/Dinner Interview",
    short:
      "Informal meal-based interview to assess social & professional skills.",
    detail: `A lunch or dinner interview takes place in a public dining setting, offering the interviewer a chance to evaluate a candidate’s social abilities and character. This informal atmosphere fosters open discussions about qualifications and experiences. Candidates are encouraged to uphold professionalism, select suitable conversation topics, and exhibit proper table etiquette.`,
  },
  {
    icon: <SquareUser className="text-red-600 w-8 h-8" />,
    title: "Informational Interview",
    short: "Gathering insights & advice from industry professionals.",
    detail: `An informational interview is a conversation designed to help you explore a particular career path, industry, or company by speaking with someone who has firsthand experience. Unlike a job interview, this meeting focuses on gathering valuable insights and expanding your professional network. Engaging in these discussions can empower you to make well-informed career choices and may open doors to future job prospects.`,
  },
  {
    icon: <ThumbsUp className="text-red-600 w-8 h-8" />,
    title: "Strength-Based Interview",
    short: "Focus on identifying & assessing candidate strengths.",
    detail: `A strength-based interview emphasizes discovering a candidate’s inherent talents and passions instead of merely evaluating their skills and past experiences. This method seeks to reveal what candidates truly enjoy and where they shine, offering a more authentic evaluation. By using this approach, employers can better assess a candidate’s suitability and enthusiasm for the position.`,
  },
];

function TypesofInterviews() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-white rounded-xl p-6 shadow-md transition-all duration-300 text-center flex flex-col items-center ${
                hoveredIndex === index ? "min-h-[380px]" : "min-h-[240px]"
              }`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700">{item.short}</p>

              {hoveredIndex === index && (
                <div className="mt-4 w-full bg-white rounded-lg text-left p-3 transition-opacity duration-300">
                  <h4 className="text-md font-bold text-red-600 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TypesofInterviews;
