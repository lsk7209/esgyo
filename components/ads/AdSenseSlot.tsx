/**
 * AdSense 광고 슬롯 컴포넌트
 * 실제 AdSense 연동 시 사용
 */

interface AdSenseSlotProps {
  slotId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSenseSlot({ slotId, className = '', style }: AdSenseSlotProps) {
  // 개발 환경에서는 플레이스홀더만 표시
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 ${className}`}
        style={style}
      >
        <p className="text-sm">AdSense 광고 영역</p>
        {slotId && <p className="text-xs mt-1">Slot ID: {slotId}</p>}
      </div>
    );
  }
  
  // 프로덕션 환경에서는 실제 AdSense 코드 삽입
  // 예시 구조 (실제 AdSense 코드로 교체 필요)
  return (
    <div className={className} style={style}>
      {/* 실제 AdSense 코드는 여기에 삽입 */}
      {/* 
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format="auto"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
    </div>
  );
}

