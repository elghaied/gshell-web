import Link from 'next/link'
import React from 'react'

import type { Social } from '@/payload-types'

import { getLocale } from 'next-intl/server'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Socials() {
  const currentLocale = await getLocale()
  const socials: Social = await getCachedGlobal('socials', 1, currentLocale as 'en' | 'fr' | 'ar')()

  const { facebook, instagram, linkedin, malt } = socials

  return (
    <div className="flex gap-6">
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
      {malt && (
        <Link
          href={malt}
          className=" group text-base h-8 w-8  bg-white rounded-[12px] flex items-center justify-center hover:bg-venetian dark:hover:bg-[#FF0D0DD6] hover:text-white transition-colors ease-in-out duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Malt page"
        >
          <svg
            className="h4 w-4 fill-black group-hover:fill-white"

            viewBox="0 0 431 431"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M368.4 62.8C335.9 30.4 301.3 51.4 279.6 73L74.8 277.8C53.1 299.5 30.4 332.5 64.6 366.6C98.7 400.7 131.6 378 153.3 356.3L358.1 151.5C379.8 129.9 400.8 95.2 368.4 62.8ZM172.7 54.4L216.1 97.8L260.2 53.6C263.2 50.6 266.2 47.8 269.3 45.2C264.7 21.9 251.4 0.800003 216 0.800003C180.6 0.800003 167.3 22 162.8 45.3C166.1 48.2 169.4 51.1 172.7 54.4ZM260.2 376.5L216.1 332.4L172.7 375.7C169.4 379 166.2 382.1 162.9 384.9C167.9 408.7 181.9 430.4 216 430.4C250.2 430.4 264.3 408.5 269.2 384.7C266.2 382.1 263.2 379.5 260.2 376.5ZM154.3 159.5H70.7C40 159.5 0.700012 169.2 0.700012 215C0.700012 249.3 22.6 263.3 46.5 268.2C49.3 265 154.3 159.5 154.3 159.5ZM385.8 161.8C383.2 164.8 277.9 270.6 277.9 270.6H360.3C391 270.6 430.3 263.3 430.3 215C430.3 179.7 409.2 166.4 385.8 161.8ZM181.7 132.1L196.6 117.2L153.3 73.8C131.6 52.1 98.7 29.4 64.5 63.6C39.5 88.6 45.1 113 58.3 132.7C62.4 132.4 181.7 132.1 181.7 132.1ZM250.4 298L235.4 313L279.6 357.1C301.3 378.8 335.9 399.8 368.3 367.4C392.5 343.2 387 317.7 373.6 297.4C369.3 297.7 250.4 298 250.4 298Z" />
          </svg>
        </Link>
      )}
    </div>
  )
}
