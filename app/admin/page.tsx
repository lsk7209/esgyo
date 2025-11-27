/**
 * 관리자 대시보드
 * 통계, 콘텐츠 관리 등
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { getContentList } from '@/lib/content';
import { CONTENT_CATEGORIES } from '@/constants/contentCategories';
import type { ContentCategory } from '@/types/content';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState('stats');

  // 전체 콘텐츠 가져오기
  const allBlogPosts = useMemo(() => getContentList({ type: 'blog', limit: 1000 }), []);
  const allTipPosts = useMemo(() => getContentList({ type: 'tip', limit: 1000 }), []);

  // 통계 계산
  const stats = useMemo(() => {
    const totalPosts = allBlogPosts.length + allTipPosts.length;
    const totalViews = [...allBlogPosts, ...allTipPosts].reduce((sum, post) => sum + (post.viewCount || 0), 0);
    const featuredPosts = [...allBlogPosts, ...allTipPosts].filter(post => post.featured).length;
    
    // 카테고리별 통계
    const categoryStats: Record<string, number> = {};
    [...allBlogPosts, ...allTipPosts].forEach(post => {
      categoryStats[post.category] = (categoryStats[post.category] || 0) + 1;
    });

    // 최근 발행된 콘텐츠 (최근 7일)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentPosts = [...allBlogPosts, ...allTipPosts].filter(post => 
      new Date(post.publishedAt) >= sevenDaysAgo
    ).length;

    // 인기 콘텐츠 (조회수 기준)
    const popularPosts = [...allBlogPosts, ...allTipPosts]
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 10);

    return {
      totalPosts,
      totalViews,
      featuredPosts,
      categoryStats,
      recentPosts,
      popularPosts,
    };
  }, [allBlogPosts, allTipPosts]);

  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="관리자 대시보드"
        description="사이트 통계 및 콘텐츠 관리"
      />

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">통계</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 관리</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>

        {/* 통계 탭 */}
        <TabsContent value="stats" className="space-y-6">
          {/* 전체 통계 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-2">전체 콘텐츠</div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalPosts}</div>
              <div className="text-xs text-gray-500 mt-1">
                블로그: {allBlogPosts.length} | 팁: {allTipPosts.length}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-2">총 조회수</div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">평균: {stats.totalPosts > 0 ? Math.round(stats.totalViews / stats.totalPosts) : 0}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-2">추천 콘텐츠</div>
              <div className="text-3xl font-bold text-gray-900">{stats.featuredPosts}</div>
              <div className="text-xs text-gray-500 mt-1">전체의 {stats.totalPosts > 0 ? Math.round((stats.featuredPosts / stats.totalPosts) * 100) : 0}%</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-2">최근 7일 발행</div>
              <div className="text-3xl font-bold text-gray-900">{stats.recentPosts}</div>
              <div className="text-xs text-gray-500 mt-1">새 콘텐츠</div>
            </Card>
          </div>

          {/* 카테고리별 통계 */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">카테고리별 콘텐츠 수</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(stats.categoryStats).map(([category, count]) => {
                const categoryConfig = CONTENT_CATEGORIES[category as ContentCategory];
                return (
                  <div key={category} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{categoryConfig?.icon || '📄'}</span>
                      <span className="text-sm font-semibold">{categoryConfig?.name || category}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 인기 콘텐츠 */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">인기 콘텐츠 (조회수 기준)</h2>
            <div className="space-y-3">
              {stats.popularPosts.map((post, index) => {
                const categoryConfig = CONTENT_CATEGORIES[post.category];
                return (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg font-bold text-gray-400 w-8">{index + 1}</span>
                      <span className="text-lg">{categoryConfig?.icon || '📄'}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-600">
                          {categoryConfig?.name || post.category} • {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{post.viewCount || 0}</div>
                      <div className="text-xs text-gray-500">조회수</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* 콘텐츠 관리 탭 */}
        <TabsContent value="content" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">블로그 포스트</h2>
              <Button>새 포스트 작성</Button>
            </div>
            <div className="space-y-2">
              {allBlogPosts.map((post) => {
                const categoryConfig = CONTENT_CATEGORIES[post.category];
                return (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <span>{categoryConfig?.icon || '📄'}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-sm text-gray-600">
                          {post.slug} • {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">조회: {post.viewCount || 0}</span>
                      <Button variant="outline" size="sm">수정</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">절약 팁</h2>
              <Button>새 팁 작성</Button>
            </div>
            <div className="space-y-2">
              {allTipPosts.map((post) => {
                const categoryConfig = CONTENT_CATEGORIES[post.category];
                return (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <span>{categoryConfig?.icon || '📄'}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-sm text-gray-600">
                          {post.slug} • {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">조회: {post.viewCount || 0}</span>
                      <Button variant="outline" size="sm">수정</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* 설정 탭 */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">사이트 설정</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">사이트 URL</label>
                <input
                  type="text"
                  defaultValue={process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr'}
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">RSS 피드 URL</label>
                <input
                  type="text"
                  defaultValue={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr'}/rss.xml`}
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">사이트맵 URL</label>
                <input
                  type="text"
                  defaultValue={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr'}/sitemap.xml`}
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">SEO 설정</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-semibold mb-2">✅ 구현 완료</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 사이트맵 (sitemap.xml)</li>
                  <li>• RSS 피드 (rss.xml)</li>
                  <li>• robots.txt</li>
                  <li>• 메타 태그 (각 페이지별)</li>
                  <li>• Canonical URL</li>
                  <li>• Open Graph 태그</li>
                  <li>• JSON-LD 구조화된 데이터</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

