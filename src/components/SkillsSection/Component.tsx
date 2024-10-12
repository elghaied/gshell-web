import { getLocale } from 'next-intl/server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Front } from '@/payload-types'
import { SkillsSectionClient } from './Component.client'



export async function SkillsSection({ skillsSection }: { skillsSection: Front['skillsSection'] }) {
  const locale = await getLocale()
  const payload = await getPayloadHMR({ config: configPromise })

  const skills = await payload.find({
    collection: 'skills',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })
  return <SkillsSectionClient skillsSection={skillsSection} skillsItems={skills.docs} locale={locale as 'ar' | 'en' | 'fr' | 'all'} />
 }
