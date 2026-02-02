"use client";

import Link from "next/link";

export default function ServicePromoCard() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm text-center max-w-3xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-blue-900">
        Upgrade Your Professional Presence
      </h3>
      <p className="text-blue-800 text-sm mt-2">
        Want a polished resume, a personal website, or a full branding kit?
        We’ve got you covered.
      </p>
      <Link
        href="/services"
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        View Services
      </Link>
    </div>
  );
}
