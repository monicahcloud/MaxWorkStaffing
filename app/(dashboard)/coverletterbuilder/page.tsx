import React from "react";
import TemplateSelectionPage from "./templates/page";
import SectionTitle from "@/components/SectionTitle";

const page = () => {
  return (
    <>
      <SectionTitle
        text="choose a Cover Letter Template"
        subtext="  Fill out the form and watch your preview update in real time."
      />
      <div className="max-w-7xl mx-auto flex flex-wrap">
        <TemplateSelectionPage />
      </div>
    </>
  );
};

export default page;
