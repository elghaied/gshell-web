import { Front, Skill } from '@/payload-types'
import SectionTitle from '../SectionTitle'
import {
  Paintbrush,
  Code,
  Search,
  BarChart,
  Smartphone,
  Globe,
  Megaphone,
  Camera,
  PenTool,
  Zap,
  Coffee,
  Lightbulb,
  Rocket,
  Target,
  Headphones,
  LucideIcon,
} from 'lucide-react'
import StyledTextParser from '../ui/StyledTextParser'

type SkillsSectionProps = {
  skillsSection: Front['skillsSection']
  skillsItems: Skill[]
  locale: 'en' | 'fr' | 'ar' | 'all'
}

const iconMap: Record<string, LucideIcon> = {
  Paintbrush,
  Code,
  Search,
  BarChart,
  Smartphone,
  Globe,
  Megaphone,
  Camera,
  PenTool,
  Zap,
  Coffee,
  Lightbulb,
  Rocket,
  Target,
  Headphones,
}

export const SkillsSection = ({ skillsSection, skillsItems, locale }: SkillsSectionProps) => {
  const { sectionTitle, description, title } = skillsSection

  return (
    <section id="skills" className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-white dark:bg-black" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Title section - takes up 2x2 space */}
        <div className="col-span-2 row-span-2 flex justify-center flex-col items-start">
          <SectionTitle title={sectionTitle || 'Skills'} />
            <StyledTextParser text={title} className={` ${locale === 'ar' ? 'font-black' : ''} ~mb-4/6`}/>

          <p className="~text-sm/base font-normal">{description || 'These are my skills'}</p>
        </div>

        {/* Skills cards - will naturally flow in the remaining spaces */}
        {skillsItems?.map((item: Skill, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Code
          return (
            <div
              key={index}
              className="shadow-custom bg-white dark:bg-[#212121] dark:text-white rounded-lg px-5 py-4"
            >
              <IconComponent className="~w-5/7 ~h-5/7 ~mb-4/6 text-venetian dark:text-[#FF0D0D dark:opacity-85"  />

              <h3 className=" ~text-base/xl font-semibold mb-2 text-black  dark:text-[#F4F3F3]">{item.title}</h3>

              <p className="~text-xs/sm font-normal  text-[#323433] dark:text-[#F8FEFB]">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
