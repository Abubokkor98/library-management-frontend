import {
  Card, CardContent, CardFooter, CardHeader
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookSkeleton() {
  return (
    <Card className="h-full border-0 shadow-sm">
      <CardHeader className="pb-2">
        <Skeleton className="aspect-[2/3] w-full mb-3 rounded-md" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="flex items-center justify-between mb-1">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-3 w-8" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-7 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
}
