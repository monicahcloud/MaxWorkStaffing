import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { EditorFormProps } from "@/lib/types";

interface TechSkill {
  name: string;
  rating: number;
}

export default function TechnicalSkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [techSkills, setTechSkills] = useState<TechSkill[]>(
    resumeData.techSkills || []
  );

  const handleAddSkill = () => {
    const last = techSkills[techSkills.length - 1];
    if (last && last.name.trim() === "") return; // prevent adding if last is empty
    setTechSkills([...techSkills, { name: "", rating: 1 }]);
  };

  const handleUpdateSkill = (index: number, updated: TechSkill) => {
    const updatedSkills = [...techSkills];
    updatedSkills[index] = updated;
    setTechSkills(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const updated = techSkills.filter((_, i) => i !== index);
    setTechSkills(updated);
  };

  useEffect(() => {
    setResumeData({ ...resumeData, techSkills });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techSkills]);

  return (
    <div className="max-w-xl mx-auto space-y-6 technical-info">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Technical Skills</h2>
        <p className="text-sm text-muted-foreground">
          Rate each skill on a scale from 1 (Beginner) to 5 (Expert).
        </p>
      </div>

      {techSkills.map((skill, index) => (
        <div key={index} className="border p-4 rounded-md bg-white space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <Input
              aria-label={`Skill name ${index + 1}`}
              value={skill.name}
              placeholder="e.g. React.js"
              onChange={(e) =>
                handleUpdateSkill(index, {
                  ...skill,
                  name: e.target.value,
                })
              }
            />
            <div className="flex flex-col items-center">
              <Rating
                style={{ maxWidth: 120 }}
                value={skill.rating}
                onChange={(value) =>
                  handleUpdateSkill(index, {
                    ...skill,
                    rating: value,
                  })
                }
              />
              <div className="text-xs text-muted-foreground mt-1">
                {
                  ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"][
                    skill.rating - 1
                  ]
                }
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveSkill(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="mx-auto justify-center items-center flex">
        <Button type="button" onClick={handleAddSkill}>
          Add Technical Skill
        </Button>
      </div>
    </div>
  );
}
