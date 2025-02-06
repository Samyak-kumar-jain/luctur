import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mt-9">
      <Skeleton className="h-[160px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-14 w-[250px]" />
      </div>
    </div>
  )
}
