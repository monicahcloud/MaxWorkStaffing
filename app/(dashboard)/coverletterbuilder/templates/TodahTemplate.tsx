// templates/MinimalTemplate.tsx
"use client";
export function MinimalTemplate(props: TemplateProps) {
  return (
    <div className="p-6 font-sans text-sm space-y-4 text-gray-900">
      <div className="text-right">{new Date().toLocaleDateString()}</div>
      <div>
        <strong>{props.recipientName}</strong>
        <br />
        {props.companyName}
      </div>
      <p>Dear {props.recipientName || "Hiring Manager"},</p>
      <p>{props.body}</p>
      <p>
        Thank you for considering my application for the{" "}
        {props.jobTitle || "[Job Title]"} position at{" "}
        {props.companyName || "[Company Name]"}.
      </p>
      <p>
        Sincerely,
        <br />
        {props.userName}
        <br />
        {props.userEmail}
      </p>
    </div>
  );
}

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string; // URL or base64
}

export function TodahTemplate({
  recipientName,
  companyName,
  jobTitle,
  body,
  userName,
  userEmail,
  userPhone,
  userAddress,
  userPhoto,
}: Props) {
  return (
    <Card className="text-gray-900">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6 border-b pb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-wide">{userName}</h1>
            <p className="uppercase text-sm tracking-[0.25em] text-gray-500">
              {jobTitle || "Professional Title"}
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <strong>P:</strong> {userPhone || "(123) 456-7890"} &nbsp;&nbsp;
                <strong>E:</strong> {userEmail || "email@example.com"}
              </p>
              <p>
                <strong>A:</strong>{" "}
                {userAddress || "123 Anywhere St., Any City, ST 12345"}
              </p>
            </div>
          </div>
          {userPhoto && (
            <div className="shrink-0">
              <Image
                src={userPhoto}
                alt="User Photo"
                width={100}
                height={100}
                className="rounded-full object-cover border border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Dear {recipientName || "Hiring Manager"},</strong>
          </p>
          <p>{body || "[Your cover letter body content will appear here.]"}</p>

          <p>Thank you for your consideration.</p>

          <div className="pt-6 space-y-2">
            <p>Sincerely,</p>
            <p className="text-xl font-signature">{userName}</p>
            <p className="font-semibold">{userName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
