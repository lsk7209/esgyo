# 환경 변수 관리 가이드

## 환경 변수 구조

### 공개 환경 변수 (클라이언트 접근 가능)
`NEXT_PUBLIC_` 접두사가 붙은 변수만 클라이언트에서 접근 가능합니다.

```env
NEXT_PUBLIC_SITE_URL=https://esgyo.kr
```

### 타입 안전 환경 변수 (`lib/env.ts`)

```typescript
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;
```

## 사용 방법

### 권장 방법
```typescript
import { env } from '@/lib/env';

const siteUrl = env.NEXT_PUBLIC_SITE_URL;
```

### 직접 접근 (비권장)
```typescript
// 타입 안전하지 않음
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

## 환경 변수 검증

`validateEnv()` 함수로 필수 환경 변수 확인:

```typescript
import { validateEnv } from '@/lib/env';

// 앱 시작 시 검증
if (!validateEnv()) {
  console.warn('일부 환경 변수가 설정되지 않았습니다.');
}
```

## 환경별 설정

### 개발 환경 (`.env.local`)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 프로덕션 환경
```env
NEXT_PUBLIC_SITE_URL=https://esgyo.kr
NODE_ENV=production
```

## 보안 주의사항

1. **절대 클라이언트에 노출하지 말 것**
   - API 키, 비밀번호, 토큰 등
   - `NEXT_PUBLIC_` 접두사 사용 금지

2. **환경 변수 검증**
   - 프로덕션 배포 전 필수 변수 확인
   - 기본값 사용 시 경고 로그

3. **Git에 커밋하지 말 것**
   - `.env.local`은 `.gitignore`에 포함
   - `.env.example`로 템플릿 제공

