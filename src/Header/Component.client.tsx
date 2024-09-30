'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import LanguageSwitcher from './LanguagesSwitcher'
import { MobileHeader } from './MobileHeader'

interface HeaderClientProps {
  header: Header
  locale: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, locale }) => {
  const { headerTheme } = useHeaderTheme()
  const isRTL = locale === 'ar'
  const isMobile = useMediaQuery({ maxWidth: 768 })

  if (isMobile) {
    return <MobileHeader header={header} />
  }

  return (
    <header
      className="container relative z-20 py-4 lg:py-6 flex items-center justify-between"
      dir={isRTL ? 'rtl' : 'ltr'}
      data-theme={headerTheme || 'light'}
    >
      <Link href="/" className="flex items-center">
        <Logo className="w-24 md:w-32 lg:w-40" />
      </Link>
      <HeaderNav header={header} />
      <LanguageSwitcher />
    </header>
  )
}
