/**
 * 수도요금 절약 계산기 페이지
 * 물 사용량을 줄여서 연간 절약할 수 있는 금액 계산
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { normalizeInput } from '@/lib/validation';
import { formatNumber, formatEmission } from '@/lib/formatting';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';
import JSONLD from '@/components/seo/JSONLD';

// 수도요금 단가 (m³당 원, 2024년 기준)
// 기본요금 + 사용료 합산 평균
const WATER_PRICE_PER_M3 = 800; // m³당 약 800원 (지역별 차이 있음)

// 하수도 요금 (상수도 요금의 약 60%)
const SEWAGE_RATE = 0.6;

// 물 생산 CO2 배출 계수 (m³당 kg CO2)
const WATER_CO2_FACTOR = 0.3; // 정수 및 공급 과정에서 발생하는 CO2

export default function WaterCalculatorPage() {
  const [monthlyUsage, setMonthlyUsage] = useState(0);
  const [reductionPercent, setReductionPercent] = useState(0);

  const handleUsageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyUsage(normalizeInput(e.target.value));
  }, []);

  const handleReductionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setReductionPercent(Math.min(100, Math.max(0, value)));
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    if (monthlyUsage <= 0 || reductionPercent <= 0) {
      return null;
    }

    const monthlyReduction = monthlyUsage * (reductionPercent / 100);
    const monthlyWaterSaving = monthlyReduction * WATER_PRICE_PER_M3;
    const monthlySewageSaving = monthlyWaterSaving * SEWAGE_RATE;
    const monthlyTotalSaving = monthlyWaterSaving + monthlySewageSaving;
    const annualSaving = monthlyTotalSaving * 12;
    
    // CO2 감축량 (물 생산 과정에서 발생하는 CO2 절감)
    const co2Reduction = monthlyReduction * WATER_CO2_FACTOR * 12;

    return {
      monthlyReduction,
      monthlyWaterSaving,
      monthlySewageSaving,
      monthlyTotalSaving,
      annualSaving,
      co2Reduction,
    };
  }, [monthlyUsage, reductionPercent]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '수도요금을 절약하는 방법은?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '물 절약 습관(짧은 샤워, 양치 시 컵 사용, 세탁기 가득 채우기 등)으로 물 사용량을 10%만 줄여도 연간 약 10만원 이상 절약할 수 있습니다. 수도요금과 하수도 요금을 함께 절감할 수 있어 효과가 큽니다.'
        }
      },
      {
        '@type': 'Question',
        name: '물 절약은 환경에 어떤 도움이 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '물 절약은 정수 및 공급 과정에서 발생하는 CO2 배출을 줄이고, 수자원 보존에도 기여합니다. 1m³ 절약으로 약 0.3kg의 CO2를 감축할 수 있습니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-3 sm:mb-4">
          <Link href="/calculator">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              ← 계산기 목록으로
            </Button>
          </Link>
        </div>

        <PageHeader
          title="수도요금 절약 계산기 – 물 절약으로 절감되는 금액은?"
          description="물 사용량을 줄여서 연간 절약할 수 있는 금액을 계산해보세요"
        />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">물 사용 정보 입력</h2>
          
          <div className="space-y-4 sm:space-y-5">
            <div className="p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100">
              <Label htmlFor="usage" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">💧</span>
                월간 물 사용량 (m³)
              </Label>
              <Input
                id="usage"
                type="number"
                min="0"
                step="0.1"
                value={monthlyUsage || ''}
                onChange={handleUsageChange}
                placeholder="예: 15"
                aria-label="월간 물 사용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                수도요금 고지서에 표시된 월간 사용량을 입력하세요 (1m³ = 1,000L)
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
                placeholder="예: 15"
                aria-label="절약 목표 감소율"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                물 사용량을 몇 % 줄일 수 있는지 입력하세요 (예: 15% 절약)
              </p>
            </div>
          </div>
        </Card>

        {/* 결과 카드 */}
        {results && (
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 border-2 border-blue-200 shadow-xl">
            <div className="text-center space-y-4 sm:space-y-5">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  물 절약으로 연간 절약 가능한 금액은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2 break-words">
                    {formatNumber(results.annualSaving)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (월간 약 {formatNumber(results.monthlyTotalSaving)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-blue-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-words">
                    {formatNumber(results.monthlyReduction, 1)} m³
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 절감량</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-words">
                    {formatNumber(results.monthlyWaterSaving)}원
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 수도요금 절감</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 break-words">
                    {formatEmission(results.co2Reduction / 1000, 2)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tips">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                      물 절약 팁 보기
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-blue-50 hover:border-blue-300">
                      절약 가이드
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 물 절약 팁 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 물 절약 실천 팁</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>• <strong>짧은 샤워:</strong> 샤워 시간을 1분만 줄여도 월 3~5m³ 절약 (약 3,000~4,000원)</li>
            <li>• <strong>양치 시 컵 사용:</strong> 수도꼭지를 계속 틀어두지 않고 컵에 받아 사용</li>
            <li>• <strong>세탁기 가득 채우기:</strong> 빨래를 모아서 한 번에 세탁하면 물 사용량 절감</li>
            <li>• <strong>저수량 변기 사용:</strong> 대변기 물탱크에 물병을 넣어 용량 줄이기</li>
            <li>• <strong>세면대 절수기 설치:</strong> 간단한 장치로 수도 사용량 30~50% 절감</li>
            <li>• <strong>빗물 활용:</strong> 화분 물주기, 청소 등에 빗물 활용</li>
          </ul>
        </Card>

        {/* 수도요금 구성 안내 */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📊 수도요금 구성 안내</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              수도요금은 <strong>상수도 요금</strong>과 <strong>하수도 요금</strong>으로 구성됩니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold mb-2">상수도 요금</div>
              <div className="text-sm text-gray-600 mb-3">
                기본요금 + 사용료로 구성되며, 사용량에 따라 단계별 요금이 적용됩니다.
                평균적으로 m³당 약 {formatNumber(WATER_PRICE_PER_M3)}원입니다.
              </div>
              <div className="font-semibold mb-2">하수도 요금</div>
              <div className="text-sm text-gray-600">
                상수도 요금의 약 {Math.round(SEWAGE_RATE * 100)}%에 해당하며, 물 사용량이 줄어들면 하수도 요금도 함께 절감됩니다.
              </div>
            </div>
            <p className="text-xs text-gray-600">
              * 실제 요금은 지역별, 사용량 구간별로 차이가 있을 수 있습니다. 정확한 요금은 지역 상수도사업소에 문의하세요.
            </p>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

