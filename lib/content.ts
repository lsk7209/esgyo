/**
 * 콘텐츠 관리 유틸리티
 * 확장 가능한 콘텐츠 관리 시스템
 */

import type { ContentMetadata, BlogPost, TipPost, ContentListParams, ContentType, ContentCategory } from '@/types/content';

// 임시 콘텐츠 저장소 (실제로는 DB 또는 CMS 사용)
// 개발 단계에서는 파일 기반 또는 메모리 기반으로 관리
let contentStore: Map<string, BlogPost | TipPost> = new Map();

/**
 * 콘텐츠 등록
 */
export function registerContent(content: BlogPost | TipPost): void {
  contentStore.set(content.id, content);
}

/**
 * 콘텐츠 조회 (ID 또는 slug로 조회)
 */
export function getContent(idOrSlug: string): BlogPost | TipPost | undefined {
  // 먼저 ID로 조회 시도
  const byId = contentStore.get(idOrSlug);
  if (byId) return byId;
  
  // slug로 조회
  return Array.from(contentStore.values()).find(
    content => content.slug === idOrSlug
  );
}

/**
 * 콘텐츠 목록 조회
 */
export function getContentList(params: ContentListParams = {}): (BlogPost | TipPost)[] {
  const {
    type,
    category,
    tag,
    search,
    featured,
    page = 1,
    limit = 10,
  } = params;

  let results = Array.from(contentStore.values())
    .filter(content => content.status === 'published');

  // 타입 필터
  if (type) {
    results = results.filter(content => content.type === type);
  }

  // 카테고리 필터
  if (category) {
    results = results.filter(content => content.category === category);
  }

  // 태그 필터
  if (tag) {
    results = results.filter(content => content.tags.includes(tag));
  }

  // 검색 필터
  if (search) {
    const searchLower = search.toLowerCase();
    results = results.filter(content => 
      content.title.toLowerCase().includes(searchLower) ||
      content.description.toLowerCase().includes(searchLower) ||
      content.keywords.some(k => k.toLowerCase().includes(searchLower))
    );
  }

  // Featured 필터
  if (featured !== undefined) {
    results = results.filter(content => content.featured === featured);
  }

  // 정렬 (최신순)
  results.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // 페이지네이션
  const start = (page - 1) * limit;
  const end = start + limit;

  return results.slice(start, end);
}

/**
 * 카테고리별 콘텐츠 수 조회
 */
export function getContentCountByCategory(category: ContentCategory): number {
  return Array.from(contentStore.values())
    .filter(content => 
      content.status === 'published' && 
      content.category === category
    ).length;
}

/**
 * 태그 목록 조회
 */
export function getAllTags(type?: ContentType): string[] {
  const contents = type 
    ? Array.from(contentStore.values()).filter(c => c.type === type)
    : Array.from(contentStore.values());
  
  const tagSet = new Set<string>();
  contents
    .filter(c => c.status === 'published')
    .forEach(content => {
      content.tags.forEach(tag => tagSet.add(tag));
    });
  
  return Array.from(tagSet).sort();
}

/**
 * 관련 콘텐츠 조회
 */
export function getRelatedContent(
  currentId: string,
  limit: number = 3
): (BlogPost | TipPost)[] {
  const current = contentStore.get(currentId);
  if (!current) return [];

  return Array.from(contentStore.values())
    .filter(content => 
      content.id !== currentId &&
      content.status === 'published' &&
      (content.category === current.category ||
       content.tags.some(tag => current.tags.includes(tag)))
    )
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

/**
 * 인기 콘텐츠 조회 (조회수 기준)
 */
export function getPopularContent(
  type?: ContentType,
  limit: number = 5
): (BlogPost | TipPost)[] {
  let results = Array.from(contentStore.values())
    .filter(content => content.status === 'published');

  if (type) {
    results = results.filter(content => content.type === type);
  }

  return results
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
}

/**
 * 모든 콘텐츠의 slug 목록 조회 (동적 라우팅용)
 */
export function getAllContentSlugs(type?: ContentType): string[] {
  let contents = Array.from(contentStore.values())
    .filter(content => content.status === 'published');
  
  if (type) {
    contents = contents.filter(content => content.type === type);
  }
  
  return contents.map(content => content.slug);
}

