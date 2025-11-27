/**
 * 음식물 쓰레기 감량 계산기 페이지
 * 음식물 쓰레기를 줄여서 절약되는 비용 계산
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

// 음식물 쓰레기 처리 비용 (kg당 원, 2024년 기준)
const FOOD_WASTE_DISPOSAL_COST = 200; // kg당 처리 비용

// 음식물 쓰레기 평균 구매 가격 (kg당 원, 식재료 평균 가격)
const FOOD_AVERAGE_PRICE = 5000; // kg당 약 5,000원 (채소, 고기, 곡물 등 평균)

// 음식물 쓰레기 CO2 배출 계수 (kg당 kg CO2)
const FOOD_WASTE_CO2_FACTOR = 2.5; // 음식물 쓰레기 처리 시 발생하는 CO2 (메탄 포함)

// 음식물 쓰레기 감량 시 식비 절감 계수 (처리 비용 + 구매 비용)
const FOOD_SAVING_RATE = 0.7; // 실제로는 구매한 음식의 일부만 버려지므로 70% 반영

export default function FoodWasteCalculatorPage() {
  const [monthlyWaste, setMonthlyWaste] = useState(0);
  const [reductionPercent, setReductionPercent] = useState(0);

  const handleWasteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyWaste(normalizeInput(e.target.value));
  }, []);

  const handleReductionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setReductionPercent(Math.min(100, Math.max(0, value)));
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    if (monthlyWaste <= 0 || reductionPercent <= 0) {
      return null;
    }

    const monthlyReduction = monthlyWaste * (reductionPercent / 100);
    
    // 처리 비용 절감
    const disposalCostSaving = monthlyReduction * FOOD_WASTE_DISPOSAL_COST;
    
    // 식비 절감 (음식물 쓰레기를 줄이면 구매량도 줄어듦)
    const foodCostSaving = monthlyReduction * FOOD_AVERAGE_PRICE * FOOD_SAVING_RATE;
    
    // 총 절약 금액
    const monthlyTotalSaving = disposalCostSaving + foodCostSaving;
    const annualSaving = monthlyTotalSaving * 12;
    
    // CO2 감축량
    const co2Reduction = monthlyReduction * FOOD_WASTE_CO2_FACTOR * 12;

    return {
      monthlyReduction,
      disposalCostSaving,
      foodCostSaving,
      monthlyTotalSaving,
      annualSaving,
      co2Reduction,
    };
  }, [monthlyWaste, reductionPercent]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '음식물 쓰레기를 줄이면 얼마나 절약할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '음식물 쓰레기를 줄이면 처리 비용 절감과 함께 식비도 절약할 수 있습니다. 월 5kg만 줄여도 연간 약 30만원 이상 절약할 수 있으며, CO2 감축에도 크게 기여합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '음식물 쓰레기 감량은 환경에 어떤 도움이 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '음식물 쓰레기는 처리 과정에서 메탄가스 등 온실가스를 많이 발생시킵니다. 음식물 쓰레기를 줄이면 처리 비용과 CO2 배출을 크게 감소시킬 수 있습니다. 1kg 감량으로 약 2.5kg의 CO2를 절감할 수 있습니다.'
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
          title="음식물 쓰레기 감량 계산기 – 음쓰 줄이기로 절약되는 금액은?"
          description="음식물 쓰레기를 줄여서 절약되는 비용과 환경 효과를 계산해보세요"
        />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">음식물 쓰레기 정보 입력</h2>
          
          <div className="space-y-4 sm:space-y-5">
            <div className="p-4 sm:p-5 bg-orange-50/50 rounded-lg border border-orange-100">
              <Label htmlFor="waste" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🍽️</span>
                월간 음식물 쓰레기량 (kg)
              </Label>
              <Input
                id="waste"
                type="number"
                min="0"
                step="0.1"
                value={monthlyWaste || ''}
                onChange={handleWasteChange}
                placeholder="예: 10"
                aria-label="월간 음식물 쓰레기량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                한 달 동안 배출하는 음식물 쓰레기량을 입력하세요 (일반 가정 기준 월 10~15kg)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="reduction" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">📉</span>
                감량 목표 (감소율 %)
              </Label>
              <Input
                id="reduction"
                type="number"
                min="0"
                max="100"
                step="1"
                value={reductionPercent || ''}
                onChange={handleReductionChange}
                placeholder="예: 30"
                aria-label="감량 목표 감소율"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                음식물 쓰레기를 몇 % 줄일 수 있는지 입력하세요 (예: 30% 감량)
              </p>
            </div>
          </div>
        </Card>

        {/* 결과 카드 */}
        {results && (
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 shadow-xl">
            <div className="text-center space-y-4 sm:space-y-5">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  음식물 쓰레기 감량으로 연간 절약 가능한 금액은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-600 mb-2 break-words">
                    {formatNumber(results.annualSaving)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (월간 약 {formatNumber(results.monthlyTotalSaving)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-orange-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 mb-2 break-words">
                    {formatNumber(results.monthlyReduction, 1)} kg
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 감량량</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 mb-2 break-words">
                    {formatNumber(results.foodCostSaving)}원
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 식비 절감</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 mb-2 break-words">
                    {formatEmission(results.co2Reduction / 1000, 2)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tips">
                    <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                      음쓰 감량 팁 보기
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-orange-50 hover:border-orange-300">
                      절약 가이드
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 음식물 쓰레기 감량 팁 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 음식물 쓰레기 감량 실천 팁</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>• <strong>적정량 구매:</strong> 필요한 만큼만 구매하여 남기지 않기</li>
            <li>• <strong>냉장고 관리:</strong> 냉장고 속 재료를 먼저 사용하고 유통기한 확인</li>
            <li>• <strong>나머지 요리 활용:</strong> 남은 음식을 새로운 요리로 재활용</li>
            <li>• <strong>음식물 쓰레기 퇴비화:</strong> 퇴비통을 활용하여 음쓰를 퇴비로 만들기</li>
            <li>• <strong>외식 시 포장 줄이기:</strong> 먹을 만큼만 주문하고 남기지 않기</li>
            <li>• <strong>음식 보관법 개선:</strong> 올바른 보관으로 신선도 유지 기간 늘리기</li>
          </ul>
        </Card>

        {/* 음식물 쓰레기 처리 비용 안내 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📊 음식물 쓰레기 처리 비용 안내</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              음식물 쓰레기를 줄이면 <strong>처리 비용 절감</strong>과 <strong>식비 절약</strong> 두 가지 효과를 얻을 수 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">처리 비용 절감</div>
                <div className="text-sm text-gray-600">
                  음식물 쓰레기 처리 비용은 kg당 약 {formatNumber(FOOD_WASTE_DISPOSAL_COST)}원입니다.
                  음쓰를 줄이면 이 처리 비용을 절감할 수 있습니다.
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">식비 절약</div>
                <div className="text-sm text-gray-600">
                  음식물 쓰레기를 줄이면 불필요한 식재료 구매도 줄어들어 식비를 절약할 수 있습니다.
                  평균적으로 kg당 약 {formatNumber(FOOD_AVERAGE_PRICE)}원의 식비가 절감됩니다.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 환경 효과 안내 */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">🌱 음식물 쓰레기 감량의 환경 효과</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              음식물 쓰레기는 처리 과정에서 <strong>메탄가스</strong> 등 강력한 온실가스를 발생시킵니다.
              음식물 쓰레기를 줄이면 다음과 같은 환경 효과를 얻을 수 있습니다:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>CO2 배출량 감축: 1kg 감량 시 약 2.5kg의 CO2 절감</li>
              <li>매립지 부담 감소: 음식물 쓰레기 매립 공간 절감</li>
              <li>수자원 보존: 식재료 생산에 필요한 물 절약</li>
              <li>에너지 절약: 음식물 쓰레기 처리 과정에서 사용되는 에너지 절감</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3">
              * 음식물 쓰레기 처리 비용과 CO2 배출 계수는 지역 및 처리 방식에 따라 차이가 있을 수 있습니다.
            </p>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

