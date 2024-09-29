'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import LanguageSwitcher from './LanguagesSwitcher'

interface HeaderClientProps {
  header: Header
  locale: "en" | "fr" | "ar"
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header , locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative z-20 py-8 flex justify-between"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Link href="/" className='flex items-center'>
        <Logo />
      </Link>
      <HeaderNav header={header} locale={locale} />
      <LanguageSwitcher />
    </header>
  )
}
