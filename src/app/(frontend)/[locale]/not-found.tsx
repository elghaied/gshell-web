import React from 'react'
import { getLocale } from 'next-intl/server'
import GButton from '@/components/GButton'
import { Egg } from 'lucide-react'
import { Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionaries'

export default async function NotFound() {
  const currentLocale = await getLocale()
  const url = currentLocale === 'en' ? '/' : `/${currentLocale}`
  const dict = await getDictionary(currentLocale as Locale)

  return (
    <div className="container py-28" dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
      <div className=" flex flex-col items-center lg:items-start ">
        <h1
          className={`  text-4xl md:text-5xl lg:text-6xl leading-loose dark:text-[#F4F3F3] ${currentLocale === 'ar' ? 'font-black' : ''}`}
        >
          {dict.NotFound.title} <span className="text-venetian dark:text-[#FF0D0D]">404 </span>{' '}
          <Egg className=" inline-block animate-rock text-venetian dark:text-[#FF0D0D]  w-8 h-8" />
        </h1>
        <p className="mb-4 text-lg lg:text-2xl dark:text-[#F4F3F3]">{dict.NotFound.description}</p>
      </div>
      <GButton cta={dict.NotFound.backToHome} href={url} />
    </div>
  )
}
