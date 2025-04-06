import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <main className="max-w-7xl  space-y-6 px-3 py-6 text-center">
      <SectionTitle
        text="Billing Success"
        subtext="The checkout was successful and your Pro account has be activated. Enjoy!"
      />
      <Button asChild>
        <Link href="/resumes">Go to resumes</Link>
      </Button>
    </main>
  );
}

export default Page;
