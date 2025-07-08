"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* --------------------------------------------------
   Structured Interview Tips
   -------------------------------------------------- */
const interviewSections = [
  {
    title: "Before the Interview",
    tips: [
      {
        label: "Research the Company",
        description:
          "Understand the company’s mission, values, recent news and products so you can connect your answers to what matters most to them.",
        example:
          "Scan the company’s press releases and LinkedIn page; note one initiative you admire to weave into your response.",
      },
      {
        label: "Understand the Role",
        description:
          "Break down the job description into required skills and prepare examples for each.",
        example:
          "Highlight a past project that mirrors the main responsibility listed in the posting.",
      },
      {
        label: "Practice Common Questions",
        description:
          "Rehearse answers aloud using the STAR or CAR framework to stay concise and focused on results.",
        example:
          "Record yourself answering “Tell me about a time you solved a problem” and review for clarity.",
      },
      {
        label: "Plan Logistics",
        description:
          "Confirm location, technology set‑up, and travel time so nothing derails your punctuality.",
        example:
          "If virtual, test your webcam and mic the night before on the same platform.",
      },
      {
        label: "Dress for Success",
        description:
          "Match the company’s culture but err on the side of professional. Neat grooming counts.",
        example:
          "For tech‑casual firms, a pressed button‑down and dark jeans still look polished on camera.",
      },
    ],
  },
  {
    title: "During the Interview",
    tips: [
      {
        label: "Make a Strong First Impression",
        description:
          "Smile, greet each interviewer by name, and project confident body language from the start.",
        example:
          "Offer a firm handshake (or warm virtual greeting) and maintain eye contact.",
      },
      {
        label: "Listen Actively",
        description:
          "Allow the interviewer to finish before responding; paraphrase questions to confirm understanding.",
        example:
          "“Just to clarify, you’d like an example of my project‑management skills in a fast‑paced environment?”",
      },
      {
        label: "Use STAR / CAR Answers",
        description:
          "Structure your stories so hiring managers hear the context, your actions, and measurable results.",
        example:
          "“Situation: sales were flat… Action: I launched a referral program… Result: revenue grew 18 %.”",
      },
      {
        label: "Mind Your Non‑Verbals",
        description:
          "Sit upright, nod occasionally, and keep hand gestures within frame (for virtual interviews).",
        example: "Place a sticky note near your webcam that reads “Smile”.",
      },
      {
        label: "Ask Thoughtful Questions",
        description:
          "Demonstrate curiosity about team goals, success metrics, and company culture.",
        example:
          "“How will success be measured in the first six months for this role?”",
      },
    ],
  },
  {
    title: "After the Interview",
    tips: [
      {
        label: "Send a Thank‑You Email",
        description:
          "Follow up within 24 hours expressing appreciation and reinforcing fit.",
        example:
          "Reference a specific discussion point to make your note memorable.",
      },
      {
        label: "Reflect & Document",
        description:
          "Jot down what went well and any questions you stumbled on; use this to sharpen future prep.",
        example:
          "Capture them in a running interview journal right after the call.",
      },
      {
        label: "Connect on LinkedIn (Optional)",
        description:
          "If rapport felt strong, send a brief personalised connection request.",
        example: "Mention a shared passion or insight from your conversation.",
      },
      {
        label: "Stay Professionally Patient",
        description:
          "Respect the timeline given. If none was shared, a polite follow‑up after a week is fine.",
        example:
          "“I’m still very interested—could you share an updated timeline for next steps?”",
      },
    ],
  },
];

/* --------------------------------------------------
   Component
   -------------------------------------------------- */
export default function InterviewTipsTabs() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <hr className="border-red-500 mb-6" />
      <h1 className="text-4xl font-black text-red-600 text-center mb-2">
        Essential Interview Tips
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
        A practical guide to help you prepare, perform, and follow&nbsp;up
        effectively.
      </p>
      <Separator className="mb-8" />

      {/* ───────── Tabs wrapper ───────── */}
      <Tabs defaultValue={interviewSections[0].title} className="w-full">
        {/* Tab buttons */}
        <TabsList className="flex justify-center items-center mx-auto gap-10 mb-8">
          {interviewSections.map((s) => (
            <TabsTrigger key={s.title} value={s.title}>
              <Lightbulb className="text-red-600" /> {s.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab panels */}
        {interviewSections.map((section) => (
          <TabsContent key={section.title} value={section.title}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.tips.map((tip, idx) => (
                <Card
                  key={tip.label}
                  className="shadow-sm hover:shadow-lg transition">
                  <CardHeader className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary">
                      {idx + 1}
                    </Badge>
                    <span className="font-medium leading-tight">
                      {tip.label}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>{tip.description}</p>
                    <div className="text-sm text-muted-foreground bg-muted/40 p-3 rounded">
                      <span className="font-semibold">Example:</span>{" "}
                      {tip.example}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
