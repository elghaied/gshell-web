import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Category, Front } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateFront: CollectionAfterChangeHook<Category> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {

    routing.locales.forEach(locale => {
      const path = locale === 'en' ? '/' : `/${locale}`


      payload.logger.info(`Revalidating front at path: ${path}`)
      revalidatePath(path)
    })


  return doc
}
