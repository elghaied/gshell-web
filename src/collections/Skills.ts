import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

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
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
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

  ],
}

export default Skills
