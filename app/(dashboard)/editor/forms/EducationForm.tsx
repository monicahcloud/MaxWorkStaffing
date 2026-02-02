"use client";

import React, { useEffect, useMemo } from "react";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// import { EducationTips } from "@/components/EducationTips";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

function EducationForm({ resumeData, setResumeData }: EditorFormProps) {
  // SOURCE OF TRUTH: Get category from Registry
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setResumeData({
        ...resumeData,
        education: values.education?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 education-info">
      <div className="space-y-1.5 text-center">
        {/* <EducationTips /> */}
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Education
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Highlight your academic background for the{" "}
          <span className="text-blue-600 font-bold">{themeCategory}</span>{" "}
          layout.
        </p>
        <Form {...form}>
          <form className="space-y-4 text-left">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}>
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}>
                {fields.map((field, index) => (
                  <EducationItem
                    key={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    id={field.id}
                    category={themeCategory}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                type="button"
                className="rounded-full border-dashed border-2 px-10 h-12 hover:bg-slate-50 transition-all"
                onClick={() =>
                  append({
                    degree: "",
                    location: "",
                    school: "",
                    startDate: "",
                    endDate: "",
                  })
                }>
                <PlusCircle className="mr-2 size-4" />
                Add Education / Certification
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EducationForm;

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
  category: string;
}

function EducationItem({
  form,
  index,
  remove,
  id,
  category,
}: EducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "space-y-5 border rounded-3xl bg-white p-6 transition-all duration-200",
        isDragging
          ? "shadow-2xl z-50 cursor-grabbing border-blue-200 scale-105"
          : "shadow-sm border-slate-100"
      )}>
      <div className="flex justify-between items-center border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            EDU {index + 1}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {category} Section
          </span>
        </div>
        <GripHorizontal
          className="size-5 cursor-grab text-slate-300 hover:text-slate-600 transition-colors"
          {...attributes}
          {...listeners}
        />
      </div>

      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-bold uppercase text-slate-500 ml-1">
              Degree / Certificate Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. B.S. in Computer Science"
                className="rounded-xl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`education.${index}.school`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                Institution Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. University of Georgia"
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`education.${index}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                Location
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Athens, GA"
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                Start Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="rounded-xl"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                End Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="rounded-xl"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="size-1.5 bg-blue-500 rounded-full animate-pulse" />
        <FormDescription className="text-[10px] italic">
          Leave <span className="font-bold">end date</span> empty if currently
          enrolled.
        </FormDescription>
      </div>

      <div className="flex justify-end border-t border-slate-50 pt-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
          onClick={() => remove(index)}>
          <Trash2 className="size-3 mr-2" />
          Delete Entry
        </Button>
      </div>
    </div>
  );
}
