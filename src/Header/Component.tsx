import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

export async function Header({ locale }: { locale: "en" | "fr" | "ar" }) {
  const header: HeaderType = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient header={header} />
}
