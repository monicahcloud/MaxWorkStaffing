// import MinimalTemplate from "./MinimalTemplate";
// import { ModernTemplate } from "./ModernTemplate";

// export default function CoverLetterPreviewWrapper(
//   props: TemplateProps & { selectedTemplate: string }
// ) {
//   switch (props.selectedTemplate) {
//     case "modern":
//       return <ModernTemplate {...props} />;
//     case "minimal":
//       return <MinimalTemplate {...props} />;
//     default:
//       return <ModernTemplate {...props} />;
//   }
// }
"use client";

import { templateMap } from "../coverletterbuilder/templates/templateMap";

interface Props {
  selectedTemplateId: string;
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
}

export default function CoverLetterPreviewWrapper({
  selectedTemplateId,
  ...props
}: Props) {
  const SelectedTemplate = templateMap[selectedTemplateId];
  if (!SelectedTemplate) return null;

  return <SelectedTemplate {...props} />;
}
