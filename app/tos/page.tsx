import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        These Terms of Service (&quot;Terms&quot;) govern your use of the
        MaxWork Staffing client platform (&quot;Platform&quot;), including the
        AI-powered resume builder, and subscription services offered through our
        Premium and Premium Plus plans.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using the Platform, you agree to be bound by these
        Terms. If you do not agree, you may not use the Platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Subscriptions</h2>
      <p className="mb-2">MaxWork offers two paid subscription tiers:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Premium:</strong> Includes access to AI tools and up to 3
          resumes.
        </li>
        <li>
          <strong>Premium Plus:</strong> Includes all Premium features plus
          unlimited resumes and additional design customizations.
        </li>
      </ul>
      <p className="mb-4">
        Subscription fees are billed monthly. You may cancel at any time, but no
        refunds will be provided for partial billing periods.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. AI Resume Builder</h2>
      <p className="mb-4">
        The Platform uses AI to assist with resume creation. By using this
        feature, you understand that outputs may vary and should be reviewed for
        accuracy and appropriateness before submission to potential employers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        4. User Responsibilities
      </h2>
      <p className="mb-4">
        You are responsible for all content you upload or generate on the
        Platform. You agree not to use the Platform for any unlawful or harmful
        purpose.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to the Platform
        at any time for violations of these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Modifications</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Changes will be posted on
        this page and will become effective immediately upon posting.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@maxworkcoaching.com"
          className="text-blue-600 underline">
          support@maxworkcoaching.com
        </a>
        .
      </p>
    </main>
  );
}
