import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import FAQSection from "../support/FAQSection"; // can stay client

// Correct, indexable metadata for /faq
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about plans, refunds, cancellation, account access, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Quick answers about pricing, refunds, cancellation, and features.",
    url: "/faq",
    images: [{ url: "/og/og-faq.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Max ResumeBuilder",
    description: "Answers about pricing, refunds, cancellation, and features.",
    images: ["/og/og-faq.png"],
  },
};

export default function FAQPage() {
  return (
    <div className="w-full mx-auto py-12 px-4">
      {/* FAQ JSON-LD for rich results */}
      <script
        type="application/ld+json"
        // Replace questions/answers with your real content
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I cancel anytime?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. You can cancel at any time from your billing portal.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer refunds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer a full refund within the first 3 days if you’re not satisfied.",
                },
              },
            ],
          }),
        }}
      />
      <SectionTitle text="Frequently Asked Questions" subtext="" />
      <span className="text-muted-foreground text-md mt-2 block">
        Still need assistance?{" "}
        <Link href="/support" className="text-blue-600 underline">
          Contact Support
        </Link>
      </span>
      <FAQSection />
    </div>
  );
}
