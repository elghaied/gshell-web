import React from 'react'
import { Media, Testimonial } from '../../../payload-types'
import { UserCircle } from 'lucide-react'
import StarRating from './StarRating'
import Image from 'next/image'

type TestimonialCardProps = {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { author, content, rating, occupation, image } = testimonial

  // Type guard to ensure image is a Media object
  const imageUrl = image && typeof image !== 'string' && 'url' in image ? image.url : null

  return (
    <div className="flex ~gap-5/7 flex-col justify-between  ~p-4/8   rounded-lg h-full shadow-custom dark:bg-[#212121] dark:border-[#323433]">
      <div className="flex  flex-col ~gap-5/7">
        <StarRating rating={rating} />

        <p className="~text-sm/base font-normal text-[#323433] dark:text-[#F8FEFB] text-wrap break-words">{content}</p>


      </div>
      <div className="flex items-center gap-3">
          {imageUrl ? (
            <div className="relative h-10 w-10">
              <Image
                src={imageUrl}
                alt={author || 'Testimonial author'}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <UserCircle className="h-10 w-10  text-gray-600 dark:text-[#3E3E3E] " />
          )}

          <div>
            <p className="font-semibold ~text-sm/base text-black dark:text-[#F4F3F3] capitalize">
              {author}
            </p>
            <p className="~text-xs/sm text-[#92929D]">{occupation}</p>
          </div>
        </div>
    </div>
  )
}
