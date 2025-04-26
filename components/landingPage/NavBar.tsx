import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import { RainbowButton } from "./RainbowButton";

export function NavBar() {
  return (
    <div className="flex items-center justify-between py-2 mt-4 -mb-6">
      <Link href="/" className="flex items-center gap-10">
        <Image
          src={Logo}
          alt="Logo"
          width={180} // wider
          height={80} // not too tall
          priority
        />

        {/* <h3 className="text-3xl font-semibold">
          Path<span className="text-red-600">Builder</span>
        </h3> */}
      </Link>
      <Link href="/sign-in">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
