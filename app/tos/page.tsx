import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        These Terms of Service ("Terms") govern your use of the MaxResumeBuilder
        platform ("Platform"), including the AI-powered resume builder, job
        tools, and access plans offered through our site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using the Platform, you agree to be bound by these
        Terms. If you do not agree, you may not use the Platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Access Plans</h2>
      <p className="mb-2">
        MaxResumeBuilder offers the following paid access options:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>7-Day Access:</strong> One-time payment that grants full
          access for 7 days. Includes resume and cover letter tools, job
          tracking, job search, AI assistance, and 1 PDF upload. Cannot be
          repurchased after use.
        </li>
        <li>
          <strong>Monthly Plan:</strong> 30-day access to all premium tools and
          features. Includes up to 3 PDF resume uploads.
        </li>
        <li>
          <strong>Quarterly Plan:</strong> 90-day access at a discounted rate.
          Includes all resume-building and job search features, plus up to 5 PDF
          uploads.
        </li>
      </ul>
      <p className="mb-4">
        All plans are non-renewing and non-refundable once purchased. Access
        expires at the end of the selected period.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. AI Resume Builder</h2>
      <p className="mb-4">
        The Platform uses artificial intelligence to assist with resume and
        cover letter creation. While the AI is designed to provide helpful
        suggestions, you are responsible for reviewing and editing all content
        before submitting it to potential employers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        4. User Responsibilities
      </h2>
      <p className="mb-4">
        You are responsible for the content you upload, edit, or generate using
        the Platform. You agree not to use the Platform for any unlawful,
        harmful, or misleading purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to the Platform
        at our discretion if you violate these Terms or misuse the tools and
        services provided.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Modifications</h2>
      <p className="mb-4">
        We may revise these Terms periodically. Updates will be posted on this
        page and will become effective immediately upon publication. Continued
        use of the Platform constitutes acceptance of the updated Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto: monicahcloud@vitanovadesigns.cloud"
          className="text-blue-600 underline">
          monicahcloud@vitanovadesigns.cloud
        </a>
        .
      </p>
    </main>
  );
}
