/**
 * 404 Not Found 페이지
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      role="main"
      aria-labelledby="not-found-title"
    >
      <Card className="p-8 max-w-md w-full text-center space-y-4">
        <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
        <h1 id="not-found-title" className="text-3xl font-bold text-gray-900">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              aria-label="홈 페이지로 이동합니다"
            >
              홈으로 이동
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

