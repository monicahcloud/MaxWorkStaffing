import { Separator } from "./ui/separator";

function SectionTitle({ text, subtext }: { text: string; subtext: string }) {
  return (
    <div>
      <h2 className="text-3xl font-medium  tracking-wider capitalize mb-2">
        {text}
      </h2>
      <p className="text-sm text-muted-foreground mb-8">{subtext}</p>
      <Separator />
    </div>
  );
}
export default SectionTitle;
