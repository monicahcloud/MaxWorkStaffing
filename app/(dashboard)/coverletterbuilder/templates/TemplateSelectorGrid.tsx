// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { templateMetadata } from "./template";
// import { useRouter } from "next/navigation";

// interface TemplateGridProps {
//   selectedTemplateId: string;
//   setSelectedTemplateId: (id: string) => void;
// }

// export function TemplateSelectorGrid({
//   selectedTemplateId,
//   setSelectedTemplateId,
// }: TemplateGridProps) {
//   const router = useRouter();
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {templateMetadata.map((template) => (
//         <Card
//           key={template.id}
//           className={`cursor-pointer hover:ring-2 hover:ring-primary transition ${
//             selectedTemplateId === template.id ? "ring-2 ring-primary" : ""
//           }`}
//           onClick={() =>
//             router.push(`/coverletter/builder?template=${template.id}`)
//           }>
//           <CardContent className="p-4">
//             <h3 className="font-bold text-lg mb-2">{template.name}</h3>
//             <div className="text-muted-foreground text-sm">
//               Preview here (optional)
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
