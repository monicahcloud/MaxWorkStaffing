"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RedirectToBilling() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/billing");
    }, 1800); // Delay before redirect

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-4">
      <Loader2 className="animate-spin w-6 h-6 text-red-500 mb-3" />
      <h2 className="text-base font-medium">Redirecting to pricing...</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Please wait while we take you to the billing page.
      </p>
    </div>
  );
}
