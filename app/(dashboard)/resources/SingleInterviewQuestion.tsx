import React from "react";
import { InterviewQuestion } from "../../../utils/questions";

type SingleQuestionProps = {
  questions: InterviewQuestion[];
};

const SingleInterviewQuestion = ({ questions }: SingleQuestionProps) => {
  const publicQuestions = questions.filter((q) => q.type === "public");
  const privateQuestions = questions.filter((q) => q.type === "private");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 ">
      {/* Public Questions */}
      <div>
        <h2 className="text-xl font-bold text-center mb-4">Public Sector</h2>
        {publicQuestions.map((q) => (
          <details
            key={q.id}
            className="mb-2 border hover:scale-105 rounded-lg p-4 transition duration-300 hover:bg-gray-50 hover:shadow">
            <summary className="cursor-pointer font-medium">
              {q.question}
            </summary>
            <p className="mt-2 text-gray-700">Example: {q.answer}</p>
          </details>
        ))}
      </div>

      {/* Private Questions */}
      <div>
        <h2 className="text-xl font-bold text-center mb-4">Private Sector</h2>
        {privateQuestions.map((q) => (
          <details
            key={q.id}
            className="mb-2 border rounded-lg p-4 hover:scale-105 transition duration-300 hover:bg-gray-50 hover:shadow">
            <summary className="cursor-pointer font-medium">
              {q.question}
            </summary>
            <p className="mt-2 text-gray-700">Example: {q.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default SingleInterviewQuestion;
