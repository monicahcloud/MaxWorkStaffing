"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
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
  generateAI?: (type: string) => void;
  loading?: boolean;
  type?: string;
  value?: string;
}

export default function RichTextEditor({
  onChange,
  placeholder = "Start typing here...",
  generateAI,
  loading,
  type,
  value = "",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder,
      }),
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
      if (onChange) onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="space-y-4">
      {editor && (
        <>
          <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
            <Button
              type="button"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold") ? "bg-blue-800 text-white" : ""
              }>
              Bold
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic") ? "bg-blue-800 text-white" : ""
              }>
              Italic
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={
                editor.isActive("underline") ? "bg-blue-800 text-white" : ""
              }>
              Underline
            </Button>
            {/* <Button
              type="button"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                editor.isActive("bulletList") ? "bg-blue-800 text-white" : ""
              }>
              • List
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive("orderedList") ? "bg-blue-800 text-white" : ""
              }>
              1. List
            </Button> */}

            <Button
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}>
              Undo
            </Button>
            <Button
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}>
              Redo
            </Button>
            <Button
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" })
                  ? "bg-primary text-white"
                  : ""
              }>
              Left
            </Button>
            <Button
              size="sm"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" })
                  ? "bg-primary text-white"
                  : ""
              }>
              Center
            </Button>
            <Button
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" })
                  ? "bg-primary text-white"
                  : ""
              }>
              Right
            </Button>
          </div>

          <EditorContent editor={editor} />
        </>
      )}

      <div className="flex justify-end">
        <Button
          variant="outline"
          type="button"
          size="sm"
          disabled={loading}
          onClick={() => generateAI?.(type || "")}
          className="border-primary text-primary flex gap-2">
          {loading ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {loading ? "Generating..." : "Generate from AI"}
        </Button>
      </div>
    </div>
  );
}
