/**
 * 절약 팁 페이지
 * 미니 계산기 포함 + AdSense 최적화
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { normalizeInput } from '@/lib/validation';
import { formatNumber } from '@/lib/formatting';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import Link from 'next/link';

export default function TipsPage() {
  // 전기요금 절약 계산기
  const [electricityReduction, setElectricityReduction] = useState(0);
  const [gasReduction, setGasReduction] = useState(0);

  const handleElectricityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setElectricityReduction(normalizeInput(e.target.value));
  }, []);

  const handleGasChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGasReduction(normalizeInput(e.target.value));
  }, []);

  // 전기요금 절약 효과 계산 (월 1만원 절약 시 연간 효과)
  const electricityAnnual = useMemo(() => {
    return electricityReduction * 12;
  }, [electricityReduction]);

  // 가스요금 절약 효과 계산
  const gasAnnual = useMemo(() => {
    return gasReduction * 12;
  }, [gasReduction]);

  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="일상 속 절약 팁"
        description="작은 실천으로 환경도 지키고 돈도 절약하는 방법"
      />

      {/* AdSense Slot 1 */}
      <AdSenseSlot slotId="tips-top" className="my-8" />

      {/* 미니 계산기 1: 전기요금 절약 */}
      <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">전기요금 절약 계산기</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          전기요금을 절약하면 연간 얼마나 절약되는지 계산해보세요.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="electricity" className="text-sm sm:text-base">월간 전기요금 절약액 (원)</Label>
            <Input
              id="electricity"
              type="number"
              min="0"
              step="1000"
              value={electricityReduction || ''}
              onChange={handleElectricityChange}
              placeholder="예: 10000"
              className="mt-1 h-10 sm:h-11 text-base"
            />
          </div>
          
          {electricityReduction > 0 && (
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">연간 절약액</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 break-words">
                {formatNumber(electricityAnnual)}원
              </p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                * 전기요금 절약은 탄소중립포인트와 별개로 추가 절약 효과입니다.
              </p>
            </div>
          )}
        </div>
      </Card>

      <AdSenseSlot slotId="tips-middle-1" className="my-4 sm:my-6" />

      {/* 미니 계산기 2: 가스요금 절약 */}
      <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">가스요금 절약 계산기</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          가스 사용량을 줄이면 연간 얼마나 절약되는지 계산해보세요.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="gas" className="text-sm sm:text-base">월간 가스요금 절약액 (원)</Label>
            <Input
              id="gas"
              type="number"
              min="0"
              step="1000"
              value={gasReduction || ''}
              onChange={handleGasChange}
              placeholder="예: 5000"
              className="mt-1 h-10 sm:h-11 text-base"
            />
          </div>
          
          {gasReduction > 0 && (
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">연간 절약액</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 break-words">
                {formatNumber(gasAnnual)}원
              </p>
            </div>
          )}
        </div>
      </Card>

      <AdSenseSlot slotId="tips-middle-2" className="my-6" />

      {/* 절약 팁 콘텐츠 */}
      <div className="space-y-4 sm:space-y-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">텀블러 사용으로 포인트 받기</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            카페에서 일회용 컵 대신 텀블러를 사용하면 1회당 300포인트를 받을 수 있습니다. 
            주 3회만 사용해도 연간 약 46,800원의 포인트를 받을 수 있어요.
          </p>
          <Link href="/calculator" className="text-sm sm:text-base text-green-600 hover:underline font-semibold inline-block">
            → 내 포인트 계산하기
          </Link>
        </Card>

        <AdSenseSlot slotId="tips-middle-3" className="my-4 sm:my-6" />

        <Card className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">대중교통 이용으로 포인트 받기</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            승용차 대신 대중교통을 이용하면 1km당 5포인트를 받을 수 있습니다. 
            월 100km만 이용해도 연간 6,000원의 포인트를 받을 수 있어요.
          </p>
          <Link href="/guide" className="text-sm sm:text-base text-green-600 hover:underline font-semibold inline-block">
            → 신청 방법 알아보기
          </Link>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">종이 영수증 안 받기</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            종이 영수증 대신 모바일 영수증을 받으면 1회당 100포인트를 받을 수 있습니다. 
            월 20회만 실천해도 연간 24,000원의 포인트를 받을 수 있어요.
          </p>
        </Card>

        <AdSenseSlot slotId="tips-middle-4" className="my-4 sm:my-6" />

        <Card className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">다회용 컵 리필 이용하기</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            카페에서 다회용 컵 리필이나 다회용 용기를 사용하면 1회당 2,000포인트를 받을 수 있습니다. 
            이는 가장 높은 포인트를 받을 수 있는 방법 중 하나입니다.
          </p>
        </Card>
      </div>

      {/* AdSense Slot 2 - 하단 */}
      <AdSenseSlot slotId="tips-bottom" className="my-8" />

      {/* CTA */}
      <div className="mt-8 sm:mt-12 text-center space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/calculator" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 min-h-[44px]">
              내 포인트 계산하기
            </Button>
          </Link>
          <Link href="/guide" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[44px]">
              신청 가이드 보기
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

