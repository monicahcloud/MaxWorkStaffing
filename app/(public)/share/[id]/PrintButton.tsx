"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
      <Printer className="size-3" />
      Download PDF
    </button>
  );
}
