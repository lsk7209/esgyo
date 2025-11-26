/**
 * JSON-LD Structured Data
 * 안전성: JSON.stringify만 사용하므로 XSS 위험 없음
 * 
 * SEO 최적화: 구조화된 데이터로 검색 엔진 최적화
 * 성능: useMemo로 불필요한 재생성 방지
 */

import { useMemo } from 'react';

interface JSONLDProps {
  type: 'FAQPage' | 'SoftwareApplication' | 'WebSite' | 'Organization';
  data: Record<string, unknown>;
}

export default function JSONLD({ type, data }: JSONLDProps) {
  // useMemo로 JSON 문자열 생성 최적화
  const jsonString = useMemo(() => {
    try {
      const baseSchema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
      };
      return JSON.stringify(baseSchema, null, 0); // 압축된 JSON
    } catch (error) {
      // JSON 직렬화 실패 시 빈 객체 반환
      console.error('JSON-LD serialization error:', error);
      return '{}';
    }
  }, [type, data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
      suppressHydrationWarning // JSON-LD는 클라이언트에서 동적으로 변경될 수 있음
    />
  );
}

