"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperiencesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, PlusCircle, Trash2 } from "lucide-react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useMemo } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton";
import GenerateDutiesButton from "./GenerateDutiesButton";
import GenerateResponsibilitiesButton from "./GenerateResponsibilitiesButton";
// import { ExperienceTips } from "@/components/ExperienceTips";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import AIFeedbackBubble from "@/components/editor/AIFeedbackBubble";

function WorkExperienceForm({ resumeData, setResumeData }: EditorFormProps) {
  // SOURCE OF TRUTH: Get category from the Registry, not the resumeTitle/Type string
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

  const form = useForm<WorkExperiencesValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
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
    <div className="experience-info max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        {/* <ExperienceTips /> */}
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Work Experience
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Optimizing for your{" "}
          <span className="text-blue-600 font-bold">{themeCategory}</span>{" "}
          design.
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
                  <WorkExperienceItem
                    key={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    id={field.id}
                    category={themeCategory} // Use category for UI logic
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                type="button"
                className="rounded-full border-dashed border-2 px-10 h-12 hover:bg-slate-50"
                onClick={() =>
                  append({
                    position: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    status: "",
                    clearance: "",
                    duties: "",
                    responsibilities: "",
                    grade: "",
                    hours: "",
                  })
                }>
                <PlusCircle className="mr-2 size-4" />
                Add Professional Experience
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default WorkExperienceForm;

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperiencesValues>;
  index: number;
  remove: (index: number) => void;
  category: string;
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
  category,
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const isFederal = category === "federal";

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
            {index + 1}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {category} Archetype
          </span>
        </div>
        <GripHorizontal
          className="size-5 cursor-grab text-slate-300 hover:text-slate-600 transition-colors"
          {...attributes}
          {...listeners}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                Job Title
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Senior Analyst" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                Company
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Acme Corp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* FEDERAL FIELDS: Now triggers solely on the theme category */}
      {isFederal && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.grade`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[9px] font-black uppercase text-blue-600">
                  Grade (GS-XX)
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.status`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[9px] font-black uppercase text-blue-600">
                  Series
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.hours`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[9px] font-black uppercase text-blue-600">
                  Hrs/Wk
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.clearance`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[9px] font-black uppercase text-blue-600">
                  Clearance
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                Start Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                End Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* AI CONTENT SECTIONS */}
      {!isFederal ? (
        <FormField
          control={form.control}
          name={`workExperiences.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1">
                <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                  Description
                </FormLabel>
                <div className="flex gap-2">
                  <AIFeedbackBubble
                    text={field.value || ""}
                    category={category}
                  />
                  <GenerateWorkExperienceButton
                    category={category}
                    onWorkExperienceGenerated={(exp) =>
                      form.setValue(
                        `workExperiences.${index}.description`,
                        exp.description
                      )
                    }
                  />
                </div>
              </div>
              <FormControl>
                <Textarea {...field} className="min-h-[140px] rounded-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.duties`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1">
                  <FormLabel className="text-[10px] font-bold uppercase text-blue-600">
                    Duties
                  </FormLabel>
                  <GenerateDutiesButton
                    category={category}
                    jobTitle={
                      form.watch(`workExperiences.${index}.position`) || ""
                    }
                    onDutiesGenerated={(duties) =>
                      form.setValue(`workExperiences.${index}.duties`, duties)
                    }
                  />
                </div>
                <FormControl>
                  <Textarea {...field} className="rounded-xl bg-slate-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.responsibilities`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1">
                  <FormLabel className="text-[10px] font-bold uppercase text-blue-600">
                    Responsibilities
                  </FormLabel>
                  <GenerateResponsibilitiesButton
                    category={category}
                    jobTitle={
                      form.watch(`workExperiences.${index}.position`) || ""
                    }
                    onResponsibilitiesGenerated={(resp) =>
                      form.setValue(
                        `workExperiences.${index}.responsibilities`,
                        resp
                      )
                    }
                  />
                </div>
                <FormControl>
                  <Textarea {...field} className="rounded-xl bg-slate-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="flex justify-end border-t border-slate-50 pt-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
          onClick={() => remove(index)}>
          <Trash2 className="size-3 mr-2" />
          Delete Experience
        </Button>
      </div>
    </div>
  );
}
