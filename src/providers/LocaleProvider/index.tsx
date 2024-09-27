'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Locale = 'en' | 'fr' | 'ar'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const pathParts = pathname.split('/')
    const langCode = pathParts[1] as Locale
    if (['en', 'fr', 'ar'].includes(langCode)) {
      setLocaleState(langCode)
    } else {
      setLocaleState('en')
    }
  }, [pathname])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)

    const newPath = newLocale === 'en'
      ? pathname.replace(/^\/[a-z]{2}/, '') || '/'
      : `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`

    router.push(newPath)

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
  }, [pathname, router])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
