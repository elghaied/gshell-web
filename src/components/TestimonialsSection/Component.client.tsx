'use client'

import { Front, Testimonial } from '@/payload-types'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import SectionTitle from '../SectionTitle'
import { TestimonialCard } from './TestimonialCard'

type TestimonialSectionProps = {
  testimonialsSection: Front['testimonialsSection']
  testimonialsItems: Testimonial[]
  locale: string
}

export const TestimonialsClient: React.FC<TestimonialSectionProps> = ({
  testimonialsSection,
  testimonialsItems,
  locale,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [cardWidth, setCardWidth] = useState(380)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardGap = 24
  const isRTL = locale === 'ar'

  const updateCardWidth = useCallback(() => {
    const cardElement = document.querySelector('.testimonial-card-container')
    if (cardElement) {
      const actualWidth = cardElement.getBoundingClientRect().width
      setCardWidth(actualWidth)
    } else {
      if (window.innerWidth < 640) {
        setCardWidth(320)
      } else if (window.innerWidth < 1024) {
        setCardWidth(380)
      } else {
        setCardWidth(400)
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

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return

      const currentX = 'touches' in e ? e.touches[0].pageX : e.pageX
      const diff = startX - currentX

      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeIndex < testimonialsItems.length - 1) {
          setActiveIndex(activeIndex + 1)
          setIsDragging(false)
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
          setIsDragging(false)
        }
      }
    },
    [isDragging, startX, activeIndex, testimonialsItems.length],
  )

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
    <section className="px-4 lg:px-8 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionTitle title={testimonialsSection?.sectionTitle || 'Testimonials'} />
          <h2 className="text-3xl lg:text-5xl font-semibold text-black dark:text-white">
            {testimonialsSection?.title || 'What our clients say'}
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{
              transform: getSlideTransform(),
              gap: `${cardGap}px`,
            }}
          >
            {testimonialsItems.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 testimonial-card-container w-full sm:w-[380px] lg:w-[400px]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonialsItems.map((_, index) => (
              <button
                key={`controller_${index}`}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full transition-all duration-300 h-2 lg:h-3 ${
                  activeIndex === index
                    ? 'bg-venetian w-6 lg:w-8'
                    : 'bg-[#C5C5C5] w-2 lg:w-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
