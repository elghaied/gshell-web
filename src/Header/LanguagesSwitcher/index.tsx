'use client'

import { useLocale } from "@/providers/LocaleProvider"



const languages = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'fr', label: 'FR', path: '/fr' },
  { code: 'ar', label: 'AR', path: '/ar' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  const handleLanguageChange = (languageCode: 'en' | 'fr' | 'ar') => {
    setLocale(languageCode)
  }

  return (
    <div className="flex space-x-[30px] p-4 rounded-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as 'en' | 'fr' | 'ar')}
          className={`
            w-[65px] h-[40px] rounded-[8px] font-bold text-lg
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
