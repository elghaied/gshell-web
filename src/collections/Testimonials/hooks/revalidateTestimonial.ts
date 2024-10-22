import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Testimonial } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateTestimonial: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const tag = `testimonials`
    payload.logger.info(`Revalidating tag: ${tag}`)
    revalidateTag(tag)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldTag = `testimonials`
    payload.logger.info(`Revalidating old tag: ${oldTag}`)
    revalidateTag(oldTag)
  }

  return doc
}