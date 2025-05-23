import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperiencesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  arrayMove,
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
import { ExperienceTips } from "@/components/ExperienceTips";

function WorkExperienceForm({ resumeData, setResumeData }: EditorFormProps) {
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
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="experience-info max-w-xl mx-auto space-y-6 ">
      <div className="space-y-1.5 text-center">
        <ExperienceTips />
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add as many work experiences as needed.
        </p>
        <Form {...form}>
          <form className="space-y-3">
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
                    resumeType={resumeData.resumeType}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div className="flex justify-center">
              <Button
                type="button"
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
                Add Work Experience
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
  resumeType?: string;
}
function WorkExperienceItem({
  id,
  form,
  index,
  remove,
  resumeType,
}: WorkExperienceItemProps) {
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
      className={cn(
        " space-y-3 border rounded-md bg-background p-3",
        isDragging && "shade-xl z-50 cursor-grab relative"
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}>
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>

        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title/Rank</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
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
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.location`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {resumeType === "Federal Resume" && (
        <div className="grid grid-cols-4 gap-3">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.grade`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Job Series</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Hours (hrs/wk)</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Clearance</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
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
              <FormLabel>End Date</FormLabel>
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
      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you this
        is your current job.
      </FormDescription>
      {resumeType !== "Federal Resume" && (
        <FormField
          control={form.control}
          name={`workExperiences.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {resumeType !== "Federal Resume" && (
        <GenerateWorkExperienceButton
          onWorkExperienceGenerated={(exp) =>
            form.setValue(
              `workExperiences.${index}.description`,
              exp.description
            )
          }
        />
      )}
      {resumeType === "Federal Resume" && (
        <FormField
          control={form.control}
          name={`workExperiences.${index}.duties`}
          render={({ field }) => (
            <FormItem>
              <GenerateDutiesButton
                jobTitle={form.watch(`workExperiences.${index}.position`) || ""}
                onDutiesGenerated={(duties) =>
                  form.setValue(`workExperiences.${index}.duties`, duties)
                }
              />
              <FormControl>
                <Textarea {...field} placeholder="List duties here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {resumeType === "Federal Resume" && (
        <FormField
          control={form.control}
          name={`workExperiences.${index}.responsibilities`}
          render={({ field }) => (
            <FormItem>
              <GenerateResponsibilitiesButton
                jobTitle={form.watch(`workExperiences.${index}.position`) || ""}
                onResponsibilitiesGenerated={(responsibilities) =>
                  form.setValue(
                    `workExperiences.${index}.responsibilities`,
                    responsibilities
                  )
                }
              />
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {resumeType === "Federal Resume" && (
        <FormField
          control={form.control}
          name={`workExperiences.${index}.accomplishments`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Accomplishments</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="List key accomplishments here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="justify-end flex">
        <Button
          variant="destructive"
          type="button"
          onClick={() => remove(index)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
