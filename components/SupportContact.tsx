"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Logo from "../assets/logo.png";

function SupportContact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_jcfd75n", // Replace with your EmailJS Service ID
        "template_kx67uss", // Replace with your Template ID
        form.current,
        "XnLTFneXRVkwkphGD" // Replace with your Public Key
      )
      .then(
        () => {
          toast.success("Message sent! We'll get back to you shortly.");
          form.current?.reset();
        },
        (error) => {
          toast.error("Something went wrong. Please try again.");
          console.error("EmailJS error:", error);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-2xl mt-10">
      <Image
        src={Logo}
        alt="Logo"
        priority
        width={400}
        height={400}
        className="px-4 my-10 mx-auto"
      />

      <h2 className="text-2xl font-bold mb-4 text-center">
        Need Help? Contact Support
      </h2>

      <form ref={form} onSubmit={handleSubmit} className="space-y-4">
        <Input name="from_name" placeholder="Your Name" required />
        <Input
          name="from_email"
          type="email"
          placeholder="Your Email"
          required
        />
        <Textarea name="message" placeholder="Your Message" rows={5} required />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/faq"
          className="text-muted-foreground text-lg hover:underline">
          Need more help? View our FAQs
        </Link>
      </div>
    </div>
  );
}

export default SupportContact;
