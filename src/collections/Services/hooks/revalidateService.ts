import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const tag = `services`
    const categoryTag = 'categories'
    payload.logger.info(`Revalidating tag: ${tag}  and : ${categoryTag}`)
    revalidateTag(tag)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldTag = `services`
    const oldCategoryTag = 'categories'
    payload.logger.info(`Revalidating old tag: ${oldTag} and : ${oldCategoryTag}`)
    revalidateTag(oldTag)
    revalidateTag(oldCategoryTag)
  }

  return doc
}
