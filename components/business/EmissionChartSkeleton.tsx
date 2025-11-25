/**
 * 배출량 차트 스켈레톤
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function EmissionChartSkeleton() {
  return (
    <div className="w-full h-64 space-y-4">
      <div className="flex items-center justify-center h-full">
        <div className="relative w-48 h-48">
          <Skeleton className="absolute inset-0 rounded-full" />
          <Skeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full" />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

