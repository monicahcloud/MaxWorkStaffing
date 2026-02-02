import React from "react";
import comingSoon from "../../../assets/comingsoon.jpg";
import Image from "next/image";
import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Personalized Profile",
};
function ProfessionalProfileRoute() {
  return (
    <>
      <SectionTitle
        text="Personal Profile"
        subtext="Complete your personal profile"
      />

      <main className="max-w-2xl mx-auto mt-10 p-4">
        <Card className="rounded-2xl shadow-md">
          <div className="bg-blue-100 rounded-t-2xl h-32 w-full" />
          <CardContent className="-mt-12">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="/placeholder.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold mt-4">John Doe</h1>
              <p className="text-muted-foreground text-sm">Software Engineer</p>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <span>Irvine, California</span>
                <a
                  href="https://johndoe.com"
                  className="underline text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer">
                  johndoe.com
                </a>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="font-semibold text-lg">About Me</h2>
                <p className="text-sm mt-2">
                  A short bio or summary highlighting key points and career
                  objectives.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-lg">Experience</h2>
                <p className="text-sm mt-2">
                  <strong>Company Name</strong>
                  <br />
                  Role • Duration
                  <br />
                  Description of the role and responsibilities or achievements
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-lg">Skills</h2>
                <ul className="list-disc list-inside text-sm mt-2">
                  <li>Skill 1</li>
                  <li>Skill 2</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-lg">Education</h2>
                <p className="text-sm mt-2">
                  <strong>School Name</strong>
                  <br />
                  Degree • Years
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-center space-x-6 text-muted-foreground">
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://johndoe.com"
                target="_blank"
                rel="noopener noreferrer">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default ProfessionalProfileRoute;
