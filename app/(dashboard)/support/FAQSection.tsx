"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
// import Link from "next/link";

const faqData = [
  {
    id: "resume",
    title: "Resume Builder",
    icon: "📝",
    items: [
      {
        question: "How do I create a resume?",
        answer:
          "Navigate to the 'Resumes' tab and follow the step-by-step prompts. Your progress is saved automatically.",
      },
      {
        question: "Can I upload an existing resume?",
        answer:
          "Yes. In the Resumes section, click 'Upload Resume' to import and edit your PDF or Word document.",
      },
      {
        question: "How can I download or print my resume?",
        answer:
          "Click the three-dot menu on your resume card and select 'Print' or 'Download'. These features require a subscription.",
      },
    ],
  },
  {
    id: "coverletter",
    title: "Cover Letter Builder",
    icon: "✉️",
    items: [
      {
        question: "How do I write a cover letter?",
        answer:
          "Open the Cover Letter Builder and complete the guided steps. You can edit freely or use our AI generator.",
      },
      {
        question: "Can AI help me write my letter?",
        answer:
          "Yes! Input your job title, experience, and achievements, then click 'Generate from AI' to get started.",
      },
      {
        question: "Can I print or download my cover letter?",
        answer:
          "Yes, but these features require a Pro subscription. Use the options under the three-dot menu.",
      },
    ],
  },
  {
    id: "jobsearch",
    title: "Job Search",
    icon: "🔍",
    items: [
      {
        question: "How do I search for jobs?",
        answer:
          "Go to the Job Search page, enter a keyword (e.g. 'Designer') and choose a location or category. Click 'Search' to browse available listings.",
      },
      {
        question: "Where do the job listings come from?",
        answer:
          "We use trusted third-party job APIs to pull live listings across multiple industries and locations.",
      },
      {
        question: "Can I filter jobs by location or category?",
        answer:
          "Yes. Use the dropdown filters to narrow your results by city, state, or job category.",
      },
      {
        question: "What does the 'New' label on jobs mean?",
        answer:
          "Jobs marked as 'New' have been added within the last 24–48 hours — giving you an edge in applying early.",
      },
      {
        question: "Can I apply directly through this site?",
        answer:
          "Clicking 'Apply' will take you to the original job listing site where you can complete your application.",
      },
      {
        question: "Are these jobs remote or in-person?",
        answer:
          "Each job listing includes details about the work type — remote, hybrid, or on-site — in the description.",
      },
      {
        question: "I’m not seeing jobs in my field. What should I do?",
        answer:
          "Try adjusting your keywords or location. You can also explore the 'Categories' tab to find related roles.",
      },
      {
        question: "Can I get alerts for new jobs?",
        answer:
          "Job alerts are coming soon! In the meantime, check back regularly as listings are updated frequently.",
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
          "Use the 'Job Tracker' link in the sidebar to manually enter applications you've applied to.",
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
        question: "My edits didn’t save. How do I fix this?",
        answer:
          "Make sure you're connected to the internet. Edits are auto-saved — but you can refresh to check for updates.",
      },
      {
        question: "I didn’t get confirmation after submitting a form.",
        answer:
          "Please check your spam or promotions folder. If not found, reach out to us directly via the contact form.",
      },
    ],
  },
  {
    id: "general",
    title: "General Inquiries",
    icon: "📬",
    items: [
      {
        question: "Is this site mobile-friendly?",
        answer:
          "Yes! The platform is optimized for phones and tablets — including mobile previews and editing support.",
      },
      {
        question: "Can I get help improving my resume or cover letter?",
        answer:
          "Absolutely. If you're stuck or need feedback, contact support and we’ll guide you through improvements.",
      },
      {
        question: "How long does it take to receive a response?",
        answer: "We aim to respond within 24–48 business hours.",
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

      {/* <div className="text-center mt-12">
        <Link href="/support" className="text-blue-600 hover:underline text-lg">
          ← Back to Support
        </Link>
      </div> */}
    </div>
  );
}
