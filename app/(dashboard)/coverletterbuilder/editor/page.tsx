"use client";

import SectionTitle from "@/components/SectionTitle";
import { useState } from "react";
import { CoverLetterFormBuilder } from "./CoverLetterFormBuilder";

export default function CoverLetterBuilder() {
  const [recipientName, setRecipientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Create Your Cover Letter"
          subtext="Follow the steps below to create your cover letter. Your progress will be saved automatically."
        />
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="p-3 space-y-6 overflow-y-auto w-full md:w-1/2">
            <CoverLetterFormBuilder
              recipientName={recipientName}
              setRecipientName={setRecipientName}
              companyName={companyName}
              setCompanyName={setCompanyName}
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              body={body}
              // setBody={setBody}
            />
          </div>
          <div className=" md:block md:w-1/2 border-l">
            <h1 className="text-center mx-auto mt-60">
              {" "}
              Cover Letter Preview Section here
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
