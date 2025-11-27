/**
 * 폐기물 감량 계산기 페이지
 * 재활용과 분리수거로 절약되는 비용과 환경 효과 계산
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

// 재활용품별 수거 가격 (kg당 원, 2024년 기준)
const RECYCLING_PRICES = {
  paper: 50,      // 종이류 (kg당)
  plastic: 200,   // 플라스틱 (kg당)
  can: 800,       // 캔류 (kg당)
  glass: 30,      // 유리병 (kg당)
  vinyl: 100,     // 비닐류 (kg당)
};

// 폐기물 처리 비용 (kg당 원, 일반쓰레기)
const WASTE_DISPOSAL_COST = 150; // kg당 처리 비용

// CO2 배출 계수 (kg CO2/kg 폐기물)
const CO2_EMISSION_FACTOR = 0.5; // 일반 폐기물 처리 시 배출되는 CO2

export default function WasteCalculatorPage() {
  const [paperKg, setPaperKg] = useState(0);
  const [plasticKg, setPlasticKg] = useState(0);
  const [canKg, setCanKg] = useState(0);
  const [glassKg, setGlassKg] = useState(0);
  const [vinylKg, setVinylKg] = useState(0);
  const [generalWasteKg, setGeneralWasteKg] = useState(0);

  const handlePaperChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPaperKg(normalizeInput(e.target.value));
  }, []);

  const handlePlasticChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlasticKg(normalizeInput(e.target.value));
  }, []);

  const handleCanChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCanKg(normalizeInput(e.target.value));
  }, []);

  const handleGlassChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlassKg(normalizeInput(e.target.value));
  }, []);

  const handleVinylChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVinylKg(normalizeInput(e.target.value));
  }, []);

  const handleGeneralWasteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralWasteKg(normalizeInput(e.target.value));
  }, []);

  // 계산 결과
  const results = useMemo(() => {
    const totalRecycled = paperKg + plasticKg + canKg + glassKg + vinylKg;
    if (totalRecycled <= 0 && generalWasteKg <= 0) {
      return null;
    }

    // 재활용 수익 계산
    const recyclingRevenue = 
      (paperKg * RECYCLING_PRICES.paper) +
      (plasticKg * RECYCLING_PRICES.plastic) +
      (canKg * RECYCLING_PRICES.can) +
      (glassKg * RECYCLING_PRICES.glass) +
      (vinylKg * RECYCLING_PRICES.vinyl);

    // 일반쓰레기 처리 비용 절감
    const disposalCostSaving = totalRecycled * WASTE_DISPOSAL_COST;

    // 총 절약 금액
    const totalSaving = recyclingRevenue + disposalCostSaving;

    // CO2 감축량 (재활용으로 인한 CO2 절감)
    const co2Reduction = totalRecycled * CO2_EMISSION_FACTOR;

    // 연간 환산 (월간 입력 기준)
    const annualSaving = totalSaving * 12;
    const annualCo2Reduction = co2Reduction * 12;

    return {
      totalRecycled,
      recyclingRevenue,
      disposalCostSaving,
      totalSaving,
      annualSaving,
      co2Reduction,
      annualCo2Reduction,
      generalWasteKg,
    };
  }, [paperKg, plasticKg, canKg, glassKg, vinylKg, generalWasteKg]);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '재활용으로 얼마나 절약할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '재활용품은 종류별로 kg당 30원~800원의 수거 가격을 받을 수 있으며, 일반쓰레기 처리 비용(kg당 약 150원)도 절감할 수 있습니다. 월 10kg만 재활용해도 연간 약 2만원 이상 절약할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '재활용은 환경에 어떤 도움이 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '재활용은 폐기물 처리 시 발생하는 CO2 배출을 줄이고, 새로운 원료 생산을 줄여 환경 부담을 크게 감소시킵니다. 1kg 재활용으로 약 0.5kg의 CO2를 절감할 수 있습니다.'
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
          title="폐기물 감량 계산기 – 재활용으로 절약되는 금액은?"
          description="재활용과 분리수거로 절약되는 비용과 환경 효과를 계산해보세요"
        />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">월간 재활용 및 폐기물 정보 입력</h2>
          
          <div className="space-y-4 sm:space-y-5">
            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="paper" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">📄</span>
                종이류 재활용량 (kg/월)
              </Label>
              <Input
                id="paper"
                type="number"
                min="0"
                step="0.1"
                value={paperKg || ''}
                onChange={handlePaperChange}
                placeholder="예: 5"
                aria-label="월간 종이류 재활용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                신문지, 종이팩, 골판지 등 (kg당 약 {formatNumber(RECYCLING_PRICES.paper)}원)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100">
              <Label htmlFor="plastic" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🥤</span>
                플라스틱 재활용량 (kg/월)
              </Label>
              <Input
                id="plastic"
                type="number"
                min="0"
                step="0.1"
                value={plasticKg || ''}
                onChange={handlePlasticChange}
                placeholder="예: 3"
                aria-label="월간 플라스틱 재활용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                페트병, 플라스틱 용기 등 (kg당 약 {formatNumber(RECYCLING_PRICES.plastic)}원)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-orange-50/50 rounded-lg border border-orange-100">
              <Label htmlFor="can" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🥫</span>
                캔류 재활용량 (kg/월)
              </Label>
              <Input
                id="can"
                type="number"
                min="0"
                step="0.1"
                value={canKg || ''}
                onChange={handleCanChange}
                placeholder="예: 2"
                aria-label="월간 캔류 재활용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                알루미늄캔, 철캔 등 (kg당 약 {formatNumber(RECYCLING_PRICES.can)}원)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-purple-50/50 rounded-lg border border-purple-100">
              <Label htmlFor="glass" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🍶</span>
                유리병 재활용량 (kg/월)
              </Label>
              <Input
                id="glass"
                type="number"
                min="0"
                step="0.1"
                value={glassKg || ''}
                onChange={handleGlassChange}
                placeholder="예: 1"
                aria-label="월간 유리병 재활용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                맥주병, 소주병 등 (kg당 약 {formatNumber(RECYCLING_PRICES.glass)}원)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-cyan-50/50 rounded-lg border border-cyan-100">
              <Label htmlFor="vinyl" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🛍️</span>
                비닐류 재활용량 (kg/월)
              </Label>
              <Input
                id="vinyl"
                type="number"
                min="0"
                step="0.1"
                value={vinylKg || ''}
                onChange={handleVinylChange}
                placeholder="예: 2"
                aria-label="월간 비닐류 재활용량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                비닐봉지, 포장재 등 (kg당 약 {formatNumber(RECYCLING_PRICES.vinyl)}원)
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-gray-50/50 rounded-lg border border-gray-100">
              <Label htmlFor="general" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🗑️</span>
                일반쓰레기량 (kg/월) - 참고용
              </Label>
              <Input
                id="general"
                type="number"
                min="0"
                step="0.1"
                value={generalWasteKg || ''}
                onChange={handleGeneralWasteChange}
                placeholder="예: 10"
                aria-label="월간 일반쓰레기량"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-gray-500 focus:ring-gray-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                재활용을 늘리면 일반쓰레기 처리 비용도 절감됩니다
              </p>
            </div>
          </div>
        </Card>

        {/* 결과 카드 */}
        {results && results.totalRecycled > 0 && (
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 shadow-xl">
            <div className="text-center space-y-4 sm:space-y-5">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  재활용으로 연간 절약 가능한 금액은
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-2 break-words">
                    {formatNumber(results.annualSaving)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (월간 약 {formatNumber(results.totalSaving)}원)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-green-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(results.totalRecycled, 1)} kg
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">월간 재활용량</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(results.recyclingRevenue)}원
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">재활용 수익</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-2 break-words">
                    {formatEmission(results.annualCo2Reduction / 1000, 2)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 CO₂ 감축</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tips">
                    <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
                      재활용 팁 보기
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-green-50 hover:border-green-300">
                      분리수거 가이드
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 재활용 가이드 */}
        <Card className="p-4 sm:p-6 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">♻️ 재활용품별 수거 가격 안내</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">📄 종이류</div>
              <div className="text-sm text-gray-600">kg당 약 {formatNumber(RECYCLING_PRICES.paper)}원</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🥤 플라스틱</div>
              <div className="text-sm text-gray-600">kg당 약 {formatNumber(RECYCLING_PRICES.plastic)}원</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🥫 캔류</div>
              <div className="text-sm text-gray-600">kg당 약 {formatNumber(RECYCLING_PRICES.can)}원</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🍶 유리병</div>
              <div className="text-sm text-gray-600">kg당 약 {formatNumber(RECYCLING_PRICES.glass)}원</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-1">🛍️ 비닐류</div>
              <div className="text-sm text-gray-600">kg당 약 {formatNumber(RECYCLING_PRICES.vinyl)}원</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
            * 수거 가격은 지역 및 시기에 따라 변동될 수 있습니다. 정확한 가격은 지역 재활용센터에 문의하세요.
          </p>
        </Card>

        {/* 재활용 팁 */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 재활용 효과 극대화 팁</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>• <strong>올바른 분리수거:</strong> 재활용품은 깨끗이 씻어서 분리하면 수거 가격이 높아집니다</li>
            <li>• <strong>압축하기:</strong> 페트병, 캔 등은 압축하여 부피를 줄이면 더 많이 수거할 수 있습니다</li>
            <li>• <strong>일회용품 줄이기:</strong> 재사용 가능한 제품을 사용하면 재활용량과 함께 일반쓰레기도 줄어듭니다</li>
            <li>• <strong>지역별 수거일 확인:</strong> 정기적으로 수거하는 날을 확인하여 효율적으로 재활용하세요</li>
            <li>• <strong>재활용 마크 확인:</strong> 제품의 재활용 마크를 확인하여 올바르게 분리하세요</li>
          </ul>
        </Card>
      </PageContainer>
    </>
  );
}

