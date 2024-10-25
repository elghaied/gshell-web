import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  fronts:''
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  locale: string
  slug: string
}

export const generatePreviewPath = ({ collection, locale, slug }: Props) => {
  // Remove the locale from the path since we'll use it in the URL structure
  const prefix = collectionPrefixMap[collection] || ''

  const params = {
    collection,
    // Construct the final path where we want to redirect to
    path: `/${locale}`,
    locale,
    slug
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value) encodedParams.append(key, value)
  })

  // Use next/preview without locale prefix since middleware will handle it
  return `/next/preview?${encodedParams.toString()}`
}
