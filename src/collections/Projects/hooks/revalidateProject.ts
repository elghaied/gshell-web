import type { CollectionAfterChangeHook } from 'payload'
import {  revalidateTag } from 'next/cache'
import type {  Project } from '../../../payload-types'


export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const tag = `projects`
    const categoryTag = 'categories'
    payload.logger.info(`Revalidating tag: ${tag}  and : ${categoryTag}`)
    revalidateTag(tag)
    revalidateTag(categoryTag)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldTag = `projects`
    const oldCategoryTag = 'categories'
    payload.logger.info(`Revalidating old tag: ${oldTag} and : ${oldCategoryTag}`)
    revalidateTag(oldTag)
    revalidateTag(oldCategoryTag)
  }

  return doc
}
