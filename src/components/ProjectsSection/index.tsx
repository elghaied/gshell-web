'use client'

import { Category, Front, Project, Service } from '@/payload-types'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import SectionTitle from '../SectionTitle'
import { ProjectCard } from './ProjectCard'
import StyledTextParser from '../ui/StyledTextParser'

type ProjectsSectionProps = {
  projectSection: Front['projectsSection']
  projectItems: Project[]
  locale: 'en' | 'fr' | 'ar' | 'all'
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projectSection,
  projectItems,
  locale,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [cardWidth, setCardWidth] = useState(280)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardGap = 16
  const isRTL = locale === 'ar'

  const updateCardWidth = useCallback(() => {
    const cardElement = document.querySelector('.project-card-container')
    if (cardElement) {
      const actualWidth = cardElement.getBoundingClientRect().width
      setCardWidth(actualWidth)
    } else {
      if (window.innerWidth < 640) {
        setCardWidth(280)
      } else if (window.innerWidth < 1024) {
        setCardWidth(340)
      } else {
        setCardWidth(497)
      }
    }
  }, [])

  useEffect(() => {
    updateCardWidth()
    const handleResize = () => setTimeout(updateCardWidth, 100)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateCardWidth])

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDragging(true)
    if ('touches' in e) {
      setStartX(e.touches[0].pageX)
    } else {
      setStartX(e.pageX)
    }
  }

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    const currentX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const diff = startX - currentX

    // Reverse the direction for RTL languages
    const adjustedDiff = isRTL ? -diff : diff

    if (Math.abs(adjustedDiff) > 50) {
      if (adjustedDiff > 0 && activeIndex < projectItems.length - 1) {
        setActiveIndex(activeIndex + 1)
        setIsDragging(false)
      } else if (adjustedDiff < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
        setIsDragging(false)
      }
    }
  }, [isDragging, startX, activeIndex, projectItems.length, isRTL])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    window.addEventListener('mousemove', handleDragMove)
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchmove', handleDragMove)
    window.addEventListener('touchend', handleDragEnd)

    return () => {
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleDragMove)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [handleDragMove, handleDragEnd])

  const getSlideTransform = () => {
    const baseTransform = activeIndex * (cardWidth + cardGap)
    return isRTL
      ? `translateX(calc(${baseTransform}px))`
      : `translateX(calc(-${baseTransform}px))`
  }

  return (
    <section className="py-8 relative z-0 bg-background" id="projects" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-2/5 flex justify-center flex-col mb-8">
          <div className={`max-w-[350px] ${isRTL ? 'lg:mr-0 lg:ml-auto' : 'lg:ml-0 lg:mr-auto'}`}>
            <SectionTitle title={projectSection?.sectionTitle || 'Our Projects'} />
            <StyledTextParser text={projectSection?.title }  className={`${locale === 'ar' ? 'font-black' : ''} ~mb-4/6`}  />

            {projectSection?.description && (
              <p className="mt-2 text-base lg:text-lg text-[#323433] dark:text-[#F8FEFB]">{projectSection.description}</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/5 overflow-hidden">
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out mx-auto"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{
                transform: getSlideTransform(),
                gap: `${cardGap}px`,
              }}
            >
              {projectItems?.map((project) => (
                <div key={project.id} className="flex-shrink-0 project-card-container">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center ~gap-3/4 ~mt-4/6">
            {projectItems?.map((project, index) => (
              <button
                key={`${project.id}_controller`}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full transition-all duration-300 ~h-3/4 ${
                  activeIndex === index ? 'bg-venetian ~w-8/10' : 'bg-[#C5C5C5] ~w-3/4'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
