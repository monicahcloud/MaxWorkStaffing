"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQ[];
}

const faqData: FAQCategory[] = [
  {
    title: "Resume Builder",
    items: [
      {
        question: "How do I create a resume?",
        answer:
          "Navigate to the 'Resume Builder' tab and follow the step-by-step prompts to enter your details. You can save your progress and return at any time.",
      },
      {
        question: "Can I upload an existing resume?",
        answer:
          "Yes, you can upload a PDF or Word document using the 'Upload Resume' feature located in the Resume Builder section.",
      },
      {
        question: "How can I download or print my resume?",
        answer:
          "Once your resume is complete, select the 'Download' or 'Print' option at the top of the page.",
      },
    ],
  },
  {
    title: "Job Application Tracker",
    items: [
      {
        question: "How do I track my job applications?",
        answer:
          "Each time you apply for a job through the portal, it is automatically added to your 'Applications' tab with its current status.",
      },
      {
        question: "What do the status labels mean?",
        answer:
          "'Submitted' means your application was sent, 'In Review' indicates an employer is reviewing it, 'Interview' means you're selected for an interview, and 'Closed' signifies the position is filled.",
      },
    ],
  },
  {
    title: "Account & Login",
    items: [
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click 'Forgot Password' on the login page and follow the prompts to reset your password securely.",
      },
      {
        question: "How do I update my email or profile information?",
        answer:
          "Go to 'Account Settings' and update your contact details and preferences as needed.",
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "My dashboard isn’t loading. What should I do?",
        answer:
          "Please refresh the page or clear your browser cache. If the issue persists, contact our support team using the form below.",
      },
      {
        question: "I submitted a form but didn’t receive confirmation.",
        answer:
          "Check your spam or junk folder. If the email isn't there, please contact support for verification.",
      },
    ],
  },
  {
    title: "General Inquiries",
    items: [
      {
        question: "How long does it take to receive a response?",
        answer:
          "Our team typically responds to support requests within 24–48 business hours.",
      },
      {
        question: "Can I receive help improving my resume?",
        answer:
          "Yes. We offer resume review services. Please include this request in your message below.",
      },
    ],
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div id="faq" className="max-w-4xl mx-auto mt-16 p-4 scroll-mt-24">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Frequently Asked Questions
      </h2>
      {faqData.map((category, i) => (
        <div key={i} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {category.title}
          </h3>
          <div className="space-y-2">
            {category.items.map((item, j) => {
              const key = `${i}-${j}`;
              const isOpen = openItem === key;
              return (
                <div
                  key={key}
                  className="border border-gray-300 rounded-lg overflow-hidden transition">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition">
                    <span className="font-medium text-gray-800">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-gray-700 text-sm bg-white">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
