"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export const EducationTips = () => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-100"
        onClick={() => setShowTips(!showTips)}>
        {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showTips ? "Hide Education Tips" : "Show Education Tips"}
      </Button>

      {showTips && (
        <Card className="bg-[#FCFCFA] p-6 rounded-xl shadow-md border border-green-200 space-y-4 max-w-md">
          <div className="bg-green-100 text-green-700 font-semibold text-center py-1 rounded">
            Education Tips
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              If you've completed any higher education, it's not necessary to
              include high school.
            </li>
            <li>
              If you've completed any licenses or certifications, you can add
              those later.
            </li>
          </ul>
          {/* <div className="flex justify-center">
            <img
              src="/experience-tips-illustration.png" // Replace with your actual image path
              alt="Illustration"
              className="w-24 h-auto"
            />
          </div> */}
        </Card>
      )}
    </div>
  );
};
