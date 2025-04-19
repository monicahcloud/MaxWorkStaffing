"use client";

import Link from "next/link";

const services = [
  {
    title: "Digital Resume Design",
    description:
      "Get a professionally designed digial resume optimized for digital sharing, applications, and printing.",
    price: "$49",
  },
  {
    title: "Personal Website",
    description:
      "A clean, modern one-page personal website to showcase your background, resume, portfolio, and contact info.",
    price: "$299",
  },
  {
    title: "Full Branding Kit",
    description:
      "Includes electronic resume, personal website, digital business card design, and a custom color/font guide.",
    price: "$499",
  },
  {
    title: "Interview Coaching",
    description:
      "1-on-1 session or downloadable prep workbook, STAR method coaching, mock interview",
    price: "$29",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Professional Services
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Take your professional presentation to the next level with our
        personalized services. Perfect for job seekers, freelancers, and
        personal brands.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-lg font-bold text-blue-600">
                {service.price}
              </span>
              <Link
                href="/contact"
                className="text-sm text-blue-600 hover:underline font-medium">
                Request Service
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/home" className="text-blue-600 text-lg hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
