import React, { useEffect, useRef, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";

import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";

import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

function FunctionalResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        " aspect-[210/297] bg-white text-black h-fit w-full",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("space-y-6 p-6 origin-top-left ", !width && "invisible")}
        style={{
          width: "794px", // Lock original width
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        <PersonalInfoHeader resumeData={resumeData} />
        <MainContent />
      </div>
    </div>
  );
}

export default FunctionalResumePreview;

interface ResumePreviewProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumePreviewProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    address,
    phone,
    email,
    website,
    summary,
    linkedin,
    themeColor,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <>
      <div className="bg-neutral-900 rounded-xl">
        <div className="grid-cols-2 flex ">
          <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-primary-foreground shadow-md">
            <div className="flex-1">
              <h1 className="text-4xl font-bold" style={{ color: themeColor }}>
                {firstName} {lastName}
              </h1>
              <h2 className="text-lg text-muted-foreground">{jobTitle}</h2>
              <p className="mt-4 text-sm text-muted-foreground">{summary}</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              {photoSrc && (
                <Image
                  src={photoSrc}
                  width={100}
                  height={100}
                  alt="Author photo"
                  className="w-48 h-48 rounded-full object-cover"
                  style={{
                    borderRadius:
                      borderStyle === BorderStyles.SQUARE
                        ? "0px"
                        : borderStyle === BorderStyles.CIRCLE
                        ? "9999px"
                        : "10%",
                  }}
                />
              )}
              <div className="flex flex-col items-center text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <Mail size={14} style={{ color: themeColor }} /> {email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <Phone size={14} style={{ color: themeColor }} /> {phone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: themeColor }} /> {address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <Globe size={14} style={{ color: themeColor }} /> {website}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <Linkedin size={14} style={{ color: themeColor }} />{" "}
                    {linkedin}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
function MainContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Left Side - Work Experience */}

      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Work Experience</h3>

            {/* <div className="mb-6">
                <h4 className="text-lg font-semibold">HR Generalist</h4>
                <p className="text-sm text-muted-foreground">
                  The Good Hire Solutions | Bloomington, IN (06/2017 - Present)
                </p>
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li>Administer the onboarding process...</li>
                  <li>Perform formal/informal coaching...</li>
                  <li>
                    Serve as a Business Partner executing HR initiatives...
                  </li>
                  <li>Utilize HRIS system to enter, manage data...</li>
                  <li>
                    Investigate employee complaints and policy violations...
                  </li>
                  <li>Conduct exit interviews and feedback evaluations...</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold">HR Coordinator</h4>
                <p className="text-sm text-muted-foreground">
                  Better People Management Corp. (04/2013 - 05/2017)
                </p>
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li>Orchestrated end-to-end recruiting, hiring...</li>
                  <li>Implemented employee wellness initiatives...</li>
                  <li>Pioneered Affirmative Action Plan implementation...</li>
                  <li>
                    Developed robust training programs improving skills...
                  </li>
                </ul>
              </div>*/}
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Skills, Education, etc */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Skills & Competencies
            </h3>
            {/* <div className="flex flex-wrap gap-2">
              {[
                "HRIS",
                "Data Analysis",
                "Onboarding",
                "Recruiting",
                "Employee Relations",
                "Conflict Resolution",
                "SAP",
                "Zoho Recruit",
                "Labor Laws & Compliance",
                "Training & Performance Management",
              ].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Education/Certifications
            </h3>
            {/* <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Data Handling Training (02/2013)</li>
              <li>General Industry Safety & Health Training (10/2012)</li>
            </ul> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
