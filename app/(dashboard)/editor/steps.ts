import { EditorFormProps } from "@/lib/types";
import GeneralInforForm from "./forms/GeneralInfoForms";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";

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
];
