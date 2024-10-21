import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Front, Project, Service } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    routing.locales.forEach(locale => {
      const path =   `/${locale}`


      payload.logger.info(`Revalidating service at path: ${path}`)
      revalidatePath(path)
    })
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    routing.locales.forEach(locale => {
      const oldPath =  `/${locale}`


      payload.logger.info(`Revalidating old Testimonial at path: ${oldPath}`)
      revalidatePath(oldPath)
    })
  }

  return doc
}
