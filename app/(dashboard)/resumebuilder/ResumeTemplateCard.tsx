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
}

const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
  template,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${template.href}?resumeType=${template.resumeType}`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto space-y-2">
      {/* Title outside the Card */}
      <h2 className="text-3xl font-semibold text-center mt-5">
        {template.title}
      </h2>

      <Card
        onClick={handleClick}
        className="w-full cursor-pointer hover:shadow-lg transition-all p-4">
        <CardContent className="flex flex-col items-center gap-4">
          {/* Image */}
          <div className="relative w-[300px] h-[400px]">
            <Image
              src={template.image}
              alt={`${template.title} Template`}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-300" />

          {/* Description */}
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
