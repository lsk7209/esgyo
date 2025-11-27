/**
 * AdSense 광고 슬롯 컴포넌트
 * 실제 AdSense 연동 시 사용
 * 
 * 보안: CSP 정책에 따라 외부 스크립트 로드
 * 성능: 동적 로딩으로 초기 번들 크기 최적화
 */

'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface AdSenseSlotProps {
  slotId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSenseSlot({ slotId, className = '', style }: AdSenseSlotProps) {
  const adSlotRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // 개발 환경에서는 스크립트 로드하지 않음
    if (process.env.NODE_ENV === 'development' || !slotId || isLoadedRef.current) {
      return;
    }

    // AdSense 스크립트가 로드된 후 광고 초기화
    const loadAdSense = () => {
      if (window.adsbygoogle && adSlotRef.current) {
        try {
          window.adsbygoogle.push({});
          isLoadedRef.current = true;
        } catch (error) {
          // AdSense 로드 실패 시 무시 (개발 환경 등)
          if (process.env.NODE_ENV === 'development') {
            console.error('AdSense load error:', error);
          }
        }
      }
    };

    // 스크립트가 이미 로드되어 있는지 확인
    if (window.adsbygoogle) {
      loadAdSense();
    } else {
      // 스크립트 로드 대기
      const checkInterval = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkInterval);
          loadAdSense();
        }
      }, 100);

      // 5초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);
    }
  }, [slotId]);

  // 개발 환경에서는 플레이스홀더만 표시
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 ${className}`}
        style={style}
        role="img"
        aria-label="광고 영역"
      >
        <p className="text-sm">AdSense 광고 영역</p>
        {slotId && <p className="text-xs mt-1">Slot ID: {slotId}</p>}
      </div>
    );
  }
  
  // 프로덕션 환경에서는 실제 AdSense 코드 삽입
  // 실제 AdSense Publisher ID는 환경 변수로 관리 필요
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXX';
  
  return (
    <>
      {/* Next.js Script 컴포넌트로 AdSense 스크립트 로드 */}
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          onError={() => {
            if (process.env.NODE_ENV === 'development') {
              console.error('AdSense script load failed');
            }
          }}
        />
      )}
      <div 
        ref={adSlotRef}
        className={className} 
        style={style}
        aria-label="광고 영역"
        role="complementary"
      >
        {slotId && process.env.NODE_ENV === 'production' && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adClient}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </>
  );
}

// TypeScript 전역 타입 확장
declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

