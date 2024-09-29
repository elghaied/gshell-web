'use client'

import React from 'react'
import Link from 'next/link'

import type { Header as HeaderType } from '@/payload-types'
import { useLocale } from 'next-intl'

type NavItemType = {
  link: {
    label: string
    url: string
  }
}

export const HeaderNav: React.FC<{ header: HeaderType;  }> = ({ header }) => {
  const navItems = header?.navItems || []
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <nav className={`flex gap-10 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
      {navItems.map(({ link }: NavItemType, i: number) => {
        return (
          <Link
            key={i}
            href={link.url}
            className='text-base no-underline transition-all duration-200 ease-in-out text-black hover:text-Venetian dark:text-white'
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
