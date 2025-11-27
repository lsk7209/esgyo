/**
 * 블로그 포스트별 고유 아이콘 매핑
 * 각 포스트의 주제에 맞는 다양한 아이콘 제공
 */

import type { BlogPost } from '@/types/content';

// 포스트 slug 기반 아이콘 매핑
const iconMap: Record<string, string> = {
  // 탄소중립포인트 관련
  '탄소중립포인트-신청-방법-완벽-가이드': '📝',
  '탄소중립포인트-연간-7만원-받는-실전-가이드': '💰',
  '탄소중립포인트-현금화-방법-완벽-가이드': '💵',
  '스타벅스-텀블러-할인-탄소중립포인트-중복': '☕',
  '대중교통-이용-환경-포인트': '🚇',
  
  // 절약 관련
  '전기요금-폭탄-피하는-10가지-방법': '⚡',
  '가스요금-절약-연간-20만원-아끼는-실전-방법': '🔥',
  '수도요금-절약-연간-10만원-아끼는-방법': '💧',
};

// 카테고리별 기본 아이콘 세트 (같은 카테고리 내에서도 다양성 제공)
const categoryIconSets: Record<string, string[]> = {
  'carbon-point': ['🌱', '🌿', '🍃', '🌳', '🌲', '🌴', '🌵', '🌾'],
  'saving': ['💰', '💵', '💴', '💶', '💷', '💸', '💳', '💎'],
  'environment': ['🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔'],
  'lifestyle': ['✨', '🌟', '💫', '⭐', '🌠', '🎯', '🎨', '🎭'],
  'news': ['📰', '📺', '📻', '📱', '💻', '📡', '📊', '📈'],
  'review': ['⭐', '🌟', '💫', '✨', '🎖️', '🏆', '🎗️', '🎁'],
  'electricity': ['⚡', '🔌', '💡', '🔋', '⚙️', '🔧', '🛠️', '⚒️'],
  'gas': ['🔥', '💨', '🌪️', '☄️', '🌋', '🏔️', '⛰️', '🗻'],
  'water': ['💧', '🌊', '🌧️', '⛈️', '🌦️', '🌨️', '❄️', '☔'],
  'transport': ['🚇', '🚌', '🚗', '🚕', '🚙', '🚐', '🚎', '🚍'],
  'shopping': ['🛒', '🛍️', '🛎️', '🏪', '🏬', '🏭', '🏗️', '🏘️'],
  'food': ['🍽️', '🍴', '🥄', '🥢', '🍱', '🍲', '🍳', '🥘'],
  'waste': ['♻️', '🗑️', '🗂️', '📦', '📋', '📄', '📃', '📑'],
};

/**
 * 블로그 포스트에 맞는 아이콘 가져오기
 */
export function getBlogPostIcon(post: BlogPost): string {
  // 1. slug 기반 매핑 확인
  if (iconMap[post.slug]) {
    return iconMap[post.slug];
  }
  
  // 2. 제목 키워드 기반 매핑
  const title = post.title.toLowerCase();
  
  // 탄소중립포인트 관련
  if (title.includes('현금화') || title.includes('환급')) {
    return '💵';
  }
  if (title.includes('신청') || title.includes('가이드')) {
    return '📝';
  }
  if (title.includes('7만원') || title.includes('7만')) {
    return '💰';
  }
  if (title.includes('텀블러') || title.includes('스타벅스')) {
    return '☕';
  }
  if (title.includes('대중교통') || title.includes('교통')) {
    return '🚇';
  }
  
  // 절약 관련
  if (title.includes('전기') || title.includes('전력')) {
    return '⚡';
  }
  if (title.includes('가스') || title.includes('보일러')) {
    return '🔥';
  }
  if (title.includes('수도') || title.includes('물')) {
    return '💧';
  }
  if (title.includes('교통비') || title.includes('교통')) {
    return '🚇';
  }
  if (title.includes('식비') || title.includes('음식')) {
    return '🍽️';
  }
  if (title.includes('쇼핑') || title.includes('구매')) {
    return '🛒';
  }
  
  // 3. 카테고리 기반 랜덤 선택 (일관성 유지)
  const iconSet = categoryIconSets[post.category] || ['📄'];
  // slug를 기반으로 일관된 아이콘 선택 (같은 slug는 항상 같은 아이콘)
  const hash = post.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return iconSet[hash % iconSet.length];
}

/**
 * 블로그 포스트에 맞는 배경 그라데이션 가져오기
 */
export function getBlogPostGradient(post: BlogPost): string {
  const gradients: Record<string, string> = {
    'carbon-point': 'from-green-50 to-emerald-50',
    'saving': 'from-blue-50 to-cyan-50',
    'environment': 'from-emerald-50 to-teal-50',
    'lifestyle': 'from-purple-50 to-pink-50',
    'news': 'from-orange-50 to-amber-50',
    'review': 'from-yellow-50 to-amber-50',
  };
  
  return gradients[post.category] || 'from-gray-50 to-gray-100';
}

/**
 * 블로그 포스트에 맞는 호버 배경 그라데이션 가져오기
 */
export function getBlogPostHoverGradient(post: BlogPost): string {
  const gradients: Record<string, string> = {
    'carbon-point': 'from-green-100 to-emerald-100',
    'saving': 'from-blue-100 to-cyan-100',
    'environment': 'from-emerald-100 to-teal-100',
    'lifestyle': 'from-purple-100 to-pink-100',
    'news': 'from-orange-100 to-amber-100',
    'review': 'from-yellow-100 to-amber-100',
  };
  
  return gradients[post.category] || 'from-gray-100 to-gray-200';
}

