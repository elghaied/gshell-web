import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale: "en" | "fr" | "ar") {
  const payload = await getPayloadHMR({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}

// Export the getGlobal function directly, without caching
export { getGlobal }
