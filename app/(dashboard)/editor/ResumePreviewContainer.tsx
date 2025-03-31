import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

function ResumePreviewContainer({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md "
        />
      </div>
    </div>
  );
}

export default ResumePreviewContainer;
