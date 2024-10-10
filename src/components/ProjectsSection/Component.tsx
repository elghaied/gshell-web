import { getLocale } from 'next-intl/server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Front } from '@/payload-types'
import { ProjectsClient } from './Component.client'
export async function ProjectsSection({ projectSection }: { projectSection: Front['projectsSection'] }) {
  const locale = await getLocale()
  const payload = await getPayloadHMR({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
    overrideAccess: true,
  })
  // const categories = await payload.find({
  //   collection: 'categories',
  //   locale: (locale !== 'en' ? locale : undefined) as 'en' | 'fr' | 'ar' | 'all' | undefined,
  //   overrideAccess: true,
  // })
  return <ProjectsClient projectSection={projectSection} projectItems={projects.docs} locale={locale as 'ar' | 'en' | 'fr' | 'all'}  />
}
