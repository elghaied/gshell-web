import { HeaderClient } from './Component.client'
import React from 'react'
import type {  Header as HeaderType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { getLocale} from 'next-intl/server';


export async function Header() {

  const currentLocale = await getLocale()
  const header: HeaderType = await getGlobal('header', 1, currentLocale as "en" | "fr" | "ar")

  return <HeaderClient header={header} locale={currentLocale}  />
}
