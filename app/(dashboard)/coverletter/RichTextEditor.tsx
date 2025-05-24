"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, LoaderCircle } from "lucide-react";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  onChange?: (html: string) => void;
  placeholder?: string;
  loading?: boolean;
  value?: string;
  generateAI?: (params: {
    jobTitle: string;
    yearsExperience?: string;
    achievements?: string;
    tools?: string;
  }) => Promise<void>;
}

export default function RichTextEditor({
  onChange,
  placeholder = "Start typing here...",
  loading = false,
  value = "",
  generateAI,
}: Props) {
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [yearsExperienceInput, setYearsExperienceInput] = useState("");
  const [achievementsInput, setAchievementsInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full border p-4 rounded-md outline-none focus:ring-2 focus:ring-primary",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleGenerateAI = async () => {
    if (!jobTitleInput.trim() || !generateAI) return;

    setIsGenerating(true);
    try {
      await generateAI({
        jobTitle: jobTitleInput,
        yearsExperience: yearsExperienceInput,
        achievements: achievementsInput,
        tools: toolsInput,
      });
    } catch (error) {
      console.error("AI generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
          {["bold", "italic", "underline"].map((cmd) => (
            <Button
              key={cmd}
              type="button"
              size="sm"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  [`toggle${cmd[0].toUpperCase() + cmd.slice(1)}` as any]()
                  .run()
              }
              className={editor.isActive(cmd) ? "bg-blue-800 text-white" : ""}>
              {cmd.charAt(0).toUpperCase() + cmd.slice(1)}
            </Button>
          ))}
          <Button size="sm" onClick={() => editor.chain().focus().undo().run()}>
            Undo
          </Button>
          <Button size="sm" onClick={() => editor.chain().focus().redo().run()}>
            Redo
          </Button>
          {["left", "center", "right"].map((align) => (
            <Button
              key={align}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign(align).run()}
              className={
                editor.isActive({ textAlign: align })
                  ? "bg-primary text-white"
                  : ""
              }>
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </Button>
          ))}
        </div>
      )}

      <EditorContent editor={editor} />

      {/* AI Inputs + Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input
          placeholder="Job title (e.g. Product Designer)"
          value={jobTitleInput}
          onChange={(e) => setJobTitleInput(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Years of experience (e.g. 5)"
          value={yearsExperienceInput}
          type="number"
          onChange={(e) => setYearsExperienceInput(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Key achievements (comma or line separated)"
          value={achievementsInput}
          onChange={(e) => setAchievementsInput(e.target.value)}
          className="w-full md:col-span-2"
        />
        <Input
          placeholder="Tools & technologies (comma separated)"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
          className="w-full md:col-span-2"
        />
      </div>

      <div className="flex items-center gap-2 justify-end">
        <Button
          variant="outline"
          type="button"
          size="sm"
          disabled={loading || isGenerating || !jobTitleInput.trim()}
          onClick={handleGenerateAI}
          className="border-primary text-primary flex gap-2 whitespace-nowrap">
          {isGenerating ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" />
              Generating...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
