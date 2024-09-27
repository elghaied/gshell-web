'use client'

import { useLocale } from '@/providers/LocaleProvider'
import React from 'react'
import { Header } from './Component'


export const HeaderWrapper: React.FC = () => {
  const { locale } = useLocale()

  return <Header locale={locale} />
}
