import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

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
    }
  ],
}

export default Services
