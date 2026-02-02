"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomFormSelect, { CustomFormField } from "../FormComponentFile";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import SectionTitle from "../SectionTitle";

function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
      dateApplied:
        data?.dateApplied?.toISOString().split("T")[0] ??
        new Date().toISOString().split("T")[0],
    },
    values: data
      ? {
          position: data.position,
          company: data.company,
          location: data.location,
          status: data.status as JobStatus,
          mode: data.mode as JobMode,
          dateApplied: data.dateApplied?.toISOString().split("T")[0] ?? "",
        }
      : undefined,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast("There was an error");
        return;
      }
      toast("Job updated");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/addJob");
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  if (isLoading || !data) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Loading job details...
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded">
        <div className="flex flex-col gap-2 mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/addJob")}
            className="w-fit mb-4">
            ← Back to Job Tracker
          </Button>
          <SectionTitle
            text="Edit Job"
            subtext="Keep your job search on track by updating details for each position you've applied to."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start mt-5">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
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
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}>
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditJobForm;
