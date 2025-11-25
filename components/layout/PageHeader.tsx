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
    <div className={`text-center space-y-2 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

