/**
 * 사이트 헤더 (네비게이션)
 * AdSense 검수: 명확한 사이트 구조 제공
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link href="/" className="flex items-center space-x-2 min-w-[80px]">
              <span className="text-xl sm:text-2xl font-bold text-green-600">ESGyo</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link 
                href="/calculator" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                계산기
              </Link>
              <Link 
                href="/guide" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                신청 가이드
              </Link>
              <Link 
                href="/tips" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                절약 팁
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                블로그
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/calculator" className="hidden md:block">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white min-h-[36px] px-4">
                계산하기
              </Button>
            </Link>
            
            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-2 text-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-3 space-y-2">
            <Link 
              href="/calculator" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              계산기
            </Link>
            <Link 
              href="/guide" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              신청 가이드
            </Link>
            <Link 
              href="/tips" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              절약 팁
            </Link>
            <Link 
              href="/blog" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              블로그
            </Link>
            <div className="px-4 pt-2">
              <Link 
                href="/calculator" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white min-h-[44px]">
                  계산하기
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

