/**
 * 친환경 쇼핑 포인트 계산기 페이지
 * 친환경 제품 구매로 받을 수 있는 포인트와 할인 혜택 계산
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

// 친환경 제품 구매 포인트 (구매 금액의 %)
const ECO_POINT_RATE = 0.05; // 구매 금액의 5% 포인트 적립

// 친환경 제품 할인율 (평균)
const ECO_DISCOUNT_RATE = 0.1; // 평균 10% 할인

// 친환경 제품 CO2 감축 계수 (만원당 kg CO2)
const ECO_CO2_REDUCTION = 2; // 친환경 제품 1만원 구매 시 약 2kg CO2 감축

// 친환경 제품 카테고리별 포인트율
const CATEGORY_POINT_RATES = {
  organic: 0.07,      // 유기농 제품: 7%
  reusable: 0.05,    // 재사용 제품: 5%
  energy: 0.06,      // 에너지 효율 제품: 6%
  local: 0.04,       // 지역 농산물: 4%
  other: 0.05,       // 기타 친환경 제품: 5%
};

export default function EcoShoppingCalculatorPage() {
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [ecoRatio, setEcoRatio] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORY_POINT_RATES>('other');

  const handleSpendingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlySpending(normalizeInput(e.target.value));
  }, []);

  const handleRatioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setEcoRatio(Math.min(100, Math.max(0, value)));
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as keyof typeof CATEGORY_POINT_RATES);
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    if (monthlySpending <= 0 || ecoRatio <= 0) {
      return null;
    }

    const monthlyEcoSpending = monthlySpending * (ecoRatio / 100);
    const pointRate = CATEGORY_POINT_RATES[selectedCategory];
    const monthlyPoints = monthlyEcoSpending * pointRate;
    const annualPoints = monthlyPoints * 12;
    
    // 할인 혜택
    const monthlyDiscount = monthlyEcoSpending * ECO_DISCOUNT_RATE;
    const annualDiscount = monthlyDiscount * 12;
    
    // 총 혜택 (포인트 + 할인)
    const monthlyTotalBenefit = monthlyPoints + monthlyDiscount;
    const annualTotalBenefit = annualPoints + annualDiscount;
    
    // CO2 감축량
    const co2Reduction = (monthlyEcoSpending / 10000) * ECO_CO2_REDUCTION * 12;

    return {
      monthlyEcoSpending,
      monthlyPoints,
      annualPoints,
      monthlyDiscount,
      annualDiscount,
      monthlyTotalBenefit,
      annualTotalBenefit,
      co2Reduction,
      pointRate,
    };
  }, [monthlySpending, ecoRatio, selectedCategory]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '친환경 제품 구매로 포인트를 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 많은 마트와 온라인 쇼핑몰에서 친환경 제품 구매 시 구매 금액의 4~7%에 해당하는 포인트를 적립해드립니다. 제품 카테고리별로 포인트율이 다를 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '친환경 쇼핑은 환경에 어떤 도움이 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '친환경 제품은 생산 과정에서 적은 자원과 에너지를 사용하며, 폐기 시에도 환경 부담이 적습니다. 친환경 제품 1만원 구매 시 약 2kg의 CO2를 감축할 수 있습니다.'
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
          title="친환경 쇼핑 포인트 계산기 – 그린 쇼핑으로 받는 혜택은?"
          description="친환경 제품 구매로 받을 수 있는 포인트와 할인 혜택을 계산해보세요"
        />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">쇼핑 정보 입력</h2>
          
          <div className="space-y-4 sm:space-y-5">
            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="spending" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">💰</span>
                월간 총 쇼핑 금액 (원)
              </Label>
              <Input
                id="spending"
                type="number"
                min="0"
                step="1000"
                value={monthlySpending || ''}
                onChange={handleSpendingChange}
                placeholder="예: 500000"
                aria-label="월간 총 쇼핑 금액"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                한 달 동안 식료품, 생활용품 등 총 쇼핑 금액을 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100">
              <Label htmlFor="ratio" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🌱</span>
                친환경 제품 구매 비율 (%)
              </Label>
              <Input
                id="ratio"
                type="number"
                min="0"
                max="100"
                step="1"
                value={ecoRatio || ''}
                onChange={handleRatioChange}
                placeholder="예: 30"
                aria-label="친환경 제품 구매 비율"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                총 쇼핑 금액 중 친환경 제품 구매 비율을 입력하세요 (예: 30%)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-purple-50/50 rounded-lg border border-purple-100">
              <Label htmlFor="category" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🏷️</span>
                주요 구매 카테고리
              </Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-2 w-full h-11 sm:h-12 text-base bg-white border border-gray-200 rounded-md px-3 focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="organic">유기농 제품 (포인트 7%)</option>
                <option value="energy">에너지 효율 제품 (포인트 6%)</option>
                <option value="reusable">재사용 제품 (포인트 5%)</option>
                <option value="local">지역 농산물 (포인트 4%)</option>
                <option value="other">기타 친환경 제품 (포인트 5%)</option>
              </select>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                주로 구매하는 친환경 제품 카테고리를 선택하세요
              </p>
            </div>
          </div>
        </Card>

        {/* 결과 카드 */}
        {results && (
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 shadow-xl">
            <div className="text-center space-y-4 sm:space-y-5">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  친환경 쇼핑으로 연간 받을 수 있는 혜택은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-2 break-words">
                    {formatNumber(results.annualTotalBenefit)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (포인트 {formatNumber(results.annualPoints)}원 + 할인 {formatNumber(results.annualDiscount)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-green-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(results.annualPoints)}원
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 포인트 적립</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(results.annualDiscount)}원
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 할인 혜택</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatEmission(results.co2Reduction / 1000, 2)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tips">
                    <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                      친환경 쇼핑 팁 보기
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-green-50 hover:border-green-300">
                      제품 선택 가이드
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 친환경 제품 카테고리 안내 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">🏷️ 친환경 제품 카테고리별 포인트율</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🌾 유기농 제품</div>
              <div className="text-sm text-gray-600">구매 금액의 {Math.round(CATEGORY_POINT_RATES.organic * 100)}% 포인트</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">⚡ 에너지 효율 제품</div>
              <div className="text-sm text-gray-600">구매 금액의 {Math.round(CATEGORY_POINT_RATES.energy * 100)}% 포인트</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">♻️ 재사용 제품</div>
              <div className="text-sm text-gray-600">구매 금액의 {Math.round(CATEGORY_POINT_RATES.reusable * 100)}% 포인트</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🏡 지역 농산물</div>
              <div className="text-sm text-gray-600">구매 금액의 {Math.round(CATEGORY_POINT_RATES.local * 100)}% 포인트</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🌱 기타 친환경 제품</div>
              <div className="text-sm text-gray-600">구매 금액의 {Math.round(CATEGORY_POINT_RATES.other * 100)}% 포인트</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
            * 포인트율은 쇼핑몰 및 제품에 따라 다를 수 있습니다. 정확한 포인트율은 각 쇼핑몰의 정책을 확인하세요.
          </p>
        </Card>

        {/* 친환경 쇼핑 팁 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 친환경 쇼핑 실천 팁</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>• <strong>친환경 인증 마크 확인:</strong> 유기농, 친환경 인증 마크가 있는 제품 선택</li>
            <li>• <strong>로컬 제품 구매:</strong> 지역 농산물 구매로 운송 거리와 CO2 감축</li>
            <li>• <strong>재사용 가능한 제품:</strong> 일회용 대신 재사용 가능한 제품 선택</li>
            <li>• <strong>에너지 효율 제품:</strong> 에너지 효율 등급이 높은 가전제품 선택</li>
            <li>• <strong>포장 최소화:</strong> 과도한 포장이 없는 제품 선택</li>
            <li>• <strong>친환경 포인트 카드 활용:</strong> 친환경 제품 구매 시 포인트 적립 카드 사용</li>
          </ul>
        </Card>

        {/* 친환경 쇼핑의 환경 효과 */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">🌱 친환경 쇼핑의 환경 효과</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              친환경 제품을 구매하면 다음과 같은 환경 효과를 얻을 수 있습니다:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>CO2 감축:</strong> 친환경 제품 1만원 구매 시 약 2kg의 CO2 감축</li>
              <li><strong>자원 보존:</strong> 재생 가능한 자원 사용으로 자연 자원 보호</li>
              <li><strong>화학물질 감소:</strong> 유해 화학물질 사용 최소화로 환경 부담 감소</li>
              <li><strong>폐기물 감소:</strong> 재활용 가능하거나 생분해되는 포장재 사용</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3">
              * 친환경 제품 포인트율과 CO2 감축 계수는 제품 및 쇼핑몰에 따라 차이가 있을 수 있습니다.
            </p>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

