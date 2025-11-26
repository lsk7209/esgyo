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
      content: `작년 한 해 동안 탄소중립포인트 제도를 활용하여 연간 7만원의 포인트를 받을 수 있었습니다. 
      특별한 노력을 하지 않고도 일상 속 작은 실천만으로 이 정도의 포인트를 받을 수 있다는 것을 직접 경험했습니다.
      
      주로 텀블러 사용과 대중교통 이용을 통해 포인트를 받았는데, 주 3-4회 정도 텀블러를 사용하고 
      월 평균 100km 정도 대중교통을 이용했습니다. 이렇게 꾸준히 실천한 결과 연간 약 7만원의 포인트를 받을 수 있었습니다.
      
      포인트는 제휴 은행 포인트로 전환하여 사용했는데, 매우 간편하게 전환할 수 있었습니다. 
      앞으로도 계속 실천하여 더 많은 포인트를 받을 계획입니다.`,
      date: '2025-01-15',
    },
    {
      title: '스타벅스 텀블러 할인과 탄소중립포인트 중복 받는 방법',
      excerpt: '카페 할인과 정부 포인트를 동시에 받는 꿀팁을 알려드립니다.',
      content: `많은 분들이 궁금해하시는 부분인데, 스타벅스 텀블러 할인과 탄소중립포인트는 중복으로 받을 수 있습니다.
      
      스타벅스에서는 텀블러를 가져오면 음료 가격에서 일정 금액을 할인해주는데, 이는 카페의 정책입니다. 
      반면 탄소중립포인트는 정부에서 운영하는 제도로, 두 제도는 완전히 별개입니다.
      
      따라서 스타벅스에서 텀블러 할인을 받으면서 동시에 환경부에 탄소중립포인트를 신청하면 
      할인 혜택과 포인트를 모두 받을 수 있습니다. 이는 친환경 실천을 장려하는 좋은 방법이므로 적극 활용하시기 바랍니다.`,
      date: '2025-01-10',
    },
    {
      title: '대중교통 이용으로 환경도 지키고 포인트도 받기',
      excerpt: '승용차 대신 대중교통을 이용하면 환경도 지키고 포인트도 받을 수 있는 방법을 소개합니다.',
      content: `승용차 대신 대중교통을 이용하면 환경도 지키고 탄소중립포인트도 받을 수 있습니다.
      
      대중교통 이용 거리 1km당 5포인트를 받을 수 있는데, 월 100km만 이용해도 연간 6,000원의 포인트를 받을 수 있습니다. 
      통근 거리가 긴 분들이라면 더 많은 포인트를 받을 수 있습니다.
      
      교통카드 사용 내역이나 대중교통 앱의 이용 기록을 통해 거리를 확인할 수 있으며, 
      환경부 앱에 이 정보를 연동하거나 수동으로 입력하여 신청할 수 있습니다.
      
      대중교통 이용은 환경 보호에도 도움이 되고 포인트도 받을 수 있어 일석이조입니다.`,
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
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">{post.title}</h2>
                <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{post.date}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                {post.content.split('\n').slice(0, 3).join(' ')}
              </div>
              <Button variant="outline" size="sm" className="min-h-[36px]">
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

