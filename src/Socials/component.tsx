import { getGlobal } from '@/utilities/getGlobals'

import Link from 'next/link'
import React from 'react'

import type { Social } from '@/payload-types'

import { getLocale } from 'next-intl/server'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

export async function Socials() {
  const currentLocale = await getLocale()
  const footer: Social = await getGlobal('socials', 1, currentLocale as 'en' | 'fr' | 'ar')

  const { facebook, instagram, linkedin } = footer

  return (
    <div className='flex gap-6'>
      {facebook && (
       <Link
       href={facebook}
       className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center"
       target="_blank"
       rel="noopener noreferrer"
     >
         <Facebook className="h-4 w-4" />
        </Link>
      )}

      {instagram && (
        <Link
        href={instagram}
        className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
          <Instagram className="h-4 w-4" />
        </Link>
      )}
      {linkedin && (
        <Link
          href={linkedin}
          className="text-black text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
      <Linkedin className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
