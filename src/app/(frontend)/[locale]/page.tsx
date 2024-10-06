import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Front as FrontType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import SectionTitle from '@/components/SectionTitle'
import RichText from '@/components/RichText'
import { MiniLogo } from '@/components/Logo/Logo'
import GButton from '@/components/GButton'
import WelcomeSection from '@/components/WelcomeSection'
import AboutUsSection from '@/components/AboutUsSection'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }]
}

export default async function Page({
  params: { locale: locale = 'en' },
}: {
  params: { locale: string }
}) {
  const url = locale === 'en' ? '/' : `/${locale}`

  let front: FrontType | null = await queryFrontByLocale({ locale: locale })

  if (!front) {
    return <PayloadRedirects url={url} />
  }

  const { layout, welcome, aboutus, projectsSection, servicesSection, contactus } = front

  return (
    <article className={`container pt-16 pb-24 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <PayloadRedirects disableNotFound url={url} />

      <WelcomeSection welcome={welcome} />

      <AboutUsSection aboutUs={aboutus} />

      <div id="projects">
        <h2>{projectsSection?.title || 'Portfolio'}</h2>
        <p>{projectsSection?.description || 'Our previous work and projects...'}</p>
      </div>

      <div id="services">
        <h2>{servicesSection?.title || 'Services'}</h2>
        <p>{servicesSection?.description || 'Our services...'}</p>
      </div>

      <div id="contact">
        <h2>{contactus?.title || 'Contact Us'}</h2>
        <p>{contactus?.description || 'Get in touch...'}</p>
      </div>

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({
  params: { lang = 'en' },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const front = await queryFrontByLocale({ locale: lang })
  return generateMeta({ doc: front })
}

const queryFrontByLocale = cache(async ({ locale }: { locale: string }) => {
  const { isEnabled: draft } = draftMode()
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'fronts',
    draft,
    limit: 1,
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })

  return result.docs?.[0] || null
})
