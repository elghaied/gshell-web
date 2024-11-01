import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { FormBlock } from '../../blocks/Form/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { populateAuthors } from '@/hooks/populateAuthors'



export const Fronts: CollectionConfig = {
  slug: 'fronts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data,locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'fronts',
          locale: locale?.code,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data,locale) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'fronts',
        locale : locale?.locale,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'welcome',
      type: 'group',
      label: 'Welcome Section',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      type: 'group',
      label: 'About Us',
      name: 'aboutus',
      fields: [
        { name: 'sectionTitle', type: 'text', localized: true },
        { localized: true, name: 'aboutusTitle', type: 'text', label: 'Title' },
        { localized: true, name: 'aboutusDescription', type: 'text', label: 'Description' },
      ],
    },

    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'projectsSection',
              type: 'group',
              fields: [
                { localized: true, name: 'sectionTitle', type: 'text', required: true },
                { localized: true, name: 'title', type: 'text', required: true },
                { localized: true, name: 'description', type: 'text', required: true },
              ],
              label: {
                en: 'Projects',
                fr: 'Projets',
                ar: 'المشاريع',
              },
            },

            {
              name: 'servicesSection',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
              label: 'Services',
            },
            {
              name: 'testimonialsSection',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },

              ],
              label: 'Testimonials',
            },
            {
              name: 'contactus',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
            {
              name: 'skillsSection',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
              label: {
                en: 'Skills',
                fr: 'Compétences',
                ar: 'المهارات',
              }


            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [FormBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
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
