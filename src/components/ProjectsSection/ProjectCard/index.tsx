import React from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Project, Media, Technology } from '@/payload-types'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, url, technologies } = project

  return (
    <Card className="w-[280px] sm:w-[340px] lg:w-[497px] h-full overflow-hidden bg-white dark:bg-[#212121] shadow-custom flex flex-col pb-8">
      <CardHeader className="p-3 md:p-6 bg-gray-50 dark:bg-[#3E3E3E] flex-shrink-0">
        {image && typeof image !== 'string' && url && (
          <Link href={url} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" className="block relative w-full group" style={{ aspectRatio: '16/13' }}>
              <Image
                src={(image as Media).url || '/placeholder.svg'}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <ExternalLink className="text-white w-8 h-8 md:w-12 md:h-12" />
              </div>
            </a>
          </Link>
        )}
      </CardHeader>

      <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-lg md:text-xl line-clamp-1 dark:text-[#F4F3F3] mb-3">{title}</h3>
          <p className="text-sm md:text-base font-normal line-clamp-3 dark:text-[#F8FEFB] flex-grow">{description}</p>
        </div>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech: Technology, index) => (
              <Badge
                key={index}
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
