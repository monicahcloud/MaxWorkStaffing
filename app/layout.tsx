export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";

const base = new URL(env.NEXT_PUBLIC_BASE_URL);

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    template: "%s - Max ResumeBuilder",
    default: "Max ResumeBuilder Build a Job-Winning Resume Fast",
  },
  description:
    "Build ATS-friendly resumes and cover letters in minutes. Track job applications and search jobs with smart tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Max ResumeBuilder",
    description:
      "Create polished resumes and cover letters with AI. Track job applications, build a professional profile — all in one place.",
    url: base,
    siteName: "Max ResumeBuilder",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Max ResumeBuilder preview image",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Max ResumeBuilder",
    description:
      "Your AI-powered job search assistant. Resumes, cover letters, and tracking made easy.",
    images: ["/og/og-image.png"],
    creator: "@vitanovadesigns", // update to your brand
  },
  robots: {
    index: true,
    follow: true,
  },
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
            content="resume builder, cover letter, job search, AI resumes, professional profile, job tracker, job applications, career tools, resume templates, cover letter templates, job search tools"
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
