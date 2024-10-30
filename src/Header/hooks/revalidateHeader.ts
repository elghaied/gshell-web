import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload,locale } }) => {
  payload.logger.info(`Revalidating header with tag: global_header_${locale}`)

  revalidateTag(`global_header_${locale}`)

  return doc
}
