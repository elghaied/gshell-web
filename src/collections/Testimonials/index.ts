import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'

import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { populateAuthors } from '@/hooks/populateAuthors'

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating'],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: {
        en: 'Author',
        fr: 'Auteur',
        ar: 'الكاتب',
      }
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',

      label: {
        en: 'Image',
        fr: 'Image',
        ar: 'الصورة',
      },

    },
    {
      name: 'occupation',
      type: 'text',
      required: true,
      label: {
        en: 'Occupation / Company',
        fr: 'Profession / Société',
        ar: 'الوظيفة / الشركة',
      },
      defaultValue: 'Client',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: {
        en: 'Content',
        fr: 'Contenu',
        ar: 'المحتوى',
      }
    },
    {
      name: 'rating',
      type: 'select',
      options: [
        {
          label: '5 Stars',
          value: '5',
        },
        {
          label: '4 Stars',
          value: '4',
        },
        {
          label: '3 Stars',
          value: '3',
        },
        {
          label: '2 Stars',
          value: '2',
        },
        {
          label: '1 Star',
          value: '1',
        },
      ],
      defaultValue: '5',
      required: true,
      label: {
        en: 'Rating',
        fr: 'Evaluation',
        ar: 'تقييم',
      }
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
    afterDelete: [revalidateAfterDelete],
    beforeChange: [populatePublishedAt],
    afterRead: [populateAuthors]
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
export default Testimonials
