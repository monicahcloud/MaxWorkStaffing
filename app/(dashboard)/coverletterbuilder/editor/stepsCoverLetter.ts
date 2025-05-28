import { CoverLetterFormProps } from "@/lib/types";
import CoverLetterPersonalInfoForm from "./CoverLetterPersonalInfoForm";
import CoverLetterBody from "./CoverLetterBody";
import CoverLetterEmployerInfo from "./CoverLetterEmployerInfo";
import SignatureForm from "./SignatureForm";

export const allSteps: {
  title: string;
  component: React.ComponentType<CoverLetterFormProps>;
  key: string;
}[] = [
  {
    title: "Personal Info",
    component: CoverLetterPersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Employer Info",
    component: CoverLetterEmployerInfo,
    key: "employer-info",
  },
  {
    title: "LetterBody",
    component: CoverLetterBody,
    key: "body",
  },
  { title: "Signature", component: SignatureForm, key: "signature" },
];
