import React from 'react';

import GButton from '../GButton';
import SectionTitle from '../SectionTitle';
import { MiniLogo } from '../Logo/Logo';

const AboutSection = ({ welcome }) => {
  return (

<div
        id="about"
        className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[24rem]"
      >
        <div className="w-full md:w-1/2 p-4 flex flex-col items-start">
          <SectionTitle title={welcome?.sectionTitle || 'welcome'} />
          <h2 className="~text-2xl/6xl font-semibold	 mb-4  ">{welcome?.title || 'About Us'}</h2>
          <p className="text-sm/base">{welcome?.description || 'This section is about us...'}</p>
          <GButton cta='Hire me'/>
        </div>

        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <MiniLogo className="w-full animate-rock  ~max-w-[15rem]/[28rem] h-auto aspect-[446.922/361.12] " />
        </div>
      </div>
  )
}

export default AboutSection
