import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'


import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'




export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized:true
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    imageSizes: [
      // Projects images - aspect ratio 1.23:1 (401x327)
      {
        width: 401,
        height: 327,
        crop: 'center',
        name: 'projectOriginal',
      },
      {
        width: 300,
        height: Math.round(300 * (327 / 401)), // Keeping the ratio of 1.23:1 for smaller sizes
        crop: 'center',
        name: 'projectSmall',
      },
      {
        width: 200,
        height: Math.round(200 * (327 / 401)),
        crop: 'center',
        name: 'projectThumbnail',
      },
      {
        width: 150,
        height: Math.round(150 * (327 / 401)),
        crop: 'center',
        name: 'projectMobile',
      },

      // Social Media SEO - typical OpenGraph aspect ratio of 1.91:1
      {
        width: 1200,
        height: 627,
        crop: 'center',
        name: 'socialCardLarge',
      },
      {
        width: 600,
        height: 314,
        crop: 'center',
        name: 'socialCardMedium',
      },
      {
        width: 300,
        height: 157,
        crop: 'center',
        name: 'socialCardSmall',
      },
    ],
    resizeOptions: {
      width: 200,
      height: 200,
      position: 'center',
    },
  },
}
