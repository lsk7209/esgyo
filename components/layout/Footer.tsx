/**
 * 사이트 푸터
 * AdSense 검수: 저작권, 연락처, 법적 정보 제공
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gradient-to-b from-gray-50 to-white mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-900">ESGyo 소개</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
              탄소중립포인트 계산 및 신청 가이드를 제공하는 서비스입니다. 
              일상 속 작은 실천으로 받을 수 있는 포인트를 쉽게 계산하고 신청할 수 있도록 도와드립니다.
            </p>
            <Link href="/about" className="text-sm sm:text-base text-green-600 hover:text-green-700 hover:underline font-semibold transition-colors inline-flex items-center gap-1">
              더 알아보기 <span>→</span>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-900">빠른 링크</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link href="/calculator" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  포인트 계산기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  신청 가이드
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  절약 팁
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  블로그
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-900">법적 정보</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link href="/privacy" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm sm:text-base text-gray-600 hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-gray-900">문의하기</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-green-600 font-medium transition-colors inline-flex items-center gap-1">
                  연락처
                </Link>
              </li>
              <li className="leading-relaxed">
                이메일: <a href="mailto:support@esgyo.com" className="text-green-600 hover:text-green-700 hover:underline">support@esgyo.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gray-200 text-center space-y-2">
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            © {currentYear} ESGyo. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto px-4">
            본 서비스는 참고용이며, 실제 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

