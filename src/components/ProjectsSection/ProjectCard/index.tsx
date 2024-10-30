import React from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Project, Technology } from '@/payload-types'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

type ProjectCardProps = {
  project: Project
}

const PLACEHOLDER_IMAGE = '/svgs/placeholder.svg'

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, url, technologies } = project
  const mediaImage = typeof image !== 'string' ? image : null

  // Use state to handle responsive image URL
  const [imageUrl, setImageUrl] = useState<string>(() => {
    if (!mediaImage?.sizes) return mediaImage?.url || PLACEHOLDER_IMAGE
    return mediaImage.sizes.projectOriginal?.url ||
           mediaImage.url ||
           PLACEHOLDER_IMAGE
  })

  // Handle responsive images on the client side only
  useEffect(() => {
    const handleResize = () => {
      if (!mediaImage?.sizes) return

      if (window.innerWidth < 640) {
        setImageUrl(
          mediaImage.sizes.projectMobile?.url ||
          mediaImage.sizes.projectSmall?.url ||
          mediaImage.sizes.projectOriginal?.url ||
          mediaImage.url ||
          PLACEHOLDER_IMAGE
        )
      } else if (window.innerWidth < 768) {
        setImageUrl(
          mediaImage.sizes.projectSmall?.url ||
          mediaImage.sizes.projectOriginal?.url ||
          mediaImage.url ||
          PLACEHOLDER_IMAGE
        )
      } else {
        setImageUrl(
          mediaImage.sizes.projectOriginal?.url ||
          mediaImage.url ||
          PLACEHOLDER_IMAGE
        )
      }
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [mediaImage])

  const getFocalPoint = () => {
    if (mediaImage?.focalPoint) {
      return `${mediaImage.focalPoint[0] * 100}% ${mediaImage.focalPoint[1] * 100}%`
    }
    if (mediaImage?.focalX && mediaImage?.focalY) {
      return `${mediaImage.focalX * 100}% ${mediaImage.focalY * 100}%`
    }
    return 'center'
  }

  return (
    <Card className="w-[280px] sm:w-[340px] cursor-pointer lg:w-[497px] h-full overflow-hidden bg-white dark:bg-[#212121] shadow-custom flex flex-col pb-8">
      <CardHeader className="p-3 md:p-6 bg-gray-50 dark:bg-[#3E3E3E] flex-shrink-0">
        {mediaImage && (
          <Link
            href={url || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full group"
            style={{ aspectRatio: '401/327' }}
          >
            <Image
              src={imageUrl}
              alt={mediaImage.alt || title}
              fill
              sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 497px"
              quality={85}
              placeholder="blur"
              blurDataURL={mediaImage.sizes?.projectBlur?.url || '/placeholder.svg'}
              style={{
                objectFit: 'cover',
                objectPosition: getFocalPoint()
              }}
              className="transition-transform duration-300 group-hover:scale-105 rounded-lg"
            />
            <div
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                         transition-opacity duration-300 rounded-lg flex items-center
                         justify-center backdrop-blur-[2px]"
            >
              <ExternalLink className="text-white w-8 h-8 md:w-12 md:h-12" />
            </div>
          </Link>
        )}
      </CardHeader>

      <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-lg md:text-xl line-clamp-1 dark:text-[#F4F3F3] mb-3">
            {title}
          </h3>
          <p className="text-sm md:text-base font-normal line-clamp-3 dark:text-[#F8FEFB] flex-grow">
            {description}
          </p>
        </div>

        {technologies && technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech: Technology, index) => (
              <Badge
                key={typeof tech === 'string' ? index : tech.id}
                variant="customBadge"
                className="text-xs md:text-sm font-medium"
              >
                {typeof tech === 'string' ? tech : tech.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
