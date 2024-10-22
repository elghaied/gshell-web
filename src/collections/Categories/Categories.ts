import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateTag } from 'next/cache'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        fr: 'Titre',
        ar: 'العنوان',
      },
    },
  ],
  hooks: {
    afterChange: [() => revalidateTag('categories')],
    afterDelete: [ () => revalidateTag('categories') ],
  }
}

export default Categories
