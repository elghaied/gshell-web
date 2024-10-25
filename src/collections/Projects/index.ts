import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'

const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        fr: 'Titre',
        ar: 'العنوان',
      },
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: {
        en: 'Description',
        fr: 'Description',
        ar: 'الوصف',
      },
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,

      label: {
        en: 'Image',
        fr: 'Image',
        ar: 'الصورة',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: {
        en: 'URL',
        fr: 'Lien',
        ar: 'الرابط',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Category',
        fr: 'Categorie',
        ar: 'الفئة',
      },
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      label: {
        en: 'Technologies',
        fr: 'Technologies',
        ar: 'التقنيات',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [ revalidateAfterDelete ],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },

}

export default Projects
