import type { Metadata } from 'next'
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
import { getMessages, setRequestLocale, unstable_setRequestLocale } from 'next-intl/server'
import localFont from 'next/font/local'

import SvgPattern from '@/components/BackgroundPattern'
import { AdminBar } from '@/components/AdminBar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { cn } from '@/utilities/cn'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}


// Load the fonts with custom weights, styles, etc.
const inter = localFont({
  src:[
    {
      path: '../../../../public/fonts/inter-v18-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/inter-v18-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/inter-v18-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/inter-v18-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/inter-v18-latin-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/inter-v18-latin-900.woff2',
      weight: '900',
      style: 'normal',
    }

  ],


  variable: '--font-inter', // Optional: If you use CSS variables
  display: 'swap',
})

const poppins = localFont({

  src:[
    {
      path: '../../../../public/fonts/poppins-v21-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/poppins-v21-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/poppins-v21-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/poppins-v21-latin-700.woff2',
      weight: '700',
      style: 'normal',
    }
  ],

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }


  const { isEnabled } = await draftMode()
  const messages = await getMessages()
  setRequestLocale(locale);
  return (
    <html

      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(`${locale ==='ar' ? beiruti.className : inter.className } ${poppins.className}`)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://gshell.fr'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
