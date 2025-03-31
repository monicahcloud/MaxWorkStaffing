import React from "react";
import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

import logo from "../../../assets/maxworklogo.png";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Your Resumes",
};

function page() {
  return (
    <main>
      <SectionTitle text="My Resumes" subtext="" />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
          <Link href="/resumebuilder">
            <div className=" border-t-red-700 border-t-8 p-14 bg-gradient-to-b from-red-400 via-white to-black flex flex-col items-center justify-center rounded-t-lg h-[280px] hover:scale-105 transition-all hover:shadow-md shadow-primary">
              <div className="items-center flex justify-center">
                <Image
                  priority
                  src={logo}
                  alt="thumbnail"
                  width={150}
                  height={150}
                  objectFit="contain"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default page;
