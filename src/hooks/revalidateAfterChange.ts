import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

export const revalidateAfterChange: CollectionAfterChangeHook = ({
  collection,
  previousDoc,
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    payload.logger.info(`Revalidating ${collection.slug} with tag: ${collection.slug}`)
    revalidateTag(collection.slug)
  }
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    payload.logger.info(`Revalidating unpublished ${collection.slug} with tag: ${collection.slug}`)
    revalidateTag(collection.slug)
  }
  return doc
}
