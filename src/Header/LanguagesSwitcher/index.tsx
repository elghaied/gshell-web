'use client'

import {  Link, routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'



export default function LanguageSwitcher() {
  const locale = useLocale()


  return (
    <div className="flex space-x-1 md:space-x-2">
      {routing.locales.map((lang) => (
        <Link
          key={lang}
          href="/"
          locale={lang}
          className={`
           ~px-3/5 ~py-[.4rem]/[.6rem] rounded ~text-base/lg uppercase font-bold !font-inter flex items-center justify-center
            ${locale === lang
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-black dark:text-white hover:text-venetian dark:hover:text-venetian'
            }
            transition-colors duration-200 ease-in-out
          `}
        >
          {lang}
        </Link>
      ))}
    </div>
  )
}
