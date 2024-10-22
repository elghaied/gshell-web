import type { CollectionAfterChangeHook } from 'payload'
import {  revalidateTag } from 'next/cache'
import type { Skill } from '../../../payload-types'


export const revalidateSkill: CollectionAfterChangeHook<Skill> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const tag = `skills`
    payload.logger.info(`Revalidating tag: ${tag}`)
    revalidateTag(tag)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldTag = `skills`
    payload.logger.info(`Revalidating old tag: ${oldTag}`)
    revalidateTag(oldTag)
  }

  return doc
}
