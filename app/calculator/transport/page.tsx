/**
 * 대중교통 vs 자차 비교 계산기 페이지
 * 확장 가능한 계산기 구조
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

// 단가 (예시값)
const CAR_FUEL_COST_PER_KM = 150; // 자차 연료비 (원/km)
const PUBLIC_TRANSIT_COST_PER_KM = 50; // 대중교통 비용 (원/km)
const CAR_CO2_PER_KM = 0.2; // 자차 CO2 배출량 (kg/km)
const PUBLIC_TRANSIT_CO2_PER_KM = 0.05; // 대중교통 CO2 배출량 (kg/km)

export default function TransportCalculatorPage() {
  const [monthlyDistance, setMonthlyDistance] = useState(0);
  const [publicTransitRatio, setPublicTransitRatio] = useState(0); // 대중교통 이용 비율 (%)

  const handleDistanceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyDistance(normalizeInput(e.target.value));
  }, []);

  const handleRatioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setPublicTransitRatio(Math.min(100, Math.max(0, value)));
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    if (monthlyDistance <= 0 || publicTransitRatio <= 0) {
      return null;
    }

    const transitDistance = monthlyDistance * (publicTransitRatio / 100);
    const carDistance = monthlyDistance - transitDistance;

    // 비용 계산
    const carCost = carDistance * CAR_FUEL_COST_PER_KM;
    const transitCost = transitDistance * PUBLIC_TRANSIT_COST_PER_KM;
    const monthlySaving = (carDistance * CAR_FUEL_COST_PER_KM) - (transitDistance * PUBLIC_TRANSIT_COST_PER_KM);
    const annualSaving = monthlySaving * 12;

    // CO2 계산
    const carCO2 = carDistance * CAR_CO2_PER_KM;
    const transitCO2 = transitDistance * PUBLIC_TRANSIT_CO2_PER_KM;
    const monthlyCO2Reduction = carCO2 - transitCO2;
    const annualCO2Reduction = monthlyCO2Reduction * 12;

    // 포인트 계산 (대중교통 이용 시)
    const transitPoint = transitDistance * 5; // km당 5포인트
    const annualPoint = transitPoint * 12;

    return {
      monthlySaving,
      annualSaving,
      monthlyCO2Reduction,
      annualCO2Reduction,
      annualPoint,
      transitDistance,
      carDistance,
    };
  }, [monthlyDistance, publicTransitRatio]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '대중교통 이용 시 얼마나 절약되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '대중교통 이용 시 연료비를 절약할 수 있고, 탄소중립포인트도 받을 수 있습니다. 월 100km를 대중교통으로 이용하면 연간 약 12만원 이상 절약하고, 약 180kg의 CO2를 감축할 수 있습니다.'
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
          title="대중교통 vs 자차 비교 계산기"
          description="대중교통 이용 시 절약되는 비용과 탄소 감축량을 계산해보세요"
        />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">이동 정보 입력</h2>
          
          <div className="space-y-5 sm:space-y-6">
            <div className="p-4 sm:p-5 bg-purple-50/50 rounded-lg border border-purple-100">
              <Label htmlFor="distance" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">📏</span>
                월간 총 이동 거리 (km)
              </Label>
              <Input
                id="distance"
                type="number"
                min="0"
                step="1"
                value={monthlyDistance || ''}
                onChange={handleDistanceChange}
                placeholder="예: 500"
                aria-label="월간 총 이동 거리"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                한 달 동안 이동한 총 거리를 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="ratio" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🚇</span>
                대중교통 이용 비율 (%)
              </Label>
              <Input
                id="ratio"
                type="number"
                min="0"
                max="100"
                step="1"
                value={publicTransitRatio || ''}
                onChange={handleRatioChange}
                placeholder="예: 50"
                aria-label="대중교통 이용 비율"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                전체 이동 거리 중 대중교통을 이용한 비율을 입력하세요 (예: 50%)
              </p>
            </div>
          </div>
        </Card>

        {/* 결과 카드 */}
        {results && (
          <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border-2 border-purple-200 shadow-xl">
            <div className="text-center space-y-5 sm:space-y-7">
              <div className="space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  대중교통 이용 시 연간 절약 금액은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 mb-2 break-words">
                    {formatNumber(results.annualSaving)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (월간 약 {formatNumber(results.monthlySaving)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 pt-6 sm:pt-8 border-t border-purple-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-2 break-words">
                    {formatEmission(results.annualCO2Reduction / 1000, 2)} tCO₂
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-2 break-words">
                    {formatNumber(results.annualPoint)}P
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 포인트</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-2 break-words">
                    {formatNumber(results.transitDistance, 0)} km
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 대중교통</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                <Link href="/guide" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                    탄소중립포인트 신청하기
                  </Button>
                </Link>
                <Link href="/tips" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-purple-50 hover:border-purple-300">
                    절약 팁 보기
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}


        {/* 비교 표 */}
        {results && (
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📊 자차 vs 대중교통 비교</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 sm:p-3 font-semibold">구분</th>
                    <th className="text-right p-2 sm:p-3 font-semibold">자차</th>
                    <th className="text-right p-2 sm:p-3 font-semibold">대중교통</th>
                    <th className="text-right p-2 sm:p-3 font-semibold text-green-600">절약</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 sm:p-3">월간 비용</td>
                    <td className="text-right p-2 sm:p-3">{formatNumber(results.carDistance * CAR_FUEL_COST_PER_KM)}원</td>
                    <td className="text-right p-2 sm:p-3">{formatNumber(results.transitDistance * PUBLIC_TRANSIT_COST_PER_KM)}원</td>
                    <td className="text-right p-2 sm:p-3 text-green-600 font-semibold">{formatNumber(results.monthlySaving)}원</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-3">월간 CO₂</td>
                    <td className="text-right p-2 sm:p-3">{formatEmission(results.carDistance * CAR_CO2_PER_KM / 1000, 2)} tCO₂</td>
                    <td className="text-right p-2 sm:p-3">{formatEmission(results.transitDistance * PUBLIC_TRANSIT_CO2_PER_KM / 1000, 2)} tCO₂</td>
                    <td className="text-right p-2 sm:p-3 text-green-600 font-semibold">{formatEmission(results.monthlyCO2Reduction / 1000, 2)} tCO₂</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-3">포인트</td>
                    <td className="text-right p-2 sm:p-3">-</td>
                    <td className="text-right p-2 sm:p-3">{formatNumber(results.annualPoint / 12)}P/월</td>
                    <td className="text-right p-2 sm:p-3 text-green-600 font-semibold">{formatNumber(results.annualPoint)}P/년</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </PageContainer>
    </>
  );
}

