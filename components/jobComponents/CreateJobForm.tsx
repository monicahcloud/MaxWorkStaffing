"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobStatus,
  JobMode,
} from "@/utils/types";
import { createJobAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormSelect, { CustomFormField } from "../FormComponentFile";
import StatsSummary from "@/app/(dashboard)/stats/StatsSummary";

function CreateJobForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
      // ✅ Set today’s date as default
      dateApplied: new Date().toISOString().split("T")[0],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast("There was an error");
        return;
      }
      toast("Job created");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/addJob");
      form.reset();
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded shadow-2xl">
        <StatsSummary />
        <div className="mt-6 mb-4">
          <h3 className="text-xl font-bold text-primary">
            Enter Job Information
          </h3>
          <p className="text-sm font-semibold text-muted-foreground mt-1">
            Fill out the details of the job you applied for: position, company,
            location, status, and job type.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start mt-5">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormField
            name="dateApplied"
            control={form.control}
            render={({ field }) => (
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Date Applied</label>
                <input
                  type="date"
                  className="border rounded-md px-3 py-2 text-sm bg-white"
                  {...field}
                />
              </div>
            )}
          />
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="Job Status"
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="Job Mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}>
            {isPending ? "Submitting..." : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateJobForm;
