'use client'

import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex items-center ~gap-5/10 ">
      {navItems.map(({ link }: NavItemType, i: number) => {
        return (
          <Link
            key={i}
            aria-label={link.label}
            href={link.url}
            className="~text-xs/base no-underline font-medium transition-all duration-200 ease-in-out text-black  hover:text-venetian dark:text-white"
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
