"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { EditorFormProps } from "@/lib/types";
import { Trash2 } from "lucide-react";

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
    setTechSkills([...techSkills, { name: "", rating: 3 }]);
  };

  const handleUpdateSkill = (index: number, updated: TechSkill) => {
    const updatedSkills = [...techSkills];
    updatedSkills[index] = updated;
    setTechSkills(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    setTechSkills(techSkills.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setResumeData({ ...resumeData, techSkills });
  }, [techSkills]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Technical Expertise
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Rate your proficiency in specific tools or languages.
        </p>
      </div>

      <div className="space-y-3">
        {techSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-blue-100">
            <div className="flex-1 w-full">
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-1 ml-1">
                Tool / Language
              </p>
              <Input
                value={skill.name}
                placeholder="e.g. TypeScript"
                className="rounded-xl"
                onChange={(e) =>
                  handleUpdateSkill(index, { ...skill, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col items-center px-4">
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">
                Proficiency
              </p>
              <Rating
                style={{ maxWidth: 100 }}
                value={skill.rating}
                onChange={(v) =>
                  handleUpdateSkill(index, { ...skill, rating: v })
                }
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-400 hover:text-red-600 self-end md:self-center"
              onClick={() => handleRemoveSkill(index)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-dashed border-2 px-8"
          onClick={handleAddSkill}>
          + Add Technical Skill
        </Button>
      </div>
    </div>
  );
}
