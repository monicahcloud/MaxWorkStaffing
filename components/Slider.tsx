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
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeImage]);

  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-4xl shadow-xl rounded-2xl overflow-hidden bg-white">
      <div className="w-full flex justify-center items-center transition-transform ease-in-out duration-500 p-4 md:p-0 bg-black">
        {resumes.map((elem, idx) => (
          <div
            key={elem.id}
            className={`${
              idx === activeImage ? "block" : "hidden"
            } w-full h-[60vh]`}>
            <Image
              src={elem.src}
              alt={elem.title}
              width={500}
              height={500}
              className="w-full h-full object-cover md:rounded-tl-3xl md:rounded-bl-3xl"
              priority
            />
          </div>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </main>
  );
};

export default Slider;
