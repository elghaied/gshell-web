import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { populateAuthors } from '@/hooks/populateAuthors'

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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [ revalidateAfterDelete ],
    beforeChange: [populatePublishedAt],
    afterRead: [populateAuthors],
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
