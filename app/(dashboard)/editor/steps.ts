import { EditorFormProps } from "@/lib/types";
import GeneralInforForm from "./forms/GeneralInfoForms";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import InterestForm from "./forms/InterestForm";
import TechnicalSkillsForm from "./forms/TechnicalSkillsForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInforForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experience ",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education ",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills ",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Technical Skills ",
    component: TechnicalSkillsForm,
    key: "techSkills",
  },
  {
    title: "Interest ",
    component: InterestForm,
    key: "interests",
  },
  {
    title: "Summary ",
    component: SummaryForm,
    key: "summary",
  },
];
