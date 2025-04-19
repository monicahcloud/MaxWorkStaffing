"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    id: "resume",
    title: "Resume Builder",
    icon: "📝",
    items: [
      {
        question: "How do I create a resume?",
        answer:
          "Navigate to the 'Resume Builder' tab and follow the step-by-step prompts. Your progress is saved automatically.",
      },
      {
        question: "Can I upload an existing resume?",
        answer:
          "This feature is coming soon. You will be able to upload a PDF or Word document in the Resumes section.",
      },
      {
        question: "How can I download or print my resume?",
        answer:
          "Click the three-dot menu on your resume card and select 'Print' or 'Download'.",
      },
    ],
  },
  {
    id: "tracker",
    title: "Application Tracker",
    icon: "📄",
    items: [
      {
        question: "How do I track my job applications?",
        answer:
          "Use the 'Add Job' button to manually enter applications, then view them all in the 'All Jobs' section.",
      },
      {
        question: "What does the Stats link mean?",
        answer:
          "The Stats section provides a visual overview of your job search progress with real-time data.",
      },
    ],
  },
  {
    id: "account",
    title: "Your Account",
    icon: "👤",
    items: [
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click 'Forgot Password' on the login page and follow the prompts to reset your password securely.",
      },
      {
        question: "How do I update my profile info?",
        answer:
          "Click your profile icon > 'Manage Account' to update your contact details and preferences.",
      },
    ],
  },
  {
    id: "support",
    title: "Technical Support",
    icon: "🛠",
    items: [
      {
        question: "Dashboard isn’t loading. What should I do?",
        answer:
          "Try refreshing the page or clearing your browser cache. Contact support if it persists.",
      },
      {
        question: "I didn’t get confirmation after submitting a form.",
        answer:
          "Check your spam folder. If not found, please reach out via the contact form.",
      },
    ],
  },
  {
    id: "general",
    title: "General Inquiries",
    icon: "📬",
    items: [
      {
        question: "How long does it take to receive a response?",
        answer: "We typically respond within 24–48 business hours.",
      },
      {
        question: "Can I get help improving my resume?",
        answer:
          "Yes! Mention it in your support request and we’ll be happy to help.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center mt-10">
        {faqData.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="flex flex-col items-center p-6 border rounded-lg shadow-sm hover:shadow transition bg-white">
            <div className="text-5xl mb-3">{cat.icon}</div>
            <p className="font-semibold text-gray-700">{cat.title}</p>
          </a>
        ))}
      </div>

      <div className="mt-16 space-y-16">
        {faqData.map((category, i) => (
          <section key={i} id={category.id} className="scroll-mt-24">
            <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
            <div className="space-y-2">
              {category.items.map((item, j) => {
                const key = `${i}-${j}`;
                const isOpen = openItem === key;
                return (
                  <div key={key} className="border rounded-md overflow-hidden">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-100 hover:bg-gray-200">
                      <span className="font-medium">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 bg-white text-sm text-gray-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/support" className="text-blue-600 hover:underline text-lg">
          ← Back to Support
        </Link>
      </div>
    </div>
  );
}
