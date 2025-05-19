import React from "react";

import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CreateLetterButton from "./CreateletterButton";

export const metadata: Metadata = {
  title: "Create a Cover Letter",
};
function CoverLetterRoute() {
  return (
    <>
      <SectionTitle text="choose a Cover Letter Template" subtext="  " />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateLetterButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoverLetterRoute;
