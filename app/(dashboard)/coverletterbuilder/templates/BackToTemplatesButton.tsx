import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; // Optional icon

export default function BackToTemplatesButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.push("/coverletterbuilder")}
      className="mb-4 flex items-center gap-2">
      <ArrowLeft size={16} />
      Back to Templates
    </Button>
  );
}
