'use client'

import { Category, Front, Service } from '@/payload-types'
import React, { useState, useMemo } from 'react'
import SectionTitle from '../SectionTitle'
import { ServicesCard } from './ServicesCard'
import { Badge } from '../ui/badge'

type ServicesSectionProps = {
  servicesSection: Front['servicesSection']
  servicesItems: Service[]
  locale: 'en' | 'fr' | 'ar' | 'all'
  categories: Category[]
}

export const ServicesClient: React.FC<ServicesSectionProps> = ({
  servicesSection,
  servicesItems,
  locale,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredServices = useMemo(() => {
    if (!selectedCategory) return servicesItems
    return servicesItems.filter(service => {
      if (typeof service.category === 'string') {
        return service.category === selectedCategory
      } else {
        return service.category.id === selectedCategory
      }
    })
  }, [servicesItems, selectedCategory])

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId)
  }

  return (
    <section className="my-8 bg-white dark:bg-black " id="services" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-8">
        <SectionTitle title={servicesSection?.sectionTitle || 'Our Services'} />
        <h2 className="text-2xl font-bold">{servicesSection?.title || 'Explore Our Offerings'}</h2>
        {servicesSection?.description && (
          <p className="mt-2 text-lg text-gray-600">{servicesSection.description}</p>
        )}
      </div>
      <div className="flex justify-center ~gap-2/4 flex-wrap ~mb-4/6">
        <Badge
          key="all"
          className={`~text-sm/base border-argent ~py-1/2 ~px-3/5 rounded-[12px] hover:bg-venetian text-black hover:text-white cursor-pointer ${
            selectedCategory === null ? 'bg-venetian text-white' : 'bg-white'
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </Badge>
        {categories && categories?.map((category) => (
          <Badge
            key={category.id}
            className={`~text-sm/base border-argent ~py-1/2 ~px-3/5 rounded-[12px] hover:bg-venetian text-black hover:text-white cursor-pointer ${
              selectedCategory === category.id ? 'bg-venetian text-white' : 'bg-white'
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.title}
          </Badge>
        ))}
      </div>
      <div className="flex justify-center ~gap-2/4 flex-wrap ">
        {filteredServices.map((service) => (
          <ServicesCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
