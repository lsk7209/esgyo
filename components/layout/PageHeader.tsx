/**
 * 페이지 헤더 공통 컴포넌트
 * 재사용 가능한 페이지 제목 및 설명
 */

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`text-center space-y-2 sm:space-y-3 ${className}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
          {description}
        </p>
      )}
    </div>
  );
}

