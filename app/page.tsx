import Image from "next/image";
import logo from "../assets/maxworklogo.png";
import { Button } from "@/components/ui/button";
import LandingImg from "../assets/LandingImg.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <header className="nax-w-6xl mx-auto md:px-4 px-8 py-6">
        <Image src={logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto md:px-4 px-8 h-screen -mt-20 items-center">
        <div>
          <Image
            src={LandingImg}
            alt="landing page image"
            className="hidden md:block rounded-lg "
          />
          <h1 className="capitalize text-4xl md:text-7xl font-bold text-center my-8">
            Client <span className="text-red-700">Portal</span>
          </h1>
          <p className="leading-loose max-w-md mt-4 text-center mx-auto">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt hic,
            error dolor, officiis aliquam molestiae quo voluptatum possimus
            eligendi quod placeat deserunt tempora ducimus impedit tenetur
            molestias cum voluptates officia.
          </p>

          <Button
            asChild
            className="mt-4 mx-auto items-center"
            variant="outline">
            <Link href="/home">Get Started</Link>
          </Button>
        </div>{" "}
      </section>
    </main>
  );
}
