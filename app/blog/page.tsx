/**
 * 블로그 페이지
 * AdSense 최적화 롱폼 콘텐츠
 */

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';

export default function BlogPage() {
  const posts = [
    {
      title: '탄소중립포인트로 연간 7만원 받은 후기',
      excerpt: '텀블러 사용과 대중교통 이용만으로도 연간 7만원의 포인트를 받을 수 있었던 실제 경험을 공유합니다.',
      date: '2025-01-15',
    },
    {
      title: '스타벅스 텀블러 할인과 탄소중립포인트 중복 받는 방법',
      excerpt: '카페 할인과 정부 포인트를 동시에 받는 꿀팁을 알려드립니다.',
      date: '2025-01-10',
    },
    {
      title: '대중교통 이용으로 환경도 지키고 포인트도 받기',
      excerpt: '승용차 대신 대중교통을 이용하면 환경도 지키고 포인트도 받을 수 있는 방법을 소개합니다.',
      date: '2025-01-05',
    },
  ];

  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="탄소중립포인트 이야기"
        description="실제 사용자 후기와 절약 팁을 공유합니다"
      />

      {/* AdSense Slot 1 */}
      <AdSenseSlot slotId="blog-top" className="my-8" />

      {/* 블로그 포스트 목록 */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Button variant="outline" size="sm">
                더 읽기 →
              </Button>
            </Card>
            
            {/* 포스트 사이 광고 슬롯 */}
            {index < posts.length - 1 && (
              <AdSenseSlot slotId={`blog-middle-${index + 1}`} className="my-6" />
            )}
          </div>
        ))}
      </div>

      {/* AdSense Slot 2 - 하단 */}
      <AdSenseSlot slotId="blog-bottom" className="my-8" />

      {/* CTA */}
      <div className="mt-12 text-center space-y-4">
        <Link href="/calculator">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            내 포인트 계산하기
          </Button>
        </Link>
        <Link href="/guide">
          <Button variant="outline" size="lg" className="ml-4">
            신청 가이드 보기
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
}

