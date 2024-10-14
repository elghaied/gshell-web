import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales as importedLocales } from './i18n/locales';

const locales: string[] = Array.isArray(importedLocales) ? importedLocales : Object.keys(importedLocales);
const defaultLocale = 'en';


async function getLocale(request: NextRequest): Promise<string> {
  const negotiatorHeaders: Record<string, string> = {};
  const headerPromise = await request.headers
  headerPromise.forEach((value, key) => (negotiatorHeaders[key] = value));


  const languages = new Negotiator({ headerPromise: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const response = NextResponse.next();
  const pathnameLocale = pathname.split('/')[1];
  const headerPromise = await response.headers
  headerPromise.set('X-NEXT-INTL-LOCALE', pathnameLocale);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|admin|next|preview|.*\\..*).*)'
  ]
};
