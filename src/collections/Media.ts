import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
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
      localized: true,
      validate: (value) => {
        if (value?.length > 125) return 'Alt text must be less than 125 characters'
        return true
      },
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
    {
      name: 'focalPoint',
      type: 'point',
      label: 'Focal Point',
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    formatOptions: {
      format: 'webp',  // Convert all uploads to WebP
      options: {
        quality: 85,
        effort: 4,
      },
    },
    imageSizes: [
      // Projects images - aspect ratio 1.23:1 (401x327)
      {
        name: 'projectOriginal',
        width: 401,
        height: 327,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 90 }
        },
      },
      {
        name: 'projectSmall',
        width: 300,
        height: Math.round(300 * (327 / 401)),
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 }
        },
      },
      {
        name: 'projectThumbnail',
        width: 200,
        height: Math.round(200 * (327 / 401)),
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 }
        },
      },
      {
        name: 'projectMobile',
        width: 150,
        height: Math.round(150 * (327 / 401)),
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 }
        },
      },
      // Social Media SEO
      {
        name: 'socialCardLarge',
        width: 1200,
        height: 627,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 }
        },
      },
      {
        name: 'projectBlur',
        width: 50,
        height: Math.round(50 * (327 / 401)),
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 30 }
        },
      },
    ],
    focalPoint: true,
    adminThumbnail: 'projectThumbnail',
    filesRequiredOnCreate: true,

  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (!data.alt) {
          data.alt = data.filename // Fallback alt text if none provided
        }
        return data
      }
    ]
  }
}
