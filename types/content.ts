/**
 * 콘텐츠 타입 정의
 * 블로그, 절약 팁 등 확장 가능한 콘텐츠 구조
 */

export type ContentType = 'blog' | 'tip' | 'guide';

export type ContentCategory = 
  // 블로그 카테고리
  | 'carbon-point'      // 탄소중립포인트
  | 'saving'            // 절약
  | 'environment'       // 환경
  | 'lifestyle'         // 라이프스타일
  | 'news'              // 뉴스/트렌드
  | 'review'            // 후기/사례
  // 절약 팁 카테고리
  | 'electricity'       // 전기
  | 'gas'               // 가스
  | 'water'             // 수도
  | 'transport'         // 교통
  | 'shopping'          // 쇼핑
  | 'food'              // 음식
  | 'waste';            // 폐기물

export interface ContentMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  category: ContentCategory;
  tags: string[];
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  status: 'draft' | 'published';
  featured?: boolean;
  image?: string;
  readingTime?: number; // 분 단위
  viewCount?: number;
}

export interface BlogPost extends ContentMetadata {
  type: 'blog';
  content: string; // Markdown 또는 HTML
  excerpt?: string;
  relatedPosts?: string[]; // 관련 포스트 ID
  internalLinks?: Array<{
    text: string;
    url: string;
  }>;
  externalLinks?: Array<{
    text: string;
    url: string;
    description?: string;
  }>;
}

export interface TipPost extends ContentMetadata {
  type: 'tip';
  content: string;
  calculatorId?: string; // 관련 계산기 ID
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedSaving?: {
    amount: number;
    unit: string;
    period: 'month' | 'year';
  };
}

export interface ContentListParams {
  type?: ContentType;
  category?: ContentCategory;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

