"use client";

import { secondaryTools } from "./feature-data";

export function SecondaryToolsSection() {
  return (
    <section className="bg-slate-50/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {secondaryTools.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="space-y-4 p-4 text-center md:text-left">
                <Icon className="mx-auto h-8 w-8 text-red-600 md:mx-0" />

                <h4 className="text-xl font-black uppercase tracking-tight text-black">
                  {feature.title}
                </h4>

                <p className="font-medium leading-relaxed text-slate-500">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
