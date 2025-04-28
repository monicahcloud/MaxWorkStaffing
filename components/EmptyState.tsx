import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface iAppProps {
  title: string;
  description: string;
  buttontext: string;
  href: string;
}

export function EmptyState({
  buttontext,
  description,
  href,
  title,
}: iAppProps) {
  return (
    <div className="flex flex-col flex-1 h-ful items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in  fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center">
        {description}
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} className={buttonVariants()}>
              <PlusCircle className="size-4 mr-2" /> {buttontext}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg border border-primary/60 text-base font-medium">
            Add a new job to start tracking your applications.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
