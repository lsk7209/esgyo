/**
 * 탄소중립포인트 계산기 메인 페이지
 * AdSense 최적화 레이아웃
 */

'use client';

import { useCallback, useMemo } from 'react';
import { usePersonalStore } from '@/stores/personalStore';
import { normalizeInput } from '@/lib/validation';
import { formatNumber, formatEmission } from '@/lib/formatting';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import Link from 'next/link';
import JSONLD from '@/components/seo/JSONLD';

export default function CalculatorPage() {
  const {
    tumblerPerWeek,
    receiptPerMonth,
    refillPerMonth,
    publicTransitKmPerMonth,
    annualPoint,
    expectedCash,
    co2Reduction,
    treeEquivalent,
    setTumblerPerWeek,
    setReceiptPerMonth,
    setRefillPerMonth,
    setPublicTransitKmPerMonth,
  } = usePersonalStore();

  const handleTumblerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setTumblerPerWeek(value);
  }, [setTumblerPerWeek]);

  const handleReceiptChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setReceiptPerMonth(value);
  }, [setReceiptPerMonth]);

  const handleRefillChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setRefillPerMonth(value);
  }, [setRefillPerMonth]);

  const handleTransitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setPublicTransitKmPerMonth(value);
  }, [setPublicTransitKmPerMonth]);

  const hasInput = useMemo(() => 
    tumblerPerWeek > 0 || receiptPerMonth > 0 || refillPerMonth > 0 || publicTransitKmPerMonth > 0,
    [tumblerPerWeek, receiptPerMonth, refillPerMonth, publicTransitKmPerMonth]
  );

  // FAQ JSON-LD for AEO
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '탄소중립포인트는 어떻게 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트는 텀블러 사용, 종이 영수증 미발급, 대중교통 이용 등 친환경 행동을 실천하면 받을 수 있습니다. 환경부 앱이나 웹사이트를 통해 신청하고, 사용량 데이터를 제출하면 자동으로 포인트가 적립됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '탄소중립포인트는 현금으로 환급 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 탄소중립포인트는 1포인트 = 1원 기준으로 현금화하거나 제휴 은행·카드사 포인트로 전환할 수 있습니다. 연간 최대 70,000원까지 받을 수 있습니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="탄소중립포인트 계산기 – 올해 내가 받을 수 있는 금액은?"
          description="일상 속 작은 실천으로 받을 수 있는 포인트와 현금화 금액을 계산해보세요"
        />

        {/* AdSense Slot 1 - 상단 */}
        <AdSenseSlot slotId="calculator-top" className="my-8" />

        {/* 입력 폼 */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">나의 친환경 활동 입력</h2>
          
          <div className="space-y-5 sm:space-y-6">
            <div className="p-4 sm:p-5 bg-green-50/50 rounded-lg border border-green-100">
              <Label htmlFor="tumbler" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">☕</span>
                텀블러 사용 횟수 (주당)
              </Label>
              <Input
                id="tumbler"
                type="number"
                min="0"
                step="1"
                value={tumblerPerWeek || ''}
                onChange={handleTumblerChange}
                placeholder="예: 3"
                aria-label="주당 텀블러 사용 횟수"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                일회용 컵 대신 텀블러를 사용한 횟수를 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100">
              <Label htmlFor="receipt" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🧾</span>
                종이 영수증 미발급 횟수 (월)
              </Label>
              <Input
                id="receipt"
                type="number"
                min="0"
                step="1"
                value={receiptPerMonth || ''}
                onChange={handleReceiptChange}
                placeholder="예: 20"
                aria-label="월간 종이 영수증 미발급 횟수"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                종이 영수증 대신 모바일 영수증을 받은 횟수를 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-purple-50/50 rounded-lg border border-purple-100">
              <Label htmlFor="refill" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">♻️</span>
                다회용 컵 리필/용기 사용 (월)
              </Label>
              <Input
                id="refill"
                type="number"
                min="0"
                step="1"
                value={refillPerMonth || ''}
                onChange={handleRefillChange}
                placeholder="예: 5"
                aria-label="월간 다회용 컵 리필 또는 용기 사용 횟수"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                카페에서 다회용 컵 리필이나 다회용 용기를 사용한 횟수를 입력하세요
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-cyan-50/50 rounded-lg border border-cyan-100">
              <Label htmlFor="transit" className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span className="text-lg">🚇</span>
                대중교통 이용 거리 (월, km)
              </Label>
              <Input
                id="transit"
                type="number"
                min="0"
                step="0.1"
                value={publicTransitKmPerMonth || ''}
                onChange={handleTransitChange}
                placeholder="예: 100"
                aria-label="월간 대중교통 이용 거리"
                className="mt-2 h-11 sm:h-12 text-base bg-white border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                승용차 대신 대중교통을 이용한 거리를 입력하세요
              </p>
            </div>
          </div>
        </Card>

        {/* AdSense Slot 2 - 중단 */}
        <AdSenseSlot slotId="calculator-middle" className="my-8" />

        {/* 결과 카드 */}
        {hasInput && (
          <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 shadow-xl">
            <div className="text-center space-y-5 sm:space-y-7">
              <div className="space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 leading-relaxed font-medium">
                  당신이 1년 동안 받을 수 있는 예상 포인트는
                </p>
                <div className="inline-block bg-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 shadow-lg">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-2 break-words">
                    {formatNumber(expectedCash)}원
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    (포인트: {formatNumber(annualPoint)}P)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 pt-6 sm:pt-8 border-t border-green-200">
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 break-words">
                    {formatEmission(co2Reduction / 1000, 2)} tCO₂
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">CO₂ 감축량</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(treeEquivalent)}그루
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">나무 심기 효과</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 break-words">
                    {formatNumber(annualPoint)}P
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">연간 포인트</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                <Link href="/guide" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 shadow-md hover:shadow-lg transition-all duration-200">
                    신청 방법 보러가기
                  </Button>
                </Link>
                <Link href="/tips" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200">
                    다른 절약 팁 보기
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* AdSense Slot 3 - 하단 */}
        <AdSenseSlot slotId="calculator-bottom" className="my-8" />

        {/* 관련 가이드 섹션 */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">더 알아보기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link href="/guide">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="text-lg sm:text-xl font-bold mb-2">📖 신청 가이드</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  탄소중립포인트 신청 방법과 제휴 은행·카드사 안내
                </p>
              </Card>
            </Link>
            <Link href="/tips">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="text-lg sm:text-xl font-bold mb-2">💡 절약 팁</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  일상 속에서 쉽게 실천할 수 있는 절약 팁과 추가 포인트 받는 방법
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

