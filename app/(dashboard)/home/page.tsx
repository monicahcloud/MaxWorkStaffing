export const dynamic = "force-dynamic";
import Image from "next/image";
import logo from "../../../assets/landingpage.png";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 -mt-30">
      <div className="max-w-prose space-y-3 text-center">
        <h1 className="text-5xl font-bold">
          Welcome to the <br /> MaxWork{" "}
          <span className="text-red-700">Client </span>
          Portal
        </h1>
        <h3 className="text-lg text-gray-700">
          Your journey to career success starts here. Build a standout resume,
          stay on top of your job search, and walk into every interview with
          confidence. Let&apos;s get to work!
        </h3>
        <Image
          src={logo}
          alt="Client portal hero image"
          width={700}
          height={700}
          className="mx-auto md:ms-0 rounded-2xl shadow-lg"
        />
      </div>
    </main>
  );
}

export default page;
