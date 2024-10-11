import { getLocale } from 'next-intl/server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Front } from '@/payload-types'
import { TestimonialsClient } from './Component.client'


export async function TestimonialsSection({ testimonialsSection }: { testimonialsSection: Front['testimonialsSection'] }) {
  const locale = await getLocale()
  const payload = await getPayloadHMR({ config: configPromise })

  const testimonials = await payload.find({
    collection: 'testimonials',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return <TestimonialsClient testimonialsSection={testimonialsSection} testimonialsItems={testimonials.docs} locale={locale as 'ar' | 'en' | 'fr' | 'all'} />
}
