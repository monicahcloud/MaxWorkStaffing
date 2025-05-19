import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CoverLetterRichEditor({ richText, setRichText }: any) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Textarea
          className="min-h-[300px] font-mono"
          value={richText}
          onChange={(e) => setRichText(e.target.value)}
        />
        <Button variant="default">Save Rich Text</Button>
      </CardContent>
    </Card>
  );
}
