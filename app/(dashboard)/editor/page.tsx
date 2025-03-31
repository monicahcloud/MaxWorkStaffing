import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./ResumeEditor";
export const metadata: Metadata = {
  title: "Design Your Resume",
};
function Editor() {
  return <ResumeEditor />;
}

export default Editor;
