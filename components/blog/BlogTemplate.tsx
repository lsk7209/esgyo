/**
 * SEO/GenEO/AEO 최적화 블로그 템플릿 컴포넌트
 * 구조화된 콘텐츠로 검색 엔진 최적화
 */

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogTemplateProps {
  // 헤더
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  category?: {
    name: string;
    icon: string;
  };
  
  // 핵심 요약 (AEO 최적화)
  summary: {
    question: string; // 질문형 제목 또는 핵심 질문
    answer: string; // 2-4문장 핵심 답변 (110자 이내 권장)
  };
  
  // 본문 섹션
  sections: Array<{
    title: string;
    content: string | React.ReactNode;
    subsections?: Array<{
      title: string;
      content: string | React.ReactNode;
    }>;
  }>;
  
  // FAQ 섹션 (AEO 최적화)
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  
  // 내부 링크 (최소 2개)
  internalLinks: Array<{
    text: string;
    url: string;
    description?: string;
  }>;
  
  // 외부 링크 (최소 1개)
  externalLinks?: Array<{
    text: string;
    url: string;
    description?: string;
  }>;
  
  // CTA
  cta?: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      url: string;
    };
    secondaryButton?: {
      text: string;
      url: string;
    };
  };
  
}

export default function BlogTemplate({
  title,
  metaDescription,
  publishedAt,
  updatedAt,
  readingTime,
  category,
  summary,
  sections,
  faq = [],
  internalLinks,
  externalLinks = [],
  cta,
}: BlogTemplateProps) {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* 헤더 */}
      <div className="space-y-2 sm:space-y-3">
        {category && (
          <div className="flex items-center gap-2">
            <span className="text-xl">{category.icon}</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              {category.name}
            </span>
          </div>
        )}
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span>{new Date(publishedAt).toLocaleDateString('ko-KR')}</span>
          {updatedAt && (
            <>
              <span>•</span>
              <span>최종 수정: {new Date(updatedAt).toLocaleDateString('ko-KR')}</span>
            </>
          )}
          {readingTime && (
            <>
              <span>•</span>
              <span>읽는 시간 {readingTime}분</span>
            </>
          )}
        </div>
      </div>

      {/* 핵심 요약 (AEO 최적화) */}
      <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
          {summary.question}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          {summary.answer}
        </p>
      </Card>

        {/* 본문 섹션 */}
        {sections.map((section, index) => (
          <div key={index}>
            <Card className="p-4 sm:p-5 md:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {section.title}
              </h2>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed">
              {typeof section.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : (
                section.content
              )}
            </div>
            
            {/* 하위 섹션 */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="pl-4 border-l-4 border-green-200">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {subsection.title}
                    </h3>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
                      {typeof subsection.content === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: subsection.content }} />
                      ) : (
                        subsection.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      ))}

      {/* 내부 링크 섹션 */}
      {internalLinks.length > 0 && (
        <Card className="p-4 sm:p-5 md:p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            관련 콘텐츠
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {internalLinks.map((link, index) => (
              <Link key={index} href={link.url}>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {link.text}
                  </h3>
                  {link.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* 외부 링크 섹션 */}
      {externalLinks.length > 0 && (
        <Card className="p-4 sm:p-5 md:p-6 bg-gray-50">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            참고 자료
          </h2>
          <ul className="space-y-3">
            {externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 hover:underline font-medium inline-flex items-center gap-1"
                >
                  {link.text}
                  <span className="text-xs">↗</span>
                </a>
                {link.description && (
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {link.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* FAQ 섹션 (AEO 최적화) */}
      {faq.length > 0 && (
        <Card className="p-4 sm:p-5 md:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            자주 묻는 질문
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q. {item.question}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  A. {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* CTA 섹션 */}
      {cta && (
        <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {cta.title}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <Link href={cta.primaryButton.url}>
                <Button className="bg-green-600 hover:bg-green-700 text-white min-h-[48px] px-6 sm:px-8">
                  {cta.primaryButton.text}
                </Button>
              </Link>
              {cta.secondaryButton && (
                <Link href={cta.secondaryButton.url}>
                  <Button variant="outline" className="min-h-[48px] px-6 sm:px-8">
                    {cta.secondaryButton.text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

