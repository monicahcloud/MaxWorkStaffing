import React from "react";
import { resumes } from "../utils/resumes";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  activeImage: number;
  clickNext: () => void;
  clickPrev: () => void;
};

const Description = ({ activeImage, clickNext, clickPrev }: Props) => {
  return (
    <div className="grid place-items-start w-full bg-white text-black relative md:rounded-tr-3xl md:rounded-br-3xl max-h-[60vh]">
      <div className="uppercase text-xs font-semibold absolute right-4 top-2 text-red-600 underline"></div>
      {resumes.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[60vh] py-10 md:px-10 px-6 text-left"
              : "hidden"
          }`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeInOut", duration: 2 }}
            className="w-full">
            <div className="py-6 text-4xl font-extrabold text-center text-black">
              {elem.title}
            </div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-40 italic text-gray-800 overflow-auto">
              {elem.desc}
            </div>
          </motion.div>

          <Link href="/resumebuilder" passHref>
            <button className="bg-red-600 text-white uppercase px-4 py-2 rounded-md my-6 hover:bg-red-700 transition">
              View Templates
            </button>
          </Link>

          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer text-red-600 hover:text-red-800"
              onClick={clickPrev}>
              <ChevronLeft size={28} />
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer text-red-600 hover:text-red-800"
              onClick={clickNext}>
              <ChevronRight size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;
