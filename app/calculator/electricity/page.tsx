/**
 * 전기요금 절약 계산기 페이지
 * 확장 가능한 계산기 구조
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { normalizeInput } from '@/lib/validation';
import { formatNumber } from '@/lib/formatting';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import Link from 'next/link';
import JSONLD from '@/components/seo/JSONLD';

// 전기요금 단가 (kWh당 원, 예시값)
const ELECTRICITY_PRICE_PER_KWH = 150; // 실제로는 지역별, 계절별로 다를 수 있음

export default function ElectricityCalculatorPage() {
  const [monthlyUsage, setMonthlyUsage] = useState(0);
  const [reductionPercent, setReductionPercent] = useState(0);

  const handleUsageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyUsage(normalizeInput(e.target.value));
  }, []);

  const handleReductionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setReductionPercent(Math.min(100, Math.max(0, value))); // 0-100% 제한
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    if (monthlyUsage <= 0 || reductionPercent <= 0) {
      return null;
    }

    const monthlyReduction = monthlyUsage * (reductionPercent / 100);
    const monthlySaving = monthlyReduction * ELECTRICITY_PRICE_PER_KWH;
    const annualSaving = monthlySaving * 12;
    const co2Reduction = monthlyReduction * 0.5 * 12; // kg CO2 (예시 계수)

    return {
      monthlySaving,
      annualSaving,
      co2Reduction,
      monthlyReduction,
    };
  }, [monthlyUsage, reductionPercent]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '전기요금을 절약하는 방법은?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LED 전구 사용, 대기전력 차단, 에어컨 온도 조절, 절전형 가전제품 사용 등으로 전기 사용량을 줄일 수 있습니다. 작은 실천으로도 연간 상당한 금액을 절약할 수 있습니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4 sm:mb-6">
          <Link href="/calculator">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              ← 계산기 목록으로
            </Button>
          </Link>
        </div>

        <PageHeader
          title="전기요금 절약 계산기"
          description="전기 사용량을 줄여서 연간 절약할 수 있는 금액을 계산해보세요"
        />

        {/* AdSense Slot 1 */}
        <AdSenseSlot slotId="calculator-electricity-top" className="my-8" />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">전기 사용 정보 입력</h2>
          
          <div className="space-y-5 sm:space-y-6">
            <div className="p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100">
              <Label htmlFor="usage" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">⚡</span>
                월간 전기 사용량 (kWh)
              </Label>
              <Input
                id="usage"
                type="number"
                min="0"
                step="1"
                value={monthlyUsage || ''}
                onChange={handleUsageChange}
                placeholder="예: 300"
                aria-label="월간 전기 사용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                전기요금 고지서에 표시된 월간 사용량을 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="reduction" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">📉</span>
                절약 목표 (감소율 %)
              </Label>
              <Input
                id="reduction"
                type="number"
                min="0"
                max="100"
                step="1"
                value={reductionPercent || ''}
                onChange={handleReductionChange}
                placeholder="예: 10"
                aria-label="절약 목표 감소율"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                전기 사용량을 몇 % 줄일 수 있는지 입력하세요 (예: 10% 절약)
              </p>
            </div>
          </div>
        </Card>

        {/* AdSense Slot 2 */}
        <AdSenseSlot slotId="calculator-electricity-middle" className="my-8" />

        {/* 결과 카드 */}
        {results && (
          <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 border-2 border-blue-200 shadow-xl">
            <div className="text-center space-y-5 sm:space-y-7">
              <div className="space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  연간 절약 가능한 금액은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2 break-words">
                    {formatNumber(results.annualSaving)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (월간 약 {formatNumber(results.monthlySaving)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 pt-6 sm:pt-8 border-t border-blue-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-words">
                    {formatNumber(results.monthlyReduction, 1)} kWh
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 절감량</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-words">
                    {formatNumber(results.co2Reduction, 1)} kg
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/tips">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                    전기요금 절약 팁 보기
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* AdSense Slot 3 */}
        <AdSenseSlot slotId="calculator-electricity-bottom" className="my-8" />

        {/* 절약 팁 */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 전기요금 절약 팁</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>• LED 전구 사용: 일반 전구 대비 약 80% 전력 절감</li>
            <li>• 대기전력 차단: 멀티탭 스위치로 완전 차단</li>
            <li>• 에어컨 온도 조절: 1도만 높여도 약 7% 절약</li>
            <li>• 절전형 가전제품 사용: 에너지 효율 등급 높은 제품 선택</li>
            <li>• 시간대별 요금제 활용: 심야 전기 사용량 늘리기</li>
          </ul>
        </Card>
      </PageContainer>
    </>
  );
}

