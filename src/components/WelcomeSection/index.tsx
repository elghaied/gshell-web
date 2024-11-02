'use client'

import React, { useEffect, useState } from 'react'
import GButton from '../GButton'
import SectionTitle from '../SectionTitle'
import { MiniLogo } from '../Logo/Logo'
import { Front } from '@/payload-types'
import StyledTextParser from '../ui/StyledTextParser'

type WelcomeSectionProps = {
  welcome: Front['welcome']
  locale: string
}

export default function WelcomeSection({ welcome, locale }: WelcomeSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isRTL = locale === 'ar'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[24rem] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className={`w-full md:w-1/2 p-4 flex flex-col items-start transform transition-transform duration-1000 ease-out ${
          isVisible
            ? 'translate-x-0'
            : isRTL
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
      >
        <SectionTitle title={welcome?.sectionTitle || 'welcome'} />
        <StyledTextParser
           h1={true}
          text={welcome?.title}
          className={`mb-4 md:mb-6 ${isRTL ? 'font-black ~text-5xl/8xl' : '~text-4xl/6xl font-bold'}`}
        />
        <p className={`${isRTL ? '~text-base/xl' : '~text-sm/base'}`}>
          {welcome?.description || 'This section is about us...'}
        </p>
        <GButton cta={welcome?.buttonText!} />
      </div>

      <div
        className={`w-full md:w-1/2 p-4 flex justify-center transform transition-transform duration-1000 ease-out ${
          isVisible
            ? 'translate-x-0'
            : isRTL
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        <MiniLogo className="w-full animate-rock max-w-[15rem] md:max-w-[28rem] h-auto aspect-[446.922/361.12]" />
      </div>
    </section>
  )
}
