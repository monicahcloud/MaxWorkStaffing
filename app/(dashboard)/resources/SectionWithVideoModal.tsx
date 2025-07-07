"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  description: string;
  video: string;
  poster: StaticImageData | string;
  children: React.ReactNode;
  /** flips columns + animation direction on desktop */
  reverse?: boolean;
};

export default function SectionWithVideoModal({
  title,
  description,
  video,
  poster,
  children,
  reverse = false,
}: Props) {
  const [open, setOpen] = useState(false);

  /* Motion variants */
  const slideVideo = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const slideContent = {
    hidden: { opacity: 0, x: reverse ? -100 : 100 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Title centered over both columns */}
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-10">
        {title}
      </h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        {/* ─────────── Video (trigger) ─────────── */}
        <motion.div
          variants={slideVideo}
          className={`flex justify-center ${reverse ? "order-2 md:order-2" : "order-2 md:order-1"}`}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div
                className="w-full max-w-[380px] aspect-video relative rounded-lg overflow-hidden cursor-pointer shadow-lg border"
                onClick={() => setOpen(true)}
              >
                <Image
                  src={poster}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-5xl bg-red-600 rounded-full p-4 shadow-lg">
                    ▶
                  </span>
                </div>
              </div>
            </DialogTrigger>

            {/* Modal */}
            <DialogContent className="max-w-4xl w-full p-0 bg-black rounded-lg overflow-hidden aspect-video">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`${video}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* ─────────── Content ─────────── */}
        <motion.div
          variants={slideContent}
          className={`space-y-6 ${reverse ? "order-1 md:order-1" : "order-1 md:order-2"}`}
        >
          <p className="text-gray-700">{description}</p>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
