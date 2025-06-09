import SectionTitle from "@/components/SectionTitle";
import React from "react";
import ManageSubscriptionButton from "../ManageSubscriptionButton";

function Page() {
  return (
    <main className="max-w-7xl  space-y-6 px-3 py-6 text-center">
      <SectionTitle
        text="Billing Success"
        subtext="The checkout was successful and your subscription has be activated. Enjoy!"
      />
      <ManageSubscriptionButton />
    </main>
  );
}

export default Page;
