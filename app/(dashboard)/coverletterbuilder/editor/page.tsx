import React from "react";
import { Metadata } from "next";
import CoverLetterBuilder from "./CoverLetterBuilder";
export const metadata: Metadata = {
  title: "Design Your Cover Letter",
};
const page = () => {
  return (
    <>
      <CoverLetterBuilder />
    </>
  );
};

export default page;
