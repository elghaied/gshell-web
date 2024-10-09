import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Front as FrontType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import WelcomeSection from '@/components/WelcomeSection'
import AboutUsSection from '@/components/AboutUsSection'
import { ServicesSection } from '@/components/ServicesSection/Component'


export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function Page({
  params,
}: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale || 'en'
  const url = locale === 'en' ? '/' : `/${locale}`

  let front: FrontType | null = await queryFrontByLocale({ locale })

  if (!front) {
    return <PayloadRedirects url={url} />
  }

  const { layout, welcome, aboutus, projectsSection, servicesSection, contactus } = front

  return (
    <article className={`container pt-16 pb-24 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <PayloadRedirects disableNotFound url={url} />

      <WelcomeSection welcome={welcome} />

      <AboutUsSection aboutUs={aboutus} />

      {servicesSection && (
        <ServicesSection servicesSection={servicesSection} />
      )}

      <div id="projects">
        <h2>{projectsSection?.title || 'Portfolio'}</h2>
        <p>{projectsSection?.description || 'Our previous work and projects...'}</p>
      </div>

      <div id="contact">
        <h2>{contactus?.title || 'Contact Us'}</h2>
        <p>{contactus?.description || 'Get in touch...'}</p>
      </div>

      <RenderBlocks blocks={layout} />
    </article>
  )
}

type MetadataProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang || 'en'
  const front = await queryFrontByLocale({ locale: lang })
  return generateMeta({ doc: front })
}

const queryFrontByLocale = cache(async ({ locale }: { locale: string }) => {
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
})
