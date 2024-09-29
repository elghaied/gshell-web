'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import LanguageSwitcher from './LanguagesSwitcher'

interface HeaderClientProps {
  header: Header
  locale: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, locale }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isRTL = locale === 'ar'

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  return (
    <header
      className="container relative z-20 py-8 flex justify-between"
      dir={isRTL ? 'rtl' : 'ltr'}
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <Link href="/" className='flex items-center'>
        <Logo />
      </Link>
      <HeaderNav header={header} />
      <LanguageSwitcher />
    </header>
  )
}
