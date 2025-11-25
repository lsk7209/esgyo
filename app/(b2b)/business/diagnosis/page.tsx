/**
 * B2B Diagnosis Page
 * Risk Gauge & Industry Benchmark 비교
 */

'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/stores/businessStore';
import { messages } from '@/constants/messages';
import { logFunnel } from '@/lib/logging';
import { getIndustryBenchmark } from '@/constants/industryData';
import { getRiskLevelInfo } from '@/constants/riskLevel';
import { formatEmission, formatPercent } from '@/lib/formatting';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';

export default function BusinessDiagnosisPage() {
  const router = useRouter();
  const { totalEmission, riskLevel, industry } = useBusinessStore();

  useEffect(() => {
    // BusinessState가 없으면 calculator로 리다이렉트
    if (totalEmission === 0) {
      router.push('/business/calculator');
      return;
    }

    logFunnel('diagnosis_view', {
      industry,
      riskLevel,
      totalEmission
    });
  }, [totalEmission, router, industry, riskLevel]);

  // useMemo로 계산 최적화
  const benchmark = useMemo(() => getIndustryBenchmark(industry), [industry]);
  const riskInfo = useMemo(() => getRiskLevelInfo(riskLevel), [riskLevel]);
  
  const ratio = useMemo(() => {
    return benchmark && benchmark.avgEmission > 0
      ? (totalEmission / benchmark.avgEmission) * 100
      : 0;
  }, [benchmark, totalEmission]);

  const progressValue = useMemo(() => Math.min(ratio, 200), [ratio]); // 최대 200%까지 표시
  
  const handleBackToCalculator = useCallback(() => {
    router.push('/business/calculator');
  }, [router]);
  
  const handleGenerateReport = useCallback(() => {
    router.push('/business/report');
  }, [router]);

  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title={messages.DIAGNOSIS_TITLE}
        description={messages.DIAGNOSIS_DESCRIPTION}
      />

        {/* Risk Gauge */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">리스크 수준</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">현재 배출량</span>
              <span className="text-2xl font-bold">{formatEmission(totalEmission)}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>리스크 레벨</span>
                <Badge
                  variant={riskLevel >= 4 ? 'destructive' : 'default'}
                >
                  Level {riskLevel} - {riskInfo.label}
                </Badge>
              </div>
              <Progress value={(riskLevel / 5) * 100} className="h-3" />
            </div>

            {riskLevel === 5 && (
              <Alert variant="destructive">
                <p className="font-semibold">{messages.RISK_LEVEL_5_WARNING}</p>
              </Alert>
            )}
          </div>
        </Card>

        {/* Industry Benchmark */}
        {benchmark && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">업종 평균 비교</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>업종 평균</span>
                  <span className="font-semibold">{formatEmission(benchmark.avgEmission, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>현재 배출량</span>
                  <span className="font-semibold">{formatEmission(totalEmission)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>비율</span>
                  <span className={`font-bold ${ratio > 120 ? 'text-red-600' : ratio > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {formatPercent(ratio)}
                  </span>
                </div>
              </div>
              
              <Progress value={progressValue} className="h-4" />
              
              <div className="text-sm text-gray-600">
                <p>{benchmark.warning}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={handleBackToCalculator}
            aria-label="계산기 페이지로 돌아가기"
          >
            다시 계산
          </Button>
          <Button
            onClick={handleGenerateReport}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label="ESG 리포트 생성"
          >
            리포트 생성
          </Button>
        </div>
    </PageContainer>
  );
}

