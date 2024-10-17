import type { Metadata } from 'next'
import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { draftMode } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { Inter, Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import SvgPattern from '@/components/BackgroundPattern'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}


// Load the fonts with custom weights, styles, etc.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter', // Optional: If you use CSS variables
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // Optional: If you use CSS variables
  display: 'swap',
})
const beiruti = localFont({
   src: [
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/beiruti-v2-arabic-900.woff2',
      weight: '900',
      style: 'normal',
    }
   ],
  variable: '--font-beiruti', // Optional: If you use CSS variables

  display: 'swap',
})
type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale

  unstable_setRequestLocale(locale)

  const draftModeData = await draftMode()
  const messages = await getMessages()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={` ${locale ==='ar' ? beiruti.className : inter.className} overflow-x-hidden relative`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <LivePreviewListener />
            <Header />
            <div id="content-wrapper" className="relative ">
              <SvgPattern />
              <div className="relative z-10">{children}</div>
            </div>
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
