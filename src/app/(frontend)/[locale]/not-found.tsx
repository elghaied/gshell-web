import React from 'react'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import GButton from '@/components/GButton'
import { Egg } from 'lucide-react'



export default async function NotFound() {
  const currentLocale = await getLocale()
  setRequestLocale(currentLocale);
  const url = currentLocale === 'en' ? '/' : `/${currentLocale}`
  const t = await getTranslations('NotFound')

  return (
    <div className="container py-28" dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
      <div className=" flex flex-col items-center lg:items-start ">
        <h1
          className={`  text-4xl md:text-5xl lg:text-6xl leading-loose dark:text-[#F4F3F3] ${currentLocale === 'ar' ? 'font-black' : ''}`}
        >
          {t('title')} <span className="text-venetian dark:text-[#FF0D0D]">404 </span>{' '}
          <Egg className=" inline-block animate-rock text-venetian dark:text-[#FF0D0D]  w-8 h-8" />
        </h1>
        <p className="mb-4 text-lg lg:text-2xl dark:text-[#F4F3F3]">{t('description')}</p>
      </div>
      <GButton cta={t('backToHome')} href={url} />
    </div>
  )
}
