"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
// import experience from "../assets/experience.svg";
export const ExperienceTips = () => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-100"
        onClick={() => setShowTips(!showTips)}>
        {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showTips ? "Hide Experience Tips" : "Show Experience Tips"}
      </Button>

      {showTips && (
        <Card className="bg-[#FCFCFA] p-6 rounded-xl shadow-md border border-orange-200 space-y-4 max-w-md">
          <div className="bg-orange-100 text-orange-700 font-semibold text-center py-1 rounded">
            Experience Tips
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <strong>Highlight experience</strong> relevant to the position you
              want or are applying for.
            </li>
            <li>
              <strong>Use keywords</strong> from the job listing. This will help
              you get past screening software used by hiring departments.
            </li>
            <li>
              <strong>Our pre-written bullet points</strong> give you an idea of
              what responsibilities to list.
            </li>
          </ul>
          {/* <div className="flex justify-center">
            <Image
              src={experience} // Replace with your actual image path
              alt="Illustration"
              className="w-24 h-auto"
            />
          </div> */}
        </Card>
      )}
    </div>
  );
};
