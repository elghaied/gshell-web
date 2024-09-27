'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'

type NavItemType = {
  link: {
    label: string
    url: string
  }
}

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="flex gap-10 items-center">
      {navItems.map(({ link }: NavItemType, i: number) => {
        const isActive = pathname === link.url
        return (
          <Link
            key={i}
            href={link.url}
            className={`
              text-base no-underline transition-all duration-200 ease-in-out
              ${isActive ? 'text-Venetian text-xl font-bold' : 'text-black hover:text-Venetian'}
            `}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
