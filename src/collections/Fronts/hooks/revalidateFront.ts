import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Front } from '../../../payload-types'

export const revalidateFront: CollectionAfterChangeHook<Front> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

    payload.logger.info(`Revalidating front at path: ${path}`)

    revalidatePath(path)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old front at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
