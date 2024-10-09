import type { Metadata } from 'next'
import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter, Poppins } from 'next/font/google'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../../messages/${locale === '/' ? 'en' : locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

// Load the fonts with custom weights, styles, etc.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter', // Optional: If you use CSS variables
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // Optional: If you use CSS variables
})
type LayoutProps = {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}

export default async function RootLayout({
  children,
  params
}: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale

  unstable_setRequestLocale(locale);

  const draftModeData = await draftMode()
  const messages = await getMessages(locale);

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body  className={`${inter.variable} ${poppins.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <LivePreviewListener />
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
