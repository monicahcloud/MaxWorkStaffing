// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function MainFooter() {
  const year = new Date().getFullYear();
  const supportEmail = "designsbyvitanova@gmail.com";
  return (
    <footer className="bg-gray-50 text-sm text-gray-600  border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <Image
            src={logo}
            alt="Max ResumeBuilder logo"
            width={160}
            height={40}
            className="h-auto w-auto"
          />

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
          <Link href="/billing/success" className="hover:underline">
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
        <p className="mt-1">
          Website designed and developed by{" "}
          <a
            href="https://vitanovadesigns.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-gray-800 hover:text-black">
            Vitanova Designs
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
