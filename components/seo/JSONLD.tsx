/**
 * JSON-LD Structured Data
 * 안전성: JSON.stringify만 사용하므로 XSS 위험 없음
 */

import { useMemo } from 'react';

interface JSONLDProps {
  type: 'FAQPage' | 'SoftwareApplication';
  data: Record<string, unknown>;
}

export default function JSONLD({ type, data }: JSONLDProps) {
  // useMemo로 JSON 문자열 생성 최적화
  const jsonString = useMemo(() => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };
    return JSON.stringify(baseSchema);
  }, [type, data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

