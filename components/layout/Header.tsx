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
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">ESGyo</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/calculator" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                계산기
              </Link>
              <Link 
                href="/guide" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                신청 가이드
              </Link>
              <Link 
                href="/tips" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                절약 팁
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                블로그
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/calculator" className="hidden md:block">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                계산하기
              </Button>
            </Link>
            
            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-3">
            <Link 
              href="/calculator" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              계산기
            </Link>
            <Link 
              href="/guide" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              신청 가이드
            </Link>
            <Link 
              href="/tips" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              절약 팁
            </Link>
            <Link 
              href="/blog" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              블로그
            </Link>
            <Link 
              href="/calculator" 
              className="block px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                계산하기
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

