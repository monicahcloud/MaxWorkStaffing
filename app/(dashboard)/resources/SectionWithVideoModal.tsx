"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type VideoItem = {
  src: string;
  poster: StaticImageData | string;
  label?: string;
};

interface SectionWithVideoModalProps {
  title: string;
  description?: string;
  videos: VideoItem[]; // one or more videos
}

export default function SectionWithVideoModal({
  title,
  description = "",
  videos,
}: SectionWithVideoModalProps) {
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  // Simple slide-in for both columns
  const slideLeft = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const slideRight = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-5">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 text-lg">
          {description}
        </p>
      )}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-10  items-center">
        {/* ───────── Videos grid ───────── */}
        <motion.div
          variants={slideLeft}
          className={`grid gap-6 ${
            videos.length === 1 ? "" : "sm:grid-cols-2"
          }`}>
          {videos.map((v) => (
            <Dialog
              key={v.src}
              open={openSrc === v.src}
              onOpenChange={(isOpen) => !isOpen && setOpenSrc(null)} // ⬅ only reset on close
            >
              <DialogTrigger asChild>
                <div>
                  <button
                    onClick={() => setOpenSrc(v.src)}
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border group">
                    <Image
                      src={v.poster}
                      alt={v.label ?? "Video poster"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition group-hover:scale-105">
                      <span className="text-white text-5xl bg-red-600 rounded-full p-4 shadow-lg">
                        ▶
                      </span>
                    </div>
                  </button>
                  {v.label && (
                    <span className="mt-2 text-sm text-center text-muted-foreground block">
                      {v.label ?? "Video"}
                    </span>
                  )}
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full p-0 bg-black rounded-lg overflow-hidden aspect-video">
                <button
                  onClick={() => setOpenSrc(null)}
                  className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
                <iframe
                  src={`${v.src}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>

        {/* ───────── Text content ───────── */}
        <motion.div variants={slideRight}></motion.div>
      </motion.div>
    </section>
  );
}
