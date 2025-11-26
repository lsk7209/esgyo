/**
 * 홈페이지 - 랜딩 + 메인 계산기 요약
 * 개인용 탄소중립포인트 계산기
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';

export default function Home() {
  return (
    <PageContainer maxWidth="4xl">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <PageHeader
          title="올해 내가 받을 수 있는 탄소중립포인트는?"
          description="3분만 투자하면 1년 동안 받을 수 있는 포인트와 현금화 금액을 확인할 수 있습니다"
        />
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-8 shadow-lg">
          <p className="text-2xl font-bold mb-2">
            연간 최대 70,000원까지 받을 수 있어요!
          </p>
          <p className="text-green-50">
            텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 포인트를 받아보세요
          </p>
        </div>
      </div>

      {/* AdSense Slot 1 - 상단 */}
      <AdSenseSlot slotId="home-top" className="my-8" />

      {/* 메인 계산기 요약 */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">빠른 계산기</h2>
        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            간단한 정보만 입력하면 바로 예상 포인트를 확인할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">텀블러 사용</p>
              <p className="text-2xl font-bold text-green-600">주 3회</p>
              <p className="text-xs text-gray-500 mt-1">→ 연간 약 46,800원</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">대중교통 이용</p>
              <p className="text-2xl font-bold text-blue-600">월 100km</p>
              <p className="text-xs text-gray-500 mt-1">→ 연간 약 6,000원</p>
            </div>
          </div>
        </div>
        
        <Link href="/calculator">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
            자세히 계산하기 →
          </Button>
        </Link>
      </Card>

      {/* AdSense Slot 2 - 중단 */}
      <AdSenseSlot slotId="home-middle" className="my-8" />

      {/* 주요 기능 소개 */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="p-6 text-center">
          <div className="text-4xl mb-4">🧮</div>
          <h3 className="text-xl font-bold mb-2">정확한 계산</h3>
          <p className="text-gray-600 text-sm">
            환경부 기준으로 실제 받을 수 있는 포인트를 정확히 계산해드립니다
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-bold mb-2">신청 가이드</h3>
          <p className="text-gray-600 text-sm">
            복잡한 정부 제도를 3분 요약으로 쉽게 이해하고 신청할 수 있습니다
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold mb-2">절약 팁</h3>
          <p className="text-gray-600 text-sm">
            일상 속에서 쉽게 실천할 수 있는 절약 팁과 추가 포인트 받는 방법을 알려드립니다
          </p>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center space-y-4">
        <Link href="/guide">
          <Button variant="outline" size="lg">
            신청 방법 알아보기
          </Button>
        </Link>
        <Link href="/tips">
          <Button variant="outline" size="lg" className="ml-4">
            절약 팁 보기
          </Button>
        </Link>
      </div>

      {/* AdSense Slot 3 - 하단 */}
      <AdSenseSlot slotId="home-bottom" className="my-8" />
    </PageContainer>
  );
}
