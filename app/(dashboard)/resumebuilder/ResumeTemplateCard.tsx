"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push(template.href);
  };

  return (
    <div
      className="flex flex-col items-center w-full max-w-[280px] mx-auto cursor-pointer"
      onClick={handleClick}>
      <h2 className="text-center text-lg font-semibold whitespace-nowrap mb-2">
        {template.title}
      </h2>
      <div
        className="transition transform hover:scale-105 shadow-md rounded-lg overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px]">
          <Image
            src={template.image}
            alt={`${template.title} Template`}
            fill
            className={`object-cover rounded-lg transition-all duration-300 ${
              hovered ? "blur-md opacity-40" : "blur-0 opacity-100"
            }`}
          />
          {hovered && (
            <ul className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-800 bg-opacity-75 text-white text-md p-3 rounded-lg">
              {template.description.map((item, index) => (
                <li key={index} className="mb-1 text-center">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateCard;
