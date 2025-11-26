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
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">나의 친환경 활동 입력</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="tumbler">텀블러 사용 횟수 (주당)</Label>
              <Input
                id="tumbler"
                type="number"
                min="0"
                step="1"
                value={tumblerPerWeek || ''}
                onChange={handleTumblerChange}
                placeholder="예: 3"
                aria-label="주당 텀블러 사용 횟수"
              />
              <p className="text-sm text-gray-500 mt-1">
                일회용 컵 대신 텀블러를 사용한 횟수를 입력하세요
              </p>
            </div>

            <div>
              <Label htmlFor="receipt">종이 영수증 미발급 횟수 (월)</Label>
              <Input
                id="receipt"
                type="number"
                min="0"
                step="1"
                value={receiptPerMonth || ''}
                onChange={handleReceiptChange}
                placeholder="예: 20"
                aria-label="월간 종이 영수증 미발급 횟수"
              />
              <p className="text-sm text-gray-500 mt-1">
                종이 영수증 대신 모바일 영수증을 받은 횟수를 입력하세요
              </p>
            </div>

            <div>
              <Label htmlFor="refill">다회용 컵 리필/용기 사용 (월)</Label>
              <Input
                id="refill"
                type="number"
                min="0"
                step="1"
                value={refillPerMonth || ''}
                onChange={handleRefillChange}
                placeholder="예: 5"
                aria-label="월간 다회용 컵 리필 또는 용기 사용 횟수"
              />
              <p className="text-sm text-gray-500 mt-1">
                카페에서 다회용 컵 리필이나 다회용 용기를 사용한 횟수를 입력하세요
              </p>
            </div>

            <div>
              <Label htmlFor="transit">대중교통 이용 거리 (월, km)</Label>
              <Input
                id="transit"
                type="number"
                min="0"
                step="0.1"
                value={publicTransitKmPerMonth || ''}
                onChange={handleTransitChange}
                placeholder="예: 100"
                aria-label="월간 대중교통 이용 거리"
              />
              <p className="text-sm text-gray-500 mt-1">
                승용차 대신 대중교통을 이용한 거리를 입력하세요
              </p>
            </div>
          </div>
        </Card>

        {/* AdSense Slot 2 - 중단 */}
        <AdSenseSlot slotId="calculator-middle" className="my-8" />

        {/* 결과 카드 */}
        {hasInput && (
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center space-y-6">
              <div>
                <p className="text-lg text-gray-600 mb-2">당신이 1년 동안 받을 수 있는 예상 포인트는</p>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {formatNumber(expectedCash)}원
                </div>
                <p className="text-gray-600">
                  (포인트: {formatNumber(annualPoint)}P)
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {formatEmission(co2Reduction / 1000, 2)} tCO₂
                  </div>
                  <p className="text-sm text-gray-600 mt-1">CO₂ 감축량</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {formatNumber(treeEquivalent)}그루
                  </div>
                  <p className="text-sm text-gray-600 mt-1">나무 심기 효과</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {formatNumber(annualPoint)}P
                  </div>
                  <p className="text-sm text-gray-600 mt-1">연간 포인트</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Link href="/guide">
                  <Button className="bg-green-600 hover:bg-green-700">
                    신청 방법 보러가기
                  </Button>
                </Link>
                <Link href="/tips">
                  <Button variant="outline">
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
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">더 알아보기</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/guide">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold mb-2">📖 신청 가이드</h3>
                <p className="text-gray-600">
                  탄소중립포인트 신청 방법과 제휴 은행·카드사 안내
                </p>
              </Card>
            </Link>
            <Link href="/tips">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold mb-2">💡 절약 팁</h3>
                <p className="text-gray-600">
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

