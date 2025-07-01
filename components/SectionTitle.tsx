import { Separator } from "./ui/separator";
import { ReactNode } from "react";

function SectionTitle({ text, subtext }: { text: string; subtext: ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-900 tracking-wider capitalize mb-2">
        {text}
      </h2>
      <p className="text-md text-muted-foreground mb-8">{subtext}</p>
      <Separator />
    </div>
  );
}

export default SectionTitle;
