import { getGlobal } from '@/utilities/getGlobals'

import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { getLocale } from 'next-intl/server'
import { Socials } from '@/Socials/component'

export async function Footer() {
  const currentLocale = await getLocale()
  const footer: Footer = await getGlobal('header', 1, currentLocale as 'en' | 'fr' | 'ar')
  const navItems = footer?.navItems || []
  const isRTL = currentLocale === 'ar'

  return (
    <footer className="border-t border-border bg-black  text-white hidden md:block relative z-20" dir={isRTL ? 'rtl' : 'ltr'} >
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-20 ">
          <Link className="flex items-center" href="/">
            <picture>
              <img
                alt="Payload Logo"
                className="max-w-[15rem] invert-0"
                src="/svgs/gshell-logo.svg"
              />
            </picture>
          </Link>
          <nav className="flex flex-col md:flex-row gap-10">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white text-base " key={i} {...link} />
            })}
          </nav>
        </div>

        <div className="flex items-start flex-col gap-8 md:justify-between md:items-center">
          <ThemeSelector />
          <Socials />
        </div>
      </div>
    </footer>
  )
}
