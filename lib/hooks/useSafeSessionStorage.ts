/**
 * 안전한 sessionStorage 훅
 * 에러 핸들링 포함
 */

import { useState, useEffect } from 'react';

export function useSafeSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // sessionStorage 접근 실패 시 (예: 사설 브라우징 모드)
      console.warn(`sessionStorage 접근 실패 (${key}):`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`sessionStorage 저장 실패 (${key}):`, error);
      // 저장 실패해도 상태는 업데이트
      setStoredValue(value);
    }
  };

  return [storedValue, setValue];
}

