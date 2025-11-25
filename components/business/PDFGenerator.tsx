/**
 * PDF 리포트 생성 컴포넌트
 * jsPDF 사용 (동적 import)
 */

'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { messages } from '@/constants/messages';
import { getRiskLevelInfo } from '@/constants/riskLevel';
import { getIndustryBenchmark } from '@/constants/industryData';
import { formatEmission, formatPercent, formatDate } from '@/lib/formatting';
import type { BusinessState } from '@/types/business';

interface PDFGeneratorProps {
  businessState: BusinessState;
}

export default function PDFGenerator({ businessState }: PDFGeneratorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (typeof window === 'undefined') return;
    if (isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      if (!contentRef.current) {
        throw new Error('PDF 생성 대상 요소를 찾을 수 없습니다.');
      }

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`ESG_Report_${businessState.sessionId.slice(0, 8)}.pdf`);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'PDF 생성 중 오류가 발생했습니다.';
      setError(errorMessage);
      if (process.env.NODE_ENV === 'development') {
        console.error('PDF 생성 실패:', error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const riskInfo = getRiskLevelInfo(businessState.riskLevel);
  const benchmark = getIndustryBenchmark(businessState.industry);

  return (
    <div>
      <div
        ref={contentRef}
        className="bg-white p-8 space-y-6"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold">ESG 배출량 리포트</h1>
          <p className="text-gray-600 mt-2">
            생성일: {formatDate(new Date())}
          </p>
        </div>

        {businessState.companyName && (
          <div>
            <h2 className="text-xl font-semibold mb-2">회사 정보</h2>
            <p className="text-gray-700">{businessState.companyName}</p>
            <p className="text-gray-600">업종: {businessState.industry}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">배출량 요약</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-blue-600">
              {formatEmission(businessState.totalEmission)}
            </div>
            <p className="text-sm text-gray-600 mt-2">총 배출량</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">리스크 수준</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Level {businessState.riskLevel}</span>
              <span className="text-gray-700">{riskInfo.label}</span>
            </div>
            <p className="text-sm text-gray-600">{riskInfo.description}</p>
          </div>
        </div>

        {benchmark && (
          <div>
            <h2 className="text-xl font-semibold mb-4">업종 평균 비교</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>업종 평균</span>
                <span className="font-semibold">{formatEmission(benchmark.avgEmission, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>현재 배출량</span>
                <span className="font-semibold">
                  {formatEmission(businessState.totalEmission)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>비율</span>
                <span className="font-semibold">
                  {formatPercent((businessState.totalEmission / benchmark.avgEmission) * 100)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">다음 단계</h2>
          <p className="text-gray-700 mb-4">
            배출량 감축을 위한 전문 컨설팅을 받아보세요.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {messages.REPORT_CTA}
          </Button>
        </div>

        <div className="mt-12 pt-6 border-t text-xs text-gray-500">
          <p className="font-semibold mb-2">면책 조항</p>
          <p>{messages.LEGAL_DISCLAIMER}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-end gap-2">
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button 
          onClick={handleDownload} 
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          aria-label={isGenerating ? 'PDF 생성 중...' : 'PDF 다운로드'}
        >
          {isGenerating ? '생성 중...' : 'PDF 다운로드'}
        </Button>
      </div>
    </div>
  );
}

