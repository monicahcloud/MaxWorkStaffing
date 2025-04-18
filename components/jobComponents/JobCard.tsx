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
  const date = new Date(job.createdAt).toLocaleDateString();
  return (
    <>
      <Card className="bg-muted">
        {/* <CardHeader>
          <CardDescription className="uppercase text-xl font-bold">
            {job.location}
          </CardDescription>
          <CardTitle className="capitalize text-2xl">{job.position}</CardTitle>
        </CardHeader> */}
        <CardHeader>
          <CardTitle className="capitalize text-2xl">{job.position}</CardTitle>
          <CardDescription className="uppercase text-xl font-bold">
            {job.company}
          </CardDescription>
        </CardHeader>

        <Separator />
        <CardContent className="mt-1 grid grid-cols-2 gap-4">
          <JobInfo icon={<Briefcase />} text={job.mode} />
          <JobInfo icon={<MapPin />} text={job.location} />
          <JobInfo icon={<CalendarDays />} text={date} />
          {/* <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            laboriosam porro, dicta sed inventore tenetur numquam ipsam in et
            laborum exercitationem, nulla quae fuga, aperiam nisi est corrupti
            provident labore?
          </CardDescription> */}
          <Badge className="inline-flex items-center px-3 py-1">
            <JobInfo
              icon={<RadioTower className="w-4 h-4" />}
              text={job.status}
            />
          </Badge>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild size="sm">
            <Link href={`/jobs/${job.id}`}>edit</Link>
          </Button>
          <DeleteJob id={job.id} />
        </CardFooter>
      </Card>
    </>
  );
}
