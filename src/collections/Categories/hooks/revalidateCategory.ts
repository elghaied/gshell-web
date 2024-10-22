import type { CollectionAfterChangeHook } from 'payload'
import {  revalidateTag } from 'next/cache'
import type { Category } from '../../../payload-types'


export const revalidateCategory: CollectionAfterChangeHook<Category> = ({
  doc,
  req: { payload },
}) => {

  const tag = 'categories'
  payload.logger.info(`Revalidating tag: ${tag}`)
  revalidateTag(tag)


  return doc
}
