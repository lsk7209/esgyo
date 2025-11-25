/**
 * 키보드 네비게이션 훅
 * 접근성 향상을 위한 키보드 이벤트 처리
 */

import { useCallback } from 'react';

export interface KeyboardHandler {
  onEnter?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

/**
 * 키보드 이벤트 핸들러 생성
 */
export function useKeyboardNavigation(handlers: KeyboardHandler) {
  return useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (handlers.onEnter) {
          e.preventDefault();
          handlers.onEnter();
        }
        break;
      case 'Escape':
        if (handlers.onEscape) {
          e.preventDefault();
          handlers.onEscape();
        }
        break;
      case ' ':
        if (handlers.onSpace) {
          e.preventDefault();
          handlers.onSpace();
        }
        break;
      case 'ArrowUp':
        if (handlers.onArrowUp) {
          e.preventDefault();
          handlers.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (handlers.onArrowDown) {
          e.preventDefault();
          handlers.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (handlers.onArrowLeft) {
          e.preventDefault();
          handlers.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (handlers.onArrowRight) {
          e.preventDefault();
          handlers.onArrowRight();
        }
        break;
    }
  }, [handlers]);
}

