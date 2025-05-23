// "use client";

import { Hero } from "@/components/landingPage/Hero";
import { NavBar } from "@/components/landingPage/NavBar";

// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Image from "next/image";
// import logo from "../assets/logo.png";
// import LandingImg from "../assets/LandingImg.jpg";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//   const { isSignedIn, isLoaded } = useAuth();
//   const router = useRouter();

//   // Redirect authenticated users to /home
//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.push("/home");
//     }
//   }, [isSignedIn, isLoaded, router]);

//   if (!isLoaded || isSignedIn) return null;

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-6 ">
//       {/* Header with logo */}

//       <header className="max-w-prose space-y-3 text-center ">
//         <Image
//           src={logo}
//           alt="Client portal hero image"
//           width={450}
//           height={450}
//           className="mx-auto mt-10 mb-5"
//         />
//         <h1 className="text-5xl font-bold">
//           Welcome to the <br /> MaxWork
//           <span className="text-red-700">Client </span>
//           Portal
//         </h1>
//         <h3 className="text-lg text-gray-700">
//           Your journey to career success starts here. Build a standout resume,
//           stay on top of your job search, and walk into every interview with
//           confidence. <br />
//           Let&apos;s get to work!
//         </h3>
//       </header>

//       <div className=" mx-auto justify-center">
//         <Image
//           src={LandingImg}
//           alt="Client portal hero image"
//           width={700}
//           height={700}
//           className="mx-auto md:ms-0 rounded-2xl shadow-lg justify-center items-center text-center"
//         />

//         <Button
//           asChild
//           className="text-3xl mx-auto mt-4 flex rounded-xl px-4 py-5 border border-black bg-red-700 text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
//           <Link href="/sign-in">Let&apos;s Get Started</Link>
//         </Button>
//       </div>
//     </main>
//   );
// }

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavBar />
        <Hero />
      </main>
    </>
  );
}
