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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
        <div className="flex h-14 sm:h-15 md:h-16 items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <Link href="/" className="flex items-center space-x-2 min-w-[80px] sm:min-w-[100px] group">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-200">
                ESGyo
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
              <Link 
                href="/calculator" 
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-green-600 transition-colors py-2 px-1 rounded-md hover:bg-green-50"
              >
                계산기
              </Link>
              <Link 
                href="/guide" 
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-green-600 transition-colors py-2 px-1 rounded-md hover:bg-green-50"
              >
                신청 가이드
              </Link>
              <Link 
                href="/tips" 
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-green-600 transition-colors py-2 px-1 rounded-md hover:bg-green-50"
              >
                절약 팁
              </Link>
              <Link 
                href="/blog" 
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-green-600 transition-colors py-2 px-1 rounded-md hover:bg-green-50"
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
          <nav 
            className="md:hidden border-t py-3 space-y-1 animate-in slide-in-from-top-2 duration-200"
            role="navigation"
            aria-label="모바일 메뉴"
          >
            <Link 
              href="/calculator" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-green-50 hover:text-green-600 rounded-lg min-h-[44px] flex items-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              계산기
            </Link>
            <Link 
              href="/guide" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-green-50 hover:text-green-600 rounded-lg min-h-[44px] flex items-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              신청 가이드
            </Link>
            <Link 
              href="/tips" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-green-50 hover:text-green-600 rounded-lg min-h-[44px] flex items-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              절약 팁
            </Link>
            <Link 
              href="/blog" 
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-green-50 hover:text-green-600 rounded-lg min-h-[44px] flex items-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              블로그
            </Link>
            <div className="px-4 pt-3 pb-2">
              <Link 
                href="/calculator" 
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white min-h-[48px] text-base font-semibold shadow-md">
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

