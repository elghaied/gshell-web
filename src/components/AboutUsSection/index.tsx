import { Front } from '@/payload-types'
import React from 'react'
import SectionTitle from '../SectionTitle'
import { Man } from '../Logo/Logo'

interface AboutUsSectionProps {
  aboutUs: Front['aboutus']
}

function AboutUsSection({ aboutUs }: AboutUsSectionProps) {
  return (
    <div id="about" className="relative bg-white dark:bg-black ">

        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[24rem]">
          <div className="w-full lg:w-1/2 relative z-10 border-b-4 border-primary dark:border-venetian">
            <Man className="w-full h-auto scale-120 transform origin-left" />
          </div>

          <div className="w-full lg:w-1/2 p-4 flex flex-col items-start ">
          <div className='lg:max-w-[550px] lg:-ml-32'>


            <SectionTitle title={aboutUs?.sectionTitle || 'About Us'} />
            <h2 className="~text-2xl/4xl font-semibold mb-4">
              {aboutUs?.aboutusTitle || 'About Us'}
            </h2>
            <p className="~text-base/xl font-normal">
              {aboutUs?.aboutusDescription || 'This section is about us...'}
            </p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default AboutUsSection
