import {  getGlobal } from '@/utilities/getGlobals'

import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { getLocale, unstable_setRequestLocale } from 'next-intl/server'

export async function Footer( ) {


  const currentLocale = await getLocale()
  const footer: Footer = await getGlobal('header', 1, currentLocale as "en" | "fr" | "ar")
  const navItems = footer?.navItems || []

  return (
    <footer className="border-t border-border bg-black  text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div>
        <Link className="flex items-center" href="/">
          <picture>
            <img
              alt="Payload Logo"
              className="max-w-[15rem] invert-0"
              src="svgs/gshell-logo.svg"
            />
          </picture>
        </Link>
        <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>


        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />

        </div>
      </div>
    </footer>
  )
}
