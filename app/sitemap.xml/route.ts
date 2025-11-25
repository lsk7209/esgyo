/**
 * Main Sitemap
 */

import { NextResponse } from 'next/server';

import { env } from '@/lib/env';

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-personal.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-business.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

