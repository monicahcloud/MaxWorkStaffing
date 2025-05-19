import { ShabachTemplate } from "../coverletterbuilder/templates/ShabachTemplate";

type CoverLetterValues = {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  themeColor: string;
  borderStyle: string;
};

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterValues;
  className?: string;
}

export default function CoverLetterPreview({
  coverLetterData,
  className,
}: CoverLetterPreviewProps) {
  return (
    <div className={className}>
      <ShabachTemplate {...coverLetterData} />
    </div>
  );
}
