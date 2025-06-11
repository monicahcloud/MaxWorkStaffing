"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
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
          <button
            type="button"
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className="w-full">
            <Card className="cursor-pointer hover:shadow-lg transition-all p-4">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative w-[300px] h-[400px]">
                  {template.image && (
                    <Image
                      src={template.image}
                      alt={template.name}
                      className="rounded-lg object-contain w-full h-full"
                    />
                  )}
                </div>
                <div className="w-full border-t border-gray-300" />
                <p className="text-center text-muted-foreground">
                  {template.name}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </main>
  );
}
