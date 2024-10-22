import type { CollectionAfterChangeHook } from 'payload'
import {  revalidateTag } from 'next/cache'
import type { Front } from '../../../payload-types'


export const revalidateFront: CollectionAfterChangeHook<Front> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const tag = `front`
    payload.logger.info(`Revalidating tag: ${tag}`)
    revalidateTag(tag)
  }

  // If the front was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const Oldtag = `front`
    payload.logger.info(`Revalidating tag: ${Oldtag}`)
    revalidateTag(Oldtag)
  }

  return doc
}
