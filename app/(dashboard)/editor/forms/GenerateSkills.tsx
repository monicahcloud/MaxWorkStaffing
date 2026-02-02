import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateSkills } from "./action"; // Assuming this function generates skills based on the job title
import { Plus } from "lucide-react";

const DEFAULT_SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Adaptability",
  "Time management",
  "Critical thinking",
  "Collaboration",
  "Leadership",
  "Work ethic",
  "Creativity",
];

export default function GenerateSkillsForm({
  // resumeData,
  onSkillsGenerated,
  onJobTitleSearched,
  onSuggestedSkills,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resumeData: any;
  onSkillsGenerated: (skills: string[]) => void;
  onJobTitleSearched: (title: string) => void;
  onSuggestedSkills: (skills: string[]) => void;
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [suggestedSkills, setSuggestedSkills] =
    useState<string[]>(DEFAULT_SOFT_SKILLS);
  const [loading, setLoading] = useState(false);

  // Only set default skills when the component is mounted (not when searched)
  useEffect(() => {
    if (!jobTitle.trim()) {
      // If jobTitle is empty, keep the default skills
      setSuggestedSkills(DEFAULT_SOFT_SKILLS);
    }
  }, [jobTitle]);

  const handleSearch = async () => {
    if (!jobTitle.trim()) return; // Don't search if the job title is empty

    try {
      setLoading(true);

      // Call the function to generate skills based on job title
      const aiSkills = await generateSkills({ jobTitle });

      if (aiSkills && aiSkills.length > 0) {
        // Limit to 100 skills if necessary
        const limitedSkills = aiSkills.slice(0, 100);

        // Set the generated skills to suggestedSkills
        setSuggestedSkills(limitedSkills);
        onJobTitleSearched(jobTitle);
        onSuggestedSkills(limitedSkills); // ✅ set suggested skill list in parent

        // // Pass the generated skills to the parent component
        // onSkillsGenerated(limitedSkills);
      } else {
        console.error("No skills generated for this job title.");
      }
    } catch (err) {
      console.error("Failed to generate AI skills", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex gap-2">
        <Input
          placeholder="Enter job title (e.g., Product Manager)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(); // Trigger the search on Enter key
            }
          }}
        />
        <Button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Find Skills"}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {/* Display skills from the generated list */}
        {suggestedSkills.length === 0 && !loading && (
          <p className="text-sm text-center">
            No skills available. Please search a job title.
          </p>
        )}
        {suggestedSkills.map((skill, idx) => (
          <Button
            variant="outline"
            type="button"
            key={idx}
            onClick={() => onSkillsGenerated([skill])} // This triggers parent to add one skill
            className="flex items-center justify-between px-3 py-1.5 border rounded hover:bg-muted">
            <span className="truncate">{skill}</span>
            <Plus className="ml-2 w-4 h-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
