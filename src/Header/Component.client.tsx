'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Ensure this only runs on the client
    setIsMounted(true)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Set isVisible to true when the component mounts
  useEffect(() => {
    if (isMounted) {
      setIsVisible(true)
    }
  }, [isMounted])

  useEffect(() => {
    // Check for mobile devices
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isMounted) {
    return null
  }

  if (isMobile) {
    return <MobileHeader header={header} />
  }

  return (
    <header
      className={`container relative z-20 py-4 lg:py-6 flex items-center justify-between transition-transform duration-500 ease-out ${
        isVisible && !prefersReducedMotion ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
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
