// import { EditorFormProps } from "@/lib/types";
// import GeneralInforForm from "./forms/GeneralInfoForms";
// import PersonalInfoForm from "./forms/PersonalInfoForm";
// import WorkExperienceForm from "./forms/WorkExperienceForm";
// import EducationForm from "./forms/EducationForm";
// import SkillsForm from "./forms/SkillsForm";
// import SummaryForm from "./forms/SummaryForm";
// import TechnicalSkillsForm from "./forms/TechnicalSkillsForm";
// import InterestForm from "./forms/InterestForm";

// export const allSteps: {
//   title: string;
//   component: React.ComponentType<EditorFormProps>;
//   key: string;
// }[] = [
//   { title: "General Info", component: GeneralInforForm, key: "general-info" },
//   { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
//   {
//     title: "Work Experience",
//     component: WorkExperienceForm,
//     key: "work-experience",
//   },
//   { title: "Education", component: EducationForm, key: "education" },
//   { title: "Skills", component: SkillsForm, key: "skills" },
//   {
//     title: "Technical Skills",
//     component: TechnicalSkillsForm,
//     key: "techSkills",
//   },
//   { title: "Interests", component: InterestForm, key: "interest" },
//   { title: "Summary", component: SummaryForm, key: "summary" },
// ];

// // ✅ Updated getSteps function
// export function getSteps(resumeType?: string) {
//   if (resumeType === "Federal Resume") {
//     const hiddenKeys = ["skills", "techSkills", "interest"];
//     const hiddenTitles = ["Skills", "Technical Skills", "Interests"]; // ✅ Hide based on title too!

//     return allSteps.filter(
//       (step) =>
//         !hiddenKeys.includes(step.key) && !hiddenTitles.includes(step.title)
//     );
//   }

//   return allSteps;
// }
import { EditorFormProps } from "@/lib/types";
import GeneralInforForm from "./forms/GeneralInfoForms";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import TechnicalSkillsForm from "./forms/TechnicalSkillsForm";
import InterestForm from "./forms/InterestForm";

export const allSteps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInforForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  {
    title: "Technical Skills",
    component: TechnicalSkillsForm,
    key: "techSkills",
  },
  { title: "Interests", component: InterestForm, key: "interest" },
  { title: "Summary", component: SummaryForm, key: "summary" },
];

export function getSteps(resumeType?: string) {
  if (resumeType === "Federal Resume") {
    const hiddenKeys = ["skills", "techSkills", "interest"];
    return allSteps.filter((step) => !hiddenKeys.includes(step.key));
  }
  return allSteps;
}
