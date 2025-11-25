/**
 * Funnel Logging System
 * 12개월 보존 후 자동 삭제 또는 통계만 남기기
 */

export type FunnelStep = 
  | 'calculator_view'
  | 'diagnosis_view'
  | 'pdf_download'
  | 'cta_click';

export interface FunnelLog {
  sessionId: string;
  timestamp: string;
  step: FunnelStep;
  metadata?: {
    industry?: string;
    riskLevel?: number;
    totalEmission?: number;
  };
}

/**
 * 로그 저장소 (실제 환경에서는 DB 또는 Cloudflare D1 사용)
 * 현재는 메모리 기반으로 구현 (개발용)
 */
class LogStore {
  private logs: FunnelLog[] = [];
  
  add(log: FunnelLog) {
    this.logs.push(log);
    
    // 12개월 이전 로그 자동 삭제
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    this.logs = this.logs.filter(
      log => new Date(log.timestamp) > twelveMonthsAgo
    );
  }
  
  getAll(): FunnelLog[] {
    return this.logs;
  }
  
  getByStep(step: FunnelStep): FunnelLog[] {
    return this.logs.filter(log => log.step === step);
  }
  
  getBySession(sessionId: string): FunnelLog[] {
    return this.logs.filter(log => log.sessionId === sessionId);
  }
  
  // KPI 계산용
  getTotalSessions(): number {
    const uniqueSessions = new Set(this.logs.map(log => log.sessionId));
    return uniqueSessions.size;
  }
  
  getDiagnosisRate(): number {
    const calculatorViews = this.getByStep('calculator_view').length;
    const diagnosisViews = this.getByStep('diagnosis_view').length;
    
    if (calculatorViews === 0) return 0;
    return (diagnosisViews / calculatorViews) * 100;
  }
  
  getPdfDownloadRate(): number {
    const diagnosisViews = this.getByStep('diagnosis_view').length;
    const pdfDownloads = this.getByStep('pdf_download').length;
    
    if (diagnosisViews === 0) return 0;
    return (pdfDownloads / diagnosisViews) * 100;
  }
  
  getConversionRate(): number {
    const pdfDownloads = this.getByStep('pdf_download').length;
    const ctaClicks = this.getByStep('cta_click').length;
    
    if (pdfDownloads === 0) return 0;
    return (ctaClicks / pdfDownloads) * 100;
  }
}

const logStore = new LogStore();

/**
 * Funnel 로그 기록
 */
export function logFunnel(step: FunnelStep, metadata?: FunnelLog['metadata']) {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') return;
  
  try {
    let sessionId: string;
    
    try {
      sessionId = sessionStorage.getItem('esg_session_id') || '';
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('esg_session_id', sessionId);
      }
    } catch (storageError) {
      // sessionStorage 접근 실패 시 (예: 사설 브라우징 모드)
      // 임시 세션 ID 생성 (페이지 새로고침 시 초기화됨)
      sessionId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    const log: FunnelLog = {
      sessionId,
      timestamp: new Date().toISOString(),
      step,
      metadata
    };
    
    // 실제 환경에서는 API로 전송
    // 현재는 메모리 저장소에 저장
    logStore.add(log);
    
    // 개발 환경에서만 콘솔 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('[Funnel Log]', log);
    }
  } catch (error) {
    // 로깅 실패해도 앱은 계속 동작
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Funnel Log Error]', error);
    }
  }
}

/**
 * KPI 데이터 조회 (Admin용)
 */
export function getKPIData() {
  return {
    totalSessions: logStore.getTotalSessions(),
    diagnosisRate: logStore.getDiagnosisRate(),
    pdfDownloadRate: logStore.getPdfDownloadRate(),
    conversionRate: logStore.getConversionRate()
  };
}

