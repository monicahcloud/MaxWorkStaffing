"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

type SingleResourceProps = {
  title: string;
  image: string | StaticImageData;
  info: string;
  video?: string;
  componentId: string;
};

const SingleResource = ({
  title,
  image,
  info,
  video,
  componentId,
}: SingleResourceProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const scrollToDetails = () => {
    const target = document.getElementById(componentId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isVideoResource = !!video;

  return (
    <Card className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 p-6 items-center">
      {/* Media Section */}
      <div className="w-full aspect-video rounded-lg overflow-hidden border relative">
        {isVideoResource ? (
          showVideo ? (
            <iframe
              src={`${video}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"></iframe>
          ) : (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setShowVideo(true)}>
              <Image
                src={image}
                alt={title}
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-white text-4xl bg-red-600 rounded-full p-4 hover:scale-105 transition-transform">
                  ▶
                </div>
              </div>
            </div>
          )
        ) : (
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content Section */}
      <div>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl text-center md:text-3xl text-red-600 font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4 text-gray-700 space-y-4">
          <p className="text-center md:text-left">{info}</p>
          {isVideoResource && (
            <div className="flex justify-center">
              <Button
                className="text-lg font-semibold"
                onClick={scrollToDetails}>
                Learn More
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default SingleResource;
