export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import "../styles/resume-engine.css";

const base = new URL(env.NEXT_PUBLIC_BASE_URL);

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: base,
  title: {
    template: "%s - CareerOS",
    default: "CareerOS - The Operating System for Your Next Career",
  },
  description:
    "CareerOS helps you build resumes and cover letters, track applications, prepare for interviews, and manage your next career move in one place.",
  alternates: {
    canonical: "/",
  },
  applicationName: "CareerOS",
  authors: [{ name: "VitaNova Designs" }],
  openGraph: {
    type: "website",
    title: "CareerOS",
    description:
      "The Operating System for Your Next Career. Build. Apply. Interview. Get Hired.",
    url: base,
    siteName: "CareerOS",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerOS preview image",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerOS",
    description:
      "The Operating System for Your Next Career. Build. Apply. Interview. Get Hired.",
    images: ["/og/og-image.png"],
    creator: "@vitanovadesigns",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "CareerOS",
    "resume builder",
    "cover letter builder",
    "job application tracker",
    "interview preparation",
    "career tools",
    "job search tools",
    "AI resume builder",
    "professional profile",
    "career management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="author" content="VitaNova Designs" />
          <meta
            name="keywords"
            content="resume builder, cover letter, job search, AI resumes, professional profile, job tracker, job applications, career tools, resume templates, cover letter templates, job search tools, career management, job search assistant"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.maxresumebuilder.com" />
        </head>

        <body className={inter.className}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
