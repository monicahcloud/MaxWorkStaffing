// components/Footer.tsx
import Link from "next/link";

export default function MainFooter() {
  const year = new Date().getFullYear();
  const supportEmail = "designsbyvitanova@gmail.com";
  return (
    <footer className="bg-gray-50 text-sm text-gray-600  border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-red-500">
            MaxWork
            <span className="text-black"> Staffing and Consulting LLC</span>
          </div>

          <p>
            Customer Support:{" "}
            <Link
              href={`mailto:${supportEmail}`}
              className="text-blue-600 underline hover:text-blue-800 font-medium">
              Contact Us
            </Link>
          </p>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Link href="/home" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/billing" className="hover:underline">
            Manage Subscription
          </Link>
          <Link href="/tos" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ's
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8 text-xs text-gray-700">
        <p>© {year}, MaxWork Consulting. All rights reserved</p>
        <p className="mt-1">
          MaxResumeBuilder.com is owned and operated by MaxWork Consulting LLC.
        </p>
      </div>
    </footer>
  );
}
