'use client'

import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
      {navItems.map(({ link }: NavItemType, i: number) => {
        return (
          <Link
            key={i}
            href={link.url}
            className="text-xs md:text-sm lg:text-base no-underline transition-all duration-200 ease-in-out text-black hover:text-Venetian dark:text-white"
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
