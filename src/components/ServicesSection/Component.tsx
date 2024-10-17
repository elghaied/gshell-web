import { getLocale } from 'next-intl/server'
import { ServicesClient } from './Component.client'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Front } from '@/payload-types'
import { cache } from 'react'
import { draftMode } from 'next/headers'
export async function ServicesSection({ servicesSection }: { servicesSection: Front['servicesSection'] }) {
  const locale = await getLocale()
  const payload = await getPayloadHMR({ config: configPromise })

  const services =  await queryServiceByLocale({ locale: locale as 'ar' | 'en' | 'fr' | 'all' })


  const categories = await queryServiceByLocale({ locale: locale as 'ar' | 'en' | 'fr' | 'all' }) || await payload.find({
    collection: 'categories',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })
  return <ServicesClient servicesSection={servicesSection} servicesItems={services} locale={locale as 'ar' | 'en' | 'fr' | 'all'} categories={categories} />
}

const queryServiceByLocale = cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
})
