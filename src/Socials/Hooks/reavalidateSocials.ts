
import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateSocials: GlobalAfterChangeHook = ({ doc, req: { payload,locale } }) => {
  payload.logger.info(`Revalidating socials with tag: global_socials_${locale}`)

  revalidateTag(`global_socials_${locale}`)

  return doc
}
