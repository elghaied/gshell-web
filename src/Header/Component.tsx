import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'

import type { Config, Header as HeaderType } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'


type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale : "en" | "fr" | "ar") {
  const payload = await getPayloadHMR({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}

export async function Header({ locale }: { locale: "en" | "fr" | "ar" }) {
  const header: HeaderType = await getGlobal('header', 1, locale)

  return <HeaderClient header={header} locale={locale} />
}
