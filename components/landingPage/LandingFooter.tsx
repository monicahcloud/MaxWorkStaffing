import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    label: "Resume Builder",
    href: "/resumebuilder",
  },
  {
    label: "Job Search",
    href: "/jobsearch",
  },
  {
    label: "Job Tracker",
    href: "/jobs",
  },
  {
    label: "Interview AI",
    href: "/mockinterview",
  },
  {
    label: "Career Blog",
    href: "/blog",
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Image
            src="/public/CareerOSLogo.png"
            alt="CareerOS"
            width={160}
            height={40}
          />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            The Operating System for Your Next Career.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-black md:justify-start">
          {footerLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="transition-colors hover:text-red-600">
                {link.label}
              </Link>

              {index < footerLinks.length - 1 ? (
                <span aria-hidden="true" className="text-slate-300">
                  |
                </span>
              ) : null}
            </span>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <p className="text-sm font-black uppercase tracking-tighter text-slate-900">
            Career <span className="text-red-700">OS</span>
          </p>

          <a
            href="https://www.vitanovadesigns.cloud"
            target="_blank"
            rel="noopener noreferrer">
            <p className="mt-1 text-[10px] font-bold uppercase italic text-slate-400">
              © {new Date().getFullYear()} Built by VitaNova Designs.
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
