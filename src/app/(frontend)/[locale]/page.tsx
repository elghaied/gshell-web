import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Category, Front as FrontType, Project, Service, Skill, Testimonial } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import WelcomeSection from '@/components/WelcomeSection'
import AboutUsSection from '@/components/AboutUsSection'

import SectionTitle from '@/components/SectionTitle'
import { FormBlock } from '@/blocks/Form/Component'
import { Form } from '@payloadcms/plugin-form-builder/types'
import StyledTextParser from '@/components/ui/StyledTextParser'
import { routing } from '@/i18n/routing'
import { ServicesSection } from '@/components/ServicesSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));

}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const resolvedParams = await paramsPromise

  const locale = resolvedParams.locale || 'en'
  const url = locale === 'en' ? '/' : `/${locale}`

  let front: FrontType | null = await queryFrontByLocale({ locale })
  let services : Service[] | null = await queryServicesByLocale({ locale })
  let projects : Project[] | null = await queryProjectsByLocale({ locale })
  let testimonials : Testimonial[] | null = await queryTestimonialsByLocale({ locale })
  let skills : Skill[] | null = await querySkillsByLocale({ locale })
  let categories : Category[] | null = await queryCategoriesByLocale({ locale })


  if (!front) {
    return <PayloadRedirects disableNotFound url={url} />
  }

  const {
    layout,
    welcome,
    aboutus,
    projectsSection,
    servicesSection,
    contactus,
    testimonialsSection,
    skillsSection,
  } = front

  return (
    <article className={`container pt-16 pb-24  ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <PayloadRedirects disableNotFound url={url} />

      <WelcomeSection welcome={welcome} locale={locale} />

      <AboutUsSection aboutUs={aboutus} locale={locale} />

      {servicesSection && <ServicesSection servicesSection={servicesSection} servicesItems={services} locale={locale as 'ar' | 'en' | 'fr' | 'all'} categories={categories} />}

      {projectsSection && <ProjectsSection  projectSection={projectsSection} projectItems={projects} locale={locale as 'ar' | 'en' | 'fr' | 'all'} />}

      {testimonialsSection && <TestimonialsSection testimonialsSection={testimonialsSection} testimonialsItems={testimonials} locale={locale as 'ar' | 'en' | 'fr' | 'all'} />}

      {skillsSection && <SkillsSection  skillsSection={skillsSection} skillsItems={skills} locale={locale as 'ar' | 'en' | 'fr' | 'all'}/>}
      <section id="contactus" className="flex flex-col items-start md:items-center mb-12">
        <SectionTitle title={contactus?.sectionTitle || 'Contact Us'} />
        <StyledTextParser text={contactus.title} className={`~mb-4/6 ${locale === 'ar' ? 'font-black' : ''}`} />
        <p className=" ~text-sm/base font-normal text-[#323433] dark:text-[#F8FEFB] w-full md:w-1/3 md:text-center">
          {contactus?.description || 'Get in touch...'}
        </p>
      </section>

      {/* <RenderBlocks blocks={layout} /> */}
      {typeof layout[0].form != 'string' && (
        <FormBlock form={layout[0].form as Form} enableIntro={false} locale={locale} />
      )}
    </article>
  )
}

type MetadataProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang || 'en'
  const front = await queryFrontByLocale({ locale: lang })
  return generateMeta({ doc: front })
}

const queryFrontByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'fronts',
    draft: draftModeData.isEnabled,
    limit: 1,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs?.[0] || null
},
['front'],
{
  tags: ['front'],
  revalidate,
})


const queryServicesByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
},
['services'],
{
  tags: ['services'],
  revalidate,
})


const queryProjectsByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
},
['projects'],
{
  tags: ['projects'],
  revalidate,
})


const queryTestimonialsByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'testimonials',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
},
['testimonials'],
{
  tags: ['testimonials'],
  revalidate,
})

const querySkillsByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'skills',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
},
['skills'],
{
  tags: ['skills'],
  revalidate,
})


const queryCategoriesByLocale = unstable_cache(async ({ locale }: { locale: string }) => {
  const draftModeData = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft: draftModeData.isEnabled,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs || null
},
['categories'],
{
  tags: ['categories'],
  revalidate,
})
