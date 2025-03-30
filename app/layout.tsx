import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    template: "%s - MaxWork Staffing Agency",
    absolute: "MaxWork Staffing Agency",
  },
  description: "MaxWork Staffing Agency is for all jobseekers and employers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
