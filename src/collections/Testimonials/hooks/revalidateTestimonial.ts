import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Front, Service, Testimonial } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateTestimonial: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    routing.locales.forEach(locale => {
      const path = doc.slug === 'home'
        ? `/${locale}`
        : `/${locale}/${doc.slug}`

      payload.logger.info(`Revalidating Testimonial at path: ${path}`)
      revalidatePath(path)
    })
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    routing.locales.forEach(locale => {
      const oldPath = previousDoc.slug === 'home'
        ? `/${locale}`
        : `/${locale}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old Testimonial at path: ${oldPath}`)
      revalidatePath(oldPath)
    })
  }

  return doc
}
