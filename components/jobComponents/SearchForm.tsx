"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchContainer() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatusParam = searchParams.get("jobStatus") || "All";
  const router = useRouter();
  const pathname = usePathname();

  // Use state to track selected jobStatus
  const [jobStatus, setJobStatus] = useState(jobStatusParam);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    params.set("search", search);
    params.set("jobStatus", jobStatus); // Use state value

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="bg-muted mb-16 p-8 grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search Jobs"
        name="search"
        defaultValue={search}
      />
      <Select value={jobStatus} onValueChange={setJobStatus}>
        <SelectTrigger className="h-10 px-4 rounded-md border w-full ">
          <SelectValue placeholder="Select Job Status" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {["all", ...Object.values(JobStatus)].map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchContainer;
