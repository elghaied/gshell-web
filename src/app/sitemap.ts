import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gshell.fr',
      lastModified: new Date(),
      alternates: {
        languages: {
          ar: 'https://gshell.fr/ar',
          fr: 'https://gshell.fr/fr',
        },
      },
    },

  ]
}
