/**
 * Report 페이지 로딩 상태
 */

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-9 w-56 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Card>
      </div>
    </div>
  );
}

