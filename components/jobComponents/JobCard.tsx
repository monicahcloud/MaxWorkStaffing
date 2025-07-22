"use client";

import React from "react";
import { JobType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import JobInfo from "./JobInfo";
import DeleteJob from "./DeleteJob";
import { Separator } from "../ui/separator";

export default function JobCard({ job }: { job: JobType }) {
  const date = job.dateApplied
    ? new Date(job.dateApplied).toLocaleDateString()
    : "N/A";

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="capitalize text-2xl">{job.position}</CardTitle>
        <CardDescription className="uppercase text-xl font-bold text-muted-foreground">
          {job.company}
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className=" grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={`Applied: ${date}`} />
        <div className="flex items-center">
          <Badge variant="outline" className="capitalize">
            <JobInfo
              icon={<RadioTower className="w-4 h-4" />}
              text={job.status}
            />
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJob id={job.id} />
      </CardFooter>
    </Card>
  );
}
