

import Link from 'next/link'
import React from 'react'

import type { Social } from '@/payload-types'

import { getLocale } from 'next-intl/server'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Socials() {
  const currentLocale = await getLocale()
  const footer: Social = await getCachedGlobal('socials', 1, currentLocale as 'en' | 'fr' | 'ar')()

  const { facebook, instagram, linkedin } = footer

  return (
    <div className='flex gap-6'>
      {facebook && (
       <Link
       href={facebook}
       className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center hover:bg-venetian hover:text-white dark:hover:bg-[#FF0D0DD6] transition-colors ease-in-out duration-300"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Facebook page"
     >
         <Facebook className="h-4 w-4" />
        </Link>
      )}

      {instagram && (
        <Link
        href={instagram}
        className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center hover:bg-venetian hover:text-white dark:hover:bg-[#FF0D0DD6] transition-colors ease-in-out duration-300"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram page"
      >
          <Instagram className="h-4 w-4" />
        </Link>
      )}
      {linkedin && (
        <Link
          href={linkedin}
          className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center hover:bg-venetian dark:hover:bg-[#FF0D0DD6] hover:text-white transition-colors ease-in-out duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn page"
        >
      <Linkedin className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
