"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import { RainbowButton } from "./RainbowButton";

export function NavBar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={Logo}
            alt="Logo"
            width={160}
            height={80}
            priority
            className="object-contain"
          />
        </Link>

        <Link href="/sign-in">
          <RainbowButton>Login</RainbowButton>
        </Link>
      </div>
    </nav>
  );
}
