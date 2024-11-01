import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { populateAuthors } from '@/hooks/populateAuthors'

const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
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
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Development', value: 'Code' },
        { label: 'UI/UX Design', value: 'Palette' },
        { label: 'Mobile App Development', value: 'Smartphone' },
        { label: 'E-commerce Solutions', value: 'ShoppingCart' },
        { label: 'Digital Marketing', value: 'Megaphone' },
        { label: 'SEO Optimization', value: 'Search' },
        { label: 'Content Creation', value: 'PenTool' },
        { label: 'Cloud Services', value: 'Cloud' },
        { label: 'Cybersecurity', value: 'Shield' },
        { label: 'Data Analytics', value: 'BarChart' },
        { label: 'Consulting', value: 'Users' },
        { label: 'Maintenance & Support', value: 'Wrench' },
      ],
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
      name: 'details',
      type : 'array',
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      label: {
        en: 'Details',
        fr: 'Details',
        ar: 'التفاصيل',
      },
      localized: true,


    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
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
      hasMany: true,
      label: {
        en: 'Technologies',
        fr: 'Technologies',
        ar: 'التكنولوجيا',
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
    afterDelete: [revalidateAfterDelete],
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

export default Services
