// templates/MinimalTemplate.tsx
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
