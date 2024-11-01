import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

import { slugField } from '@/fields/slug'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { populateAuthors } from '@/hooks/populateAuthors'

const Skills: CollectionConfig = {
  slug: 'skills',
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
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label:{
        en: 'description',
        fr: 'description',
        ar: 'الوصف'
      }
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Design', value: 'Paintbrush' },
        { label: 'Development', value: 'Code' },
        { label: 'SEO', value: 'Search' },
        { label: 'Analytics', value: 'BarChart' },
        { label: 'Mobile', value: 'Smartphone' },
        { label: 'Web', value: 'Globe' },
        { label: 'Marketing', value: 'Megaphone' },
        { label: 'Photography', value: 'Camera' },
        { label: 'Illustration', value: 'PenTool' },
        { label: 'Performance', value: 'Zap' },
        { label: 'UX/UI', value: 'Coffee' },
        { label: 'Innovation', value: 'Lightbulb' },
        { label: 'Strategy', value: 'Rocket' },
        { label: 'Branding', value: 'Target' },
        { label: 'Support', value: 'Headphones' },
      ],
      defaultValue: 'Code',
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

export default Skills
