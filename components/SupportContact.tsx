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

export default function SupportContact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_jcfd75n",
        "template_kx67uss",
        form.current,
        "XnLTFneXRVkwkphGD"
      )
      .then(() => {
        toast.success("✅ Message sent! We’ll get back to you shortly.");
        form.current?.reset();
      })
      .catch((error) => {
        toast.error("🚫 Oops! Something went wrong.");
        console.error("EmailJS error:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-5xl px-4 py-10 mx-auto">
      <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-50 p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <Image
            src={Logo}
            alt="VitaNova Logo"
            width={175}
            height={120}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">We're here to help</h1>
          <p className="text-muted-foreground max-w-md">
            Have a question, suggestion, or issue? Drop us a message and our
            team will get back to you as soon as possible.
          </p>
        </div>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 max-w-xl mx-auto">
          <Input
            name="name"
            placeholder="Full Name"
            required
            className="bg-white"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="bg-white"
          />
          <Textarea
            name="message"
            placeholder="Type your message..."
            rows={5}
            required
            className="bg-white"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full transition-all">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link href="/faq" className="text-sm text-blue-600 hover:underline">
            Still need help? Visit the FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
}
