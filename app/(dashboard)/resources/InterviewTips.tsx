import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb } from "lucide-react";

// Data for each section
const interviewSections = [
  {
    title: "Before the Interview",
    tips: [
      {
        label: "Research the Company",
        description:
          "Understand the company’s mission, values, culture, and recent achievements to align your answers and show that you’re a good fit.",
        example:
          "Review the company's press releases, CSR initiatives, and market position.",
      },
      {
        label: "Understand the Role",
        description:
          "Be clear about the job description and the skills it requires to emphasize your relevant experiences during the interview.",
        example:
          "Familiarize yourself with the tools and campaigns relevant to the position.",
      },
      // ...add other tips from this section
    ],
  },
  {
    title: "During the Interview",
    tips: [
      {
        label: "Make a Strong First Impression",
        description:
          "Greet your interviewers with a smile, a firm handshake, and good eye contact.",
        example:
          "Offer a firm handshake and make eye contact as you greet each interviewer by name.",
      },
      // ...add other tips from this section
    ],
  },
  {
    title: "After the Interview",
    tips: [
      {
        label: "Follow Up",
        description: "Send a thank-you email within 24 hours of the interview.",
        example:
          "Express your appreciation and reiterate your interest in the position.",
      },
      // ...add other tips from this section
    ],
  },
];

export default function InterviewTipsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <hr className="mt-10 border-t-2 border-red-500 mb-4 w-full" />
      <h1 className="text-4xl font-bold mb-2 text-center">
        Essential Interview Tips
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        A practical guide to help you prepare, perform, and follow up for your
        next interview.
      </p>
      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {interviewSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              {section.title}
            </h2>
            <div className="flex flex-col gap-6">
              {section.tips.map((tip, idx) => (
                <Card
                  key={tip.label}
                  className="shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary">
                      {idx + 1}
                    </Badge>
                    <span className="font-medium">{tip.label}</span>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{tip.description}</p>
                    <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                      <span className="font-semibold">Example:</span>{" "}
                      {tip.example}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
