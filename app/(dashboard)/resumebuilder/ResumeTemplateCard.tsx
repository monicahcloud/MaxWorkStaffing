"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

interface ResumeTemplate {
  title: string;
  image: string | StaticImageData;
  href: string;
  description: string[];
  resumeType: string;
}

interface ResumeTemplateCardProps {
  template: ResumeTemplate;
  resumeId?: string; // Optional for use in /chooseTemplate
}

const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
  template,
  resumeId,
}) => {
  const router = useRouter();

  const handleClick = async () => {
    if (resumeId) {
      try {
        // Call API to update resume type
        const res = await fetch("/api/updateResumeType", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeId, resumeType: template.resumeType }),
        });

        if (!res.ok) {
          console.error("Failed to update resume type");
          // Optionally show error UI or return early
          return;
        }

        // Navigate after success
        router.push(
          `${
            template.href
          }?resumeId=${resumeId}&resumeType=${encodeURIComponent(
            template.resumeType
          )}`
        );
      } catch (error) {
        console.error("Error updating resume type:", error);
        // Optionally handle error UI
      }
    } else {
      // If no resumeId, just navigate
      router.push(
        `${template.href}?resumeType=${encodeURIComponent(template.resumeType)}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto space-y-2">
      <h2 className="text-2xl font-semibold text-center mt-5">
        {template.title}
      </h2>

      <Card
        onClick={handleClick}
        className="w-full cursor-pointer hover:shadow-lg transition-all p-4">
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative w-[300px] h-[400px]">
            <Image
              src={template.image}
              alt={`${template.title} Template`}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>

          <div className="w-full border-t border-gray-300" />

          <CardDescription>
            <ul className="text-base text-muted-foreground px-4 space-y-2 ">
              {template.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeTemplateCard;
