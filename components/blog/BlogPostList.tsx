/**
 * 블로그 포스트 목록 컴포넌트 (서버)
 */

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CONTENT_CATEGORIES } from '@/constants/contentCategories';
import type { BlogPost } from '@/types/content';

interface BlogPostListProps {
  posts: BlogPost[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <Card className="p-8 sm:p-12 text-center">
        <p className="text-gray-600 text-base sm:text-lg">
          아직 등록된 글이 없습니다.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post) => {
        const categoryConfig = CONTENT_CATEGORIES[post.category];
        return (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full group border hover:border-green-300">
              {post.image && (
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`${post.title} 대표 이미지`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg" role="img" aria-label={`${categoryConfig.name} 카테고리 아이콘`}>{categoryConfig.icon}</span>
                <span className={`text-xs px-2 py-1 rounded-full bg-${categoryConfig.color}-100 text-${categoryConfig.color}-700`}>
                  {categoryConfig.name}
                </span>
                {post.featured && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    추천
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
                {post.readingTime && (
                  <span>읽는 시간 {post.readingTime}분</span>
                )}
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

