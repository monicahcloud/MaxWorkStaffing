import { Card, CardContent } from "@/components/ui/card";

interface Props {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName?: string;
  userEmail?: string;
}

export function CoverLetterPreview({
  recipientName,
  companyName,
  jobTitle,
  body,
  userName = "John Doe",
  userEmail = "johndoe@example.com",
}: Props) {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardContent className="pt-6 text-sm font-serif leading-relaxed whitespace-pre-wrap space-y-4">
        <div className="text-right">{today}</div>

        <div>
          {recipientName && <div>{recipientName}</div>}
          {companyName && <div>{companyName}</div>}
        </div>

        <div>
          <p>Dear {recipientName || "Hiring Manager"},</p>

          <p>
            {body || "Start typing your letter to see it previewed here..."}
          </p>

          <p>
            Thank you for considering my application for the{" "}
            {jobTitle || "[Job Title]"} role at{" "}
            {companyName || "[Company Name]"}.
          </p>

          <p>
            Sincerely,
            <br />
            {userName}
            <br />
            {userEmail}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
