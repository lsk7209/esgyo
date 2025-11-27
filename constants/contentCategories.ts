/**
 * 콘텐츠 카테고리 정의
 * SEO 및 네비게이션 최적화
 */

import type { ContentCategory } from '@/types/content';

export interface CategoryConfig {
  id: ContentCategory;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
  color: string;
}

export const CONTENT_CATEGORIES: Record<ContentCategory, CategoryConfig> = {
  // 블로그 카테고리
  'carbon-point': {
    id: 'carbon-point',
    name: '탄소중립포인트',
    description: '탄소중립포인트 제도, 신청 방법, 활용 팁',
    icon: '🌱',
    keywords: ['탄소중립포인트', '환경부 포인트', '친환경 실천', '포인트 적립'],
    color: 'green',
  },
  'saving': {
    id: 'saving',
    name: '절약',
    description: '일상 속 절약 방법과 실천 팁',
    icon: '💰',
    keywords: ['절약', '절약 팁', '돈 절약', '생활비 절감'],
    color: 'blue',
  },
  'environment': {
    id: 'environment',
    name: '환경',
    description: '환경 보호, 탄소 감축, 친환경 라이프스타일',
    icon: '🌍',
    keywords: ['환경', '친환경', '탄소 감축', '지구 보호'],
    color: 'emerald',
  },
  'lifestyle': {
    id: 'lifestyle',
    name: '라이프스타일',
    description: '친환경 라이프스타일, 실천 사례',
    icon: '✨',
    keywords: ['라이프스타일', '친환경 생활', '실천 사례'],
    color: 'purple',
  },
  'news': {
    id: 'news',
    name: '뉴스/트렌드',
    description: '환경 관련 뉴스, 정책, 트렌드',
    icon: '📰',
    keywords: ['환경 뉴스', '정책', '트렌드', '이슈'],
    color: 'orange',
  },
  'review': {
    id: 'review',
    name: '후기/사례',
    description: '실제 사용자 후기와 사례',
    icon: '⭐',
    keywords: ['후기', '사례', '체험기', '사용기'],
    color: 'yellow',
  },
  // 절약 팁 카테고리
  'electricity': {
    id: 'electricity',
    name: '전기',
    description: '전기요금 절약 팁',
    icon: '⚡',
    keywords: ['전기요금', '전력 절약', '전기비'],
    color: 'blue',
  },
  'gas': {
    id: 'gas',
    name: '가스',
    description: '가스요금 절약 팁',
    icon: '🔥',
    keywords: ['가스요금', '가스비', '연료 절약'],
    color: 'orange',
  },
  'water': {
    id: 'water',
    name: '수도',
    description: '수도요금 절약 팁',
    icon: '💧',
    keywords: ['수도요금', '물 절약', '수도비'],
    color: 'cyan',
  },
  'transport': {
    id: 'transport',
    name: '교통',
    description: '교통비 절약 팁',
    icon: '🚇',
    keywords: ['교통비', '대중교통', '연료비'],
    color: 'purple',
  },
  'shopping': {
    id: 'shopping',
    name: '쇼핑',
    description: '친환경 쇼핑 팁',
    icon: '🛒',
    keywords: ['친환경 쇼핑', '그린 쇼핑', '지속가능 쇼핑'],
    color: 'pink',
  },
  'food': {
    id: 'food',
    name: '음식',
    description: '음식물 쓰레기 감량 팁',
    icon: '🍽️',
    keywords: ['음식물 쓰레기', '음쓰 감량', '식비 절약'],
    color: 'amber',
  },
  'waste': {
    id: 'waste',
    name: '폐기물',
    description: '재활용 및 분리수거 팁',
    icon: '♻️',
    keywords: ['재활용', '분리수거', '폐기물 감량'],
    color: 'green',
  },
};

export const BLOG_CATEGORIES: ContentCategory[] = [
  'carbon-point',
  'saving',
  'environment',
  'lifestyle',
  'news',
  'review',
];

export const TIP_CATEGORIES: ContentCategory[] = [
  'electricity',
  'gas',
  'water',
  'transport',
  'shopping',
  'food',
  'waste',
];

