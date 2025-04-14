export const dynamic = "force-dynamic";
import Image from "next/image";
import logo from "../../../assets/landingpage.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 -mt-30">
      <div className="max-w-prose space-y-3 text-center">
        {/* <h1 className="text-5xl font-bold">
          Welcome to the <br /> MaxWork{" "}
          <span className="text-red-700">Client </span>
          Portal
        </h1>
        <h3 className="text-lg text-gray-700">
          Your journey to career success starts here. Build a standout resume,
          stay on top of your job search, and walk into every interview with
          confidence. Let’s get to work!
        </h3>
        <Image
          src={logo}
          alt="Client portal hero image"
          width={700}
          height={700}
          className="mx-auto md:ms-0 rounded-2xl shadow-lg"
        /> */}
        <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4">
          {/* Left column - Image */}
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={logo}
              alt="Landing page visual"
              className="rounded-xl shadow-lg w-full md:max-w-lg lg:max-w-xl  max-w-md object-contain"
              priority
              // style={{
              //   transform: "rotate(-8deg)", // tilt counter-clockwise (use positive for clockwise)
              // }}
            />
          </div>

          {/* Right column - Card */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full flex flex-col -mt-8 items-center justify-center gap-3 text-center">
              <Image
                src={logo}
                alt="logo"
                priority
                className=" w-full md:max-w-lg lg:max-w-xl  max-w-md object-contain"
              />
              <Button asChild className="text-3xl rounded-xl">
                <Link href="/sign-in">Let&apos;s Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default page;
