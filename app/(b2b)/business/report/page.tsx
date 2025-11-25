/**
 * B2B Report Page
 * PDF 리포트 생성 (noindex)
 */

'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/stores/businessStore';
import { messages } from '@/constants/messages';
import { logFunnel } from '@/lib/logging';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// react-pdf 동적 import (ssr: false)
const PDFGenerator = dynamic(
  () => import('@/components/business/PDFGenerator'),
  { 
    ssr: false,
    loading: () => (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    )
  }
);

export default function BusinessReportPage() {
  const router = useRouter();
  const businessState = useBusinessStore();
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // BusinessState가 없으면 calculator로 리다이렉트
    if (businessState.totalEmission === 0) {
      router.push('/business/calculator');
      return;
    }

    logFunnel('pdf_download', {
      industry: businessState.industry,
      riskLevel: businessState.riskLevel,
      totalEmission: businessState.totalEmission
    });
  }, [businessState.totalEmission, router, businessState.industry, businessState.riskLevel]);

  const handleCTAClick = () => {
    logFunnel('cta_click', {
      industry: businessState.industry,
      riskLevel: businessState.riskLevel
    });
    // 실제 환경에서는 컨설팅 신청 페이지로 이동
    alert('컨설팅 신청 페이지로 이동합니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {messages.REPORT_TITLE}
          </h1>
          <p className="text-gray-600">
            ESG 배출량 리포트를 생성하고 다운로드하세요
          </p>
        </div>

        <Card className="p-6">
          <div ref={pdfRef} className="space-y-6">
            <PDFGenerator businessState={businessState} />
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push('/business/diagnosis')}
          >
            뒤로 가기
          </Button>
          <Button
            onClick={handleCTAClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {messages.REPORT_CTA}
          </Button>
        </div>
      </div>
    </div>
  );
}

