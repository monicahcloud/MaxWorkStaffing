import React from "react";
import comingSoon from "../../../assets/comingsoon.jpg";
import Image from "next/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Personalized Profile",
};
function ProfessionalProfileRoute() {
  return (
    <>
      <Image src={comingSoon} alt="coming soon" priority />
    </>
  );
}

export default ProfessionalProfileRoute;
