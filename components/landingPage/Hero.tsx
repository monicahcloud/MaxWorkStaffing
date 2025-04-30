import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../assets/LandingImg.jpg";
import { RainbowButton } from "./RainbowButton";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          ResumeBuilder 1.0
        </span>
        <h1 className="mt-8 text-4xl tracking-wide sm:text-6xl md:text-7xl lg:text-8xl font-semibold ">
          Resume<span className="text-red-600">Builder</span>
          <span className="block lg:text-6xl mt-4 text-rose-600  bg-clip-text">
            Build
            <span
              className="text-black mx-2 text-4xl align-middle"
              aria-hidden="true">
              {" "}
              |
            </span>
            Track
            <span
              className="text-black mx-2 text-4xl align-middle"
              aria-hidden="true">
              {" "}
              |
            </span>
            Succeed
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Everything you need to land your next job — build stunning resumes,
          track applications, and access career tools and resources to stay
          ahead in your job search.
        </p>

        <div className="mt-7 mb-1">
          <Link href="/sign-up">
            <RainbowButton>Let's Get Started</RainbowButton>
          </Link>
        </div>
      </div>

      <div className="relative items-center w-full py-12 mx-auto mt-8">
        <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z" fill="#ff0000" />

              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#B22222"
              />

              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#FF0000"
              />

              <path d="M400 0H128.6L106.2 134.75L400 78.75V0Z" fill="#ffffff" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <Image
          src={HeroImage}
          alt="Hero image"
          className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
