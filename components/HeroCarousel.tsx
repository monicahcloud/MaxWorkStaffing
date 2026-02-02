"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

// Local assets: resume and cover letter templates
import HeroImage1 from "@/assets/fed.png";
import HeroImage2 from "@/assets/chron.png";
import HeroImage3 from "@/assets/simple.png";
import HeroImage4 from "@/assets/classic.png";
import HeroImage5 from "@/assets/modern.png";
import HeroImage6 from "@/assets/combo.png";
import HeroImage7 from "@/assets/minimal.png";

// All images to be displayed in the carousel
const images = [
  { src: HeroImage1 },
  { src: HeroImage5 },
  { src: HeroImage2 },
  { src: HeroImage4 },
  { src: HeroImage3 },
  { src: HeroImage6 },
  { src: HeroImage7 },
];

const imagesPerView = 3; // Number of visible images per slide

export function HeroCarousel() {
  const [current, setCurrent] = useState(0); // Current slide index
  const totalSteps = images.length - imagesPerView + 1; // Total scrollable steps

  // Automatically advance slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSteps);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSteps]);

  // Swipe gesture support (mobile + desktop)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % totalSteps),
    onSwipedRight: () =>
      setCurrent((prev) => (prev - 1 + totalSteps) % totalSteps),
    trackMouse: true, // allow mouse dragging too
  });

  return (
    <div
      {...swipeHandlers}
      className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white py-6 touch-pan-x">
      {/* Sliding wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${(100 / imagesPerView) * current}%)`,
          width: `${(100 / imagesPerView) * images.length}%`,
        }}>
        {/* Each slide item */}
        {images.map(({ src }, index) => (
          <div
            key={index}
            className="w-[calc(100%/3)] px-4 flex justify-center">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full max-w-xs rounded-xl shadow-md object-contain"
            />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === current;
          return (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border ${
                isActive
                  ? "bg-red-600 border-red-600 scale-110"
                  : "bg-gray-300 border-gray-300 hover:bg-red-400"
              }`}
              aria-label={`Slide group ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
