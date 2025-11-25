/**
 * 전역 에러 바운더리
 * Next.js 14 App Router Error Handling
 */

'use client';

import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { messages } from '@/constants/messages';
import { logError, getSafeErrorMessage } from '@/lib/errorHandler';
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    logError(error, {
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  }, [error]);

  const handleHomeClick = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleKeyDown = useKeyboardNavigation({
    onEnter: reset,
    onEscape: handleHomeClick,
  });

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <Card 
        className="p-8 max-w-md w-full text-center space-y-4"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="alertdialog"
        aria-labelledby="error-title"
        aria-describedby="error-message"
      >
        <div className="text-6xl mb-4" aria-hidden="true">⚠️</div>
        <h1 id="error-title" className="text-2xl font-bold text-gray-900">
          문제가 발생했습니다
        </h1>
        <p className="text-gray-600" id="error-message">
          {getSafeErrorMessage(error)}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-500" id="error-digest">
            오류 코드: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center pt-4">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label="에러를 재시도합니다"
          >
            다시 시도
          </Button>
          <Button
            variant="outline"
            onClick={handleHomeClick}
            aria-label="홈 페이지로 이동합니다"
          >
            홈으로 이동
          </Button>
        </div>
      </Card>
    </div>
  );
}

