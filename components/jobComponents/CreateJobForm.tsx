"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CustomFormSelect, { CustomFormField } from "../FormComponentFile";
import { createJobAction } from "@/utils/actions";
import SectionTitle from "../SectionTitle";

function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });
  const queryClient = useQueryClient();

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        console.log(data);
        return;
      }
      toast("job created");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      router.push("/jobs");
      form.reset();
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded shadow-2xl">
        <SectionTitle
          text="Add Job"
          subtext="Track your job applications by entering key details for each position you've applied to."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start mt-5">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize "
            disabled={isPending}>
            {isPending ? "loading" : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobForm;
