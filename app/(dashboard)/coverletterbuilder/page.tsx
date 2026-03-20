"use client";

import TemplateSelectionPage from "./templates/page";
import SectionTitle from "@/components/SectionTitle";
import { COVER_LETTER_THEME_REGISTRY } from "@/lib/cover-letter-theme-registry";

const page = () => {
  return (
    <>
      <SectionTitle
        text="choose a Cover Letter Template"
        subtext=" Choose a professional template to begin."
      />
      <main className=" ">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {COVER_LETTER_THEME_REGISTRY.map((theme) => (
            <TemplateSelectionPage key={theme.id} theme={theme} />
          ))}
        </div>
      </main>
    </>
  );
};

export default page;
