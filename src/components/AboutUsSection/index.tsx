import { Front } from '@/payload-types'
import React from 'react'
import SectionTitle from '../SectionTitle'
import { Man } from '../Logo/Logo'
import StyledTextParser from '../ui/StyledTextParser'

interface AboutUsSectionProps {
  aboutUs: Front['aboutus']
  locale: string
}

function AboutUsSection({ aboutUs, locale }: AboutUsSectionProps) {
  return (
    <section id="about" className="relative py-11">
      <div
        className="flex flex-col lg:flex-row items-center justify-between min-h-[24rem]"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <div
          className={`w-full lg:w-1/2 relative z-10 border-b-4 border-primary dark:border-venetian ${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
        >
          <Man className={`w-full h-auto scale-120 transform origin-left `} />
        </div>

        <div className="w-full lg:w-1/2 p-4 flex flex-col items-start ">
          <div className={`lg:max-w-[550px] ${ locale === 'ar' ? 'lg:-mr-32' : 'lg:-ml-32'}`}>
            <SectionTitle title={aboutUs?.sectionTitle || 'About Us'} />
            <StyledTextParser  text={aboutUs?.aboutusTitle}  className={` ${locale === 'ar' ? 'font-black' : ''}`} />

            <p className="~text-base/xl font-normal">
              {aboutUs?.aboutusDescription || 'This section is about us...'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
