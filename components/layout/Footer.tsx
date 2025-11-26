/**
 * 사이트 푸터
 * AdSense 검수: 저작권, 연락처, 법적 정보 제공
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">ESGyo 소개</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              탄소중립포인트 계산 및 신청 가이드를 제공하는 서비스입니다. 
              일상 속 작은 실천으로 받을 수 있는 포인트를 쉽게 계산하고 신청할 수 있도록 도와드립니다.
            </p>
            <Link href="/about" className="text-xs sm:text-sm text-green-600 hover:underline font-medium">
              더 알아보기 →
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/calculator" className="text-gray-600 hover:text-green-600 block py-1">
                  포인트 계산기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-green-600 block py-1">
                  신청 가이드
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-gray-600 hover:text-green-600 block py-1">
                  절약 팁
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-green-600 block py-1">
                  블로그
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">법적 정보</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-600 block py-1">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-600 block py-1">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">문의하기</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-green-600 block py-1">
                  연락처
                </Link>
              </li>
              <li className="break-words">이메일: support@esgyo.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-gray-500 px-2">
          <p className="leading-relaxed">
            © {currentYear} ESGyo. All rights reserved.
          </p>
          <p className="mt-2 leading-relaxed">
            본 서비스는 참고용이며, 실제 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

