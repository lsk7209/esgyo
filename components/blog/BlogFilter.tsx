/**
 * 블로그 필터 컴포넌트 (클라이언트)
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { BLOG_CATEGORIES, CONTENT_CATEGORIES } from '@/constants/contentCategories';
import type { ContentCategory } from '@/types/content';

interface BlogFilterProps {
  tags: string[];
  onFilterChange: (filters: {
    category: ContentCategory | 'all';
    tag: string;
    search: string;
  }) => void;
}

export default function BlogFilter({ tags, onFilterChange }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (category: ContentCategory | 'all') => {
    setSelectedCategory(category);
    setSelectedTag('');
    onFilterChange({
      category,
      tag: '',
      search: searchQuery,
    });
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    onFilterChange({
      category: selectedCategory,
      tag,
      search: searchQuery,
    });
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    onFilterChange({
      category: selectedCategory,
      tag: selectedTag,
      search,
    });
  };

  return (
    <Card className="p-4 sm:p-6 mb-4 sm:mb-5">
      <div className="space-y-4">
        {/* 검색 */}
        <div>
          <Input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-11 sm:h-12 text-base"
          />
        </div>

        {/* 카테고리 필터 */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">카테고리</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('all')}
              className="min-h-[36px]"
            >
              전체
            </Button>
            {BLOG_CATEGORIES.map((category) => {
              const config = CONTENT_CATEGORIES[category];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="min-h-[36px]"
                >
                  {config.icon} {config.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 태그 필터 */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">태그</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedTag ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTagChange('')}
                className="min-h-[36px]"
              >
                전체
              </Button>
              {tags.slice(0, 10).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagChange(tag)}
                  className="min-h-[36px]"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

