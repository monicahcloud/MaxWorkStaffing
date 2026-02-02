/**
 * Extracts structured fields like duties, responsibilities, clearance, etc.
 * from a raw federal resume work experience description.
 */
export function extractFederalFields(description: string) {
  const clean = description.replace(/\r\n/g, "\n");

  const extract = (labelRegex: string) => {
    const regex = new RegExp(
      `${labelRegex}[:\\s\\-]*([\\s\\S]*?)(?=\n[A-Z]|\\n\\n|$)`,
      "i"
    );
    const match = clean.match(regex);
    return match ? match[1].trim() : "";
  };

  const gradeMatch = clean.match(/GS[\s\-]?(\d{1,2})/i);
  const hoursMatch = clean.match(/(\d{1,3})\s*hrs?\.?/i);
  const clearanceMatch = clean.match(
    /(TS\/SCI|Secret|Top Secret|Public Trust)/i
  );

  return {
    duties: extract("Duties"),
    responsibilities: extract("Responsibilities"),
    accomplishments: extract(
      "Key Accomplishments|Key Achievements|Accomplishments"
    ),
    grade: gradeMatch ? `GS-${gradeMatch[1]}` : "",
    hours: hoursMatch ? `${hoursMatch[1]} hrs/wk` : "",
    clearance: clearanceMatch ? clearanceMatch[1] : "",
  };
}
