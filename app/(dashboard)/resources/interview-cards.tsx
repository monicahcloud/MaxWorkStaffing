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
import { InterviewCard } from "./types";
export const interviewCards: InterviewCard[] = [
  {
    icon: <Phone className="w-8 h-8 text-red-600" />,
    title: "Phone Interview",
    short: "Initial screening over the phone for candidate evaluation.",
    detail:
      "Phone interviews serve as a typical initial phase in the recruitment process, evaluating the candidate’s communication abilities. Choose a quiet setting and articulate your thoughts clearly and confidently.",
  },
  {
    icon: <FileText className="w-8 h-8 text-red-600" />,
    title: "Traditional Interview",
    short: "In-person interview assessing skills, experience & qualifications.",
    detail:
      "A conventional interview is conducted face-to-face with structured, open-ended questions to judge culture and role fit.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-red-600" />,
    title: "Behavioral Interview",
    short: "Evaluates past behaviors to predict future performance.",
    detail:
      "Expect STAR-style questions such as “Describe a situation where…”. Employers look for problem-solving, collaboration and communication skills.",
  },
  {
    icon: <Video className="w-8 h-8 text-red-600" />,
    title: "Video Interview",
    short: "Remote interview via video-conferencing technology.",
    detail:
      "Set up a quiet, well-lit space and test your tech. Project confidence and keep eye contact with the camera.",
  },
  {
    icon: <Users className="w-8 h-8 text-red-600" />,
    title: "Group Interview",
    short: "Simultaneous assessment of multiple candidates.",
    detail:
      "Showcase teamwork and communication during group discussions or activities while respecting others’ input.",
  },
  {
    icon: <Utensils className="w-8 h-8 text-red-600" />,
    title: "Lunch Interview",
    short: "Casual setting to assess fit over a meal.",
    detail:
      "Be polite, professional and engage in light conversation. Avoid discussing salary or benefits.",
  },
  {
    icon: <PanelTop className="w-8 h-8 text-red-600" />,
    title: "Panel Interview",
    short: "Multiple interviewers assess the candidate simultaneously.",
    detail:
      "Prepare for questions from various perspectives. Maintain eye contact with all panel members.",
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-red-600" />,
    title: "Assessment Center",
    short: "Series of exercises to evaluate skills and competencies.",
    detail:
      "Participate in group activities, presentations and role plays. Showcase your abilities under pressure.",
  },
  {
    icon: <SquareUser className="w-8 h-8 text-red-600" />,
    title: "Case Study Interview",
    short: "Problem-solving exercise to assess analytical skills.",
    detail:
      "Analyze a business scenario and present your solution. Focus on logical reasoning and structured thinking.",
  },
];
