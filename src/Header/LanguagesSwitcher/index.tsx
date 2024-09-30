'use client'

import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

const languages = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'fr', label: 'FR', path: '/fr' },
  { code: 'ar', label: 'AR', path: '/ar' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (languageCode: 'en' | 'fr' | 'ar') => {
    router.push(pathname, { locale: languageCode })
    document.cookie = `NEXT_LOCALE=${languageCode}; path=/; max-age=${60 * 60 * 24 * 365}`
  }

  return (
    <div className="flex space-x-1 md:space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as 'en' | 'fr' | 'ar')}
          className={`
            w-8 h-6 md:w-10 md:h-8 lg:w-12 lg:h-10 rounded text-xs md:text-sm lg:text-base font-bold
            ${locale === lang.code
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-black dark:text-white hover:text-venetian dark:hover:text-venetian'
            }
            transition-colors duration-200 ease-in-out
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
