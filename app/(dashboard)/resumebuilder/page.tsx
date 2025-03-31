import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <SectionTitle text="Choose a Template" subtext="" />
      <Button asChild variant="outline">
        <Link href="/editor">Choose a Template</Link>
      </Button>
    </>
  );
}

export default page;
