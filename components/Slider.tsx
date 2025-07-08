"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { resumes } from "../utils/resumes";
import Description from "./Description";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    setActiveImage((prev) => (prev === resumes.length - 1 ? 0 : prev + 1));
  };

  const clickPrev = () => {
    setActiveImage((prev) => (prev === 0 ? resumes.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeImage]);

  const current = resumes[activeImage];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-4 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-red-600">
        {current.title}
      </h2>

      {/* Image */}
      <div className="w-full aspect-[5/3] bg-black rounded-xl overflow-hidden">
        <Image
          src={current.src}
          alt={current.title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Description + Buttons */}
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </div>
  );
};

export default Slider;
