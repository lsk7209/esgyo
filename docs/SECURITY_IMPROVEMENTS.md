# 보안 및 성능 개선 사항

## 보안 강화

### 1. 보안 헤더 추가 (`next.config.ts`)
- **X-Frame-Options**: DENY - 클릭재킹 방지
- **X-Content-Type-Options**: nosniff - MIME 타입 스니핑 방지
- **Referrer-Policy**: strict-origin-when-cross-origin - 리퍼러 정보 보호
- **Permissions-Policy**: 카메라, 마이크, 위치 정보 차단
- **X-XSS-Protection**: 1; mode=block - XSS 공격 방지
- **Content-Security-Policy**: 기본 CSP 설정

### 2. Middleware 보안 검증 (`middleware.ts`)
- POST 요청에 대한 Origin 검증
- 프로덕션 환경에서만 엄격한 검증 적용
- 추가 보안 헤더 설정

### 3. 입력 검증 강화
- 모든 사용자 입력에 대한 검증 적용
- 음수, NaN, 무한대 값 차단
- 안전한 숫자 변환 함수 사용

## 성능 최적화

### 1. useMemo 적용
다음 계산들이 메모이제이션되어 불필요한 재계산 방지:

#### B2C Personal Calculator
- `totalEmission`: 전기, 가스, 연료 값이 변경될 때만 재계산
- `points`: totalEmission이 변경될 때만 재계산

#### B2B Business Calculator
- `isCostMode`: inputMode 변경 시에만 재계산
- `elecUsage`, `gasUsage`, `fuelUsage`: 관련 값 변경 시에만 재계산
- `softwareAppData`: 한 번만 생성 (의존성 없음)

#### B2B Diagnosis
- `benchmark`: industry 변경 시에만 재계산
- `riskInfo`: riskLevel 변경 시에만 재계산
- `ratio`: benchmark 또는 totalEmission 변경 시에만 재계산
- `progressValue`: ratio 변경 시에만 재계산

#### JSONLD Component
- `jsonString`: type 또는 data 변경 시에만 재생성

#### Guide Page
- `faqData`: 한 번만 생성 (의존성 없음)

### 2. useCallback 적용
이벤트 핸들러 메모이제이션으로 불필요한 리렌더링 방지:

- `handleBackToCalculator`: router 변경 시에만 재생성
- `handleGenerateReport`: router 변경 시에만 재생성
- 모든 입력 핸들러: 의존성 배열 최적화

## 코드 품질 개선

### 1. 타입 안정성
- `JSONLD.tsx`: `Record<string, any>` → `Record<string, unknown>` 변경
- 모든 타입 명시적 정의

### 2. 불필요한 변수 제거
- `diagnosis/page.tsx`: 사용되지 않는 `sessionId` 변수 제거

### 3. 접근성 개선
- 버튼에 `aria-label` 추가
- 명확한 접근성 설명 제공

## 성능 개선 효과

### Before (최적화 전)
- 매 렌더링마다 모든 계산 재실행
- 이벤트 핸들러 매번 재생성
- JSONLD 데이터 매번 재생성

### After (최적화 후)
- 의존성 변경 시에만 계산 실행
- 안정적인 이벤트 핸들러 참조
- 메모이제이션된 데이터 재사용

### 예상 성능 향상
- **리렌더링 횟수**: 약 30-50% 감소
- **계산 시간**: 불필요한 재계산 제거로 약 20-40% 개선
- **메모리 사용**: 안정적인 참조로 가비지 컬렉션 부담 감소

## 보안 점수 개선

### 보안 헤더 적용 전
- XSS 보호: 기본 브라우저 보호만
- 클릭재킹: 취약
- MIME 스니핑: 취약

### 보안 헤더 적용 후
- XSS 보호: 다층 방어 (CSP + X-XSS-Protection)
- 클릭재킹: X-Frame-Options로 차단
- MIME 스니핑: X-Content-Type-Options로 차단
- 리퍼러 유출: Referrer-Policy로 제어

## 다음 단계 권장 사항

### 단기 (1주)
1. **CSP 정책 세밀화**
   - 실제 사용하는 외부 리소스만 허용
   - nonce 기반 스크립트 로딩

2. **CSRF 토큰 구현**
   - API 라우트에 CSRF 보호 추가
   - 폼 제출 시 토큰 검증

### 중기 (1개월)
1. **Rate Limiting**
   - API 요청 제한
   - DDoS 방어

2. **입력 검증 강화**
   - 서버 사이드 검증 추가
   - Zod 스키마 검증 도입

### 장기 (3개월+)
1. **보안 감사**
   - 정기적인 보안 스캔
   - 취약점 점검

2. **모니터링**
   - 보안 이벤트 로깅
   - 이상 행동 감지

