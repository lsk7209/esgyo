/**
 * 블로그 페이지 클라이언트 컴포넌트
 * 필터링 및 검색 기능
 */

'use client';

import { useState, useMemo } from 'react';
import BlogFilter from '@/components/blog/BlogFilter';
import BlogPostList from '@/components/blog/BlogPostList';
import type { BlogPost, ContentCategory } from '@/types/content';

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialTags: string[];
}

export default function BlogPageClient({ initialPosts, initialTags }: BlogPageClientProps) {
  const [filters, setFilters] = useState<{
    category: ContentCategory | 'all';
    tag: string;
    search: string;
  }>({
    category: 'all',
    tag: '',
    search: '',
  });

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    let results = [...initialPosts];

    // 카테고리 필터
    if (filters.category !== 'all') {
      results = results.filter(post => post.category === filters.category);
    }

    // 태그 필터
    if (filters.tag) {
      results = results.filter(post => post.tags.includes(filters.tag));
    }

    // 검색 필터
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.keywords.some(k => k.toLowerCase().includes(searchLower))
      );
    }

    // 최신순 정렬
    results.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return results;
  }, [initialPosts, filters]);

  return (
    <>
      <BlogFilter
        tags={initialTags}
        onFilterChange={setFilters}
      />
      <BlogPostList posts={filteredPosts} />
    </>
  );
}

