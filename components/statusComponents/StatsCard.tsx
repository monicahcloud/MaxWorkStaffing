import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

type StatsCardsProps = {
  title: string;
  value: number;
};

function StatsCards({ title, value }: StatsCardsProps) {
  return (
    <Card className="bg-muted w-full max-w-[220px] h-[80px] py-3 px-4 sm:max-w-[240px]">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle className="capitalize text-sm sm:text-base">
          {title}
        </CardTitle>
        <CardDescription className="text-2xl sm:text-3xl font-extrabold text-primary">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className="w-full max-w-[220px] h-[80px] py-3 px-4 sm:max-w-[240px]">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <div className="flex items-center space-x-4 w-full">
          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full sm:w-[120px]" />
            <Skeleton className="h-4 w-3/4 sm:w-[80px]" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StatsCards;
