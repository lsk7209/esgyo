# 콘텐츠 관리 시스템 가이드

## 개요

이에스지요는 다양한 검색어로 유입될 수 있도록 확장 가능한 콘텐츠 관리 시스템을 구축했습니다.

## 구조

### 1. 콘텐츠 타입

- **블로그** (`blog`): 롱폼 콘텐츠, 후기, 뉴스, 트렌드
- **절약 팁** (`tip`): 실천 가능한 절약 방법, 단계별 가이드
- **가이드** (`guide`): 신청 방법, 제도 설명

### 2. 카테고리 시스템

#### 블로그 카테고리
- `carbon-point`: 탄소중립포인트
- `saving`: 절약
- `environment`: 환경
- `lifestyle`: 라이프스타일
- `news`: 뉴스/트렌드
- `review`: 후기/사례

#### 절약 팁 카테고리
- `electricity`: 전기
- `gas`: 가스
- `water`: 수도
- `transport`: 교통
- `shopping`: 쇼핑
- `food`: 음식
- `waste`: 폐기물

### 3. 콘텐츠 등록 방법

```typescript
import { registerContent } from '@/lib/content';
import type { BlogPost, TipPost } from '@/types/content';

// 블로그 포스트 등록
const blogPost: BlogPost = {
  id: 'unique-id',
  slug: 'blog-post-slug',
  type: 'blog',
  title: '제목',
  description: '설명',
  metaTitle: 'SEO 제목',
  metaDescription: 'SEO 설명',
  keywords: ['키워드1', '키워드2'],
  category: 'carbon-point',
  tags: ['태그1', '태그2'],
  content: '<p>HTML 콘텐츠</p>',
  publishedAt: '2025-01-01',
  status: 'published',
  featured: false,
};

registerContent(blogPost);

// 절약 팁 등록
const tipPost: TipPost = {
  id: 'unique-id',
  slug: 'tip-slug',
  type: 'tip',
  title: '제목',
  description: '설명',
  category: 'electricity',
  tags: ['전기', '절약'],
  content: '<p>HTML 콘텐츠</p>',
  publishedAt: '2025-01-01',
  status: 'published',
  difficulty: 'easy',
  estimatedSaving: {
    amount: 10000,
    unit: '원',
    period: 'month',
  },
  calculatorId: 'electricity',
};

registerContent(tipPost);
```

### 4. 동적 라우팅

- 블로그: `/blog/[slug]`
- 절약 팁: `/tips/[slug]`

각 콘텐츠는 고유한 `slug`로 접근 가능하며, 자동으로 메타데이터와 SEO 최적화가 적용됩니다.

### 5. 검색 및 필터링

- 카테고리별 필터
- 태그별 필터
- 검색어 검색
- Featured 콘텐츠 표시

### 6. SEO 최적화

- 각 콘텐츠별 동적 메타데이터 생성
- Article JSON-LD (블로그)
- HowTo JSON-LD (절약 팁)
- 자동 sitemap 포함
- 관련 콘텐츠 추천

### 7. 확장 방법

#### 새 카테고리 추가
1. `types/content.ts`에 카테고리 타입 추가
2. `constants/contentCategories.ts`에 카테고리 설정 추가

#### 새 콘텐츠 타입 추가
1. `types/content.ts`에 타입 정의 추가
2. `lib/content.ts`에 필터링 로직 추가
3. 페이지 컴포넌트 생성

## 실제 운영 시 권장사항

### 데이터베이스 연동
현재는 메모리 기반 저장소를 사용하지만, 실제 운영 시에는:
- 데이터베이스 (PostgreSQL, MongoDB 등)
- CMS (Contentful, Sanity, Strapi 등)
- 파일 기반 (Markdown + Frontmatter)

### 콘텐츠 작성 워크플로우
1. 콘텐츠 작성 (Markdown 또는 CMS)
2. 메타데이터 설정 (제목, 설명, 키워드, 태그)
3. 카테고리 및 태그 할당
4. SEO 최적화 확인
5. 발행

### SEO 체크리스트
- [ ] 고유한 제목 및 설명
- [ ] 타겟 키워드 포함
- [ ] 최소 500자 이상의 본문
- [ ] 내부 링크 2개 이상
- [ ] 외부 링크 1개 이상
- [ ] 이미지 Alt 텍스트
- [ ] 관련 콘텐츠 연결

