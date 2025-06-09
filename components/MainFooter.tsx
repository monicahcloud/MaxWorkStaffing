// components/Footer.tsx
import Link from "next/link";

export default function MainFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 text-sm text-gray-600  border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-purple-500">
            VitaNova<span className="text-black"> Designs</span>
          </div>
          <p>Customer Support: (770) 703-7133</p>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Link href="/ccpa" className="hover:underline">
            CCPA
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/tos" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/accessibility" className="hover:underline">
            Accessibility
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8 text-xs text-gray-700">
        <p>© {year}, VitaNova Designs. All rights reserved</p>
        <p className="mt-1">
          ResumeGenius.com is owned and operated by VitaNova Designs LLC,
          Atlanta, Georgia with offices in Georgia, and Wisconsin.
        </p>
      </div>
    </footer>
  );
}
