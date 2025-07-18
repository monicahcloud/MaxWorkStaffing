// "use client";

// import { Button } from "@/components/ui/button";
// import usePremiumModal from "@/hooks/usePremiumModal";
// import { PlusSquare } from "lucide-react";
// import Link from "next/link";
// interface CreateCoverLetterButtonProps {
//   canCreate: boolean;
// }
// export default function CreateLetterButton({
//   canCreate,
// }: CreateCoverLetterButtonProps) {
//   const premiumModal = usePremiumModal();

//   // if (canCreate) {
//   //   return (
//   //     <Button asChild className="new-resume mx-auto flex w-fit gap-2">
//   //       <Link href="/coverletterbuilder">
//   //         <PlusSquare className="size-5" />
//   //         Create New Cover Letter
//   //       </Link>
//   //     </Button>
//   //   );
//   // }

//   return (
//     <Button
//       onClick={() => premiumModal.setOpen(true)}
//       className="mx-auto flex w-fit gap-2">
//       <PlusSquare className="size-5" />
//       Create New Resume
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function CreateLetterButton() {
  return (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <Link href="/coverletterbuilder">
        <PlusSquare className="size-5" />
        Create New Cover Letter
      </Link>
    </Button>
  );
}
