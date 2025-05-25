"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { templateMetadata } from "./template";

export default function TemplateSelectionPage() {
  const router = useRouter();

  const handleSelect = (templateId: string) => {
    const validTemplates = templateMetadata.map((t) => t.id);
    if (!templateId || !validTemplates.includes(templateId)) return;

    router.push(`/coverletterbuilder/editor?template=${templateId}`);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateMetadata.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer hover:ring-2 hover:ring-primary transition`}
            onClick={() => handleSelect(template.id)}>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{template.name}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Preview coming soon
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
