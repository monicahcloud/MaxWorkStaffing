"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HeroImage1 from "@/assets/fed.png";
import HeroImage2 from "@/assets/chron.png";
import HeroImage3 from "@/assets/simple.png";
import HeroImage4 from "@/assets/classic.png";
import HeroImage5 from "@/assets/modern.png";
import HeroImage6 from "@/assets/combo.png";
import HeroImage7 from "@/assets/minimal.png";

const images = [
  { src: HeroImage1, title: "Federal Resume" },
  { src: HeroImage5, title: "Modern Cover Letter" },
  { src: HeroImage2, title: "Chronological Resume" },
  { src: HeroImage4, title: "Classic Cover Letter" },
  { src: HeroImage3, title: "Simple Cover Letter" },
  { src: HeroImage6, title: "Combination Resume" },
  { src: HeroImage7, title: "Minimal Cover Letter" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          height: "600px",
        }}>
        {images.map(({ src, title }, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-start px-10">
            <div className="flex flex-col justify-center h-full">
              <span
                className="text-4xl font-light tracking-widest leading-[2.5em] select-none bg-gradient-to-b from-red-800 via-red-500 to-red-300 text-transparent bg-clip-text drop-shadow-sm uppercase"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}>
                {title}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center h-full">
              <Image
                src={src}
                alt={title}
                priority={index === 0}
                className="h-8/10 object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-red-600" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
