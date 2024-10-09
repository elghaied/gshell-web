import { getLocale } from 'next-intl/server'
import { ServicesClient } from './Component.client'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Front } from '@/payload-types'
export async function ServicesSection({ servicesSection }: { servicesSection: Front['servicesSection'] }) {
  const locale = await getLocale()
  const payload = await getPayloadHMR({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })
  const categories = await payload.find({
    collection: 'categories',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })
  return <ServicesClient servicesSection={servicesSection} servicesItems={services.docs} locale={locale as 'ar' | 'en' | 'fr' | 'all'} categories={categories.docs} />
}
