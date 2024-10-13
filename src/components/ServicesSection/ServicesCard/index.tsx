import React from 'react';
import { Service, Technology } from '../../../payload-types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Code, Palette, Smartphone, ShoppingCart, Megaphone,
  Search, PenTool, Cloud, Shield, BarChart, Users, Wrench,
  LucideIcon
} from 'lucide-react';

type ServicesCardProps = {
  service: Service;
  locale: string
};

const iconMap: Record<string, LucideIcon> = {
  Code, Palette, Smartphone, ShoppingCart, Megaphone,
  Search, PenTool, Cloud, Shield, BarChart, Users, Wrench
};

export function ServicesCard({ service, locale }: ServicesCardProps) {
  const { title, description, technologies, icon } = service;
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Code;

  return (
    <Card className="flex w-full max-w-xs flex-col items-start ~gap-4/6 rounded-lg bg-white dark:bg-[#212121] dark:text-white border-none shadow-custom ~px-9/12 ~py-4/6">
      <IconComponent className="w-7 h-7 text-venetian dark:text-[#FF0D0DD6]" />
      <CardHeader className="p-0">
        <h3 className={`text-balance   ${locale === 'ar' ? 'font-extrabold ~text-2xl/4xl' : 'font-semibold ~text-xl/3xl font-poppins'} leading-tight text-black dark:text-[#F4F3F3]`}>
          {title}
        </h3>
      </CardHeader>

      <CardContent className='~gap-4/6 p-0 flex flex-col'>
        <p className={`${locale === 'ar' ? '~text-sm/base' : '~text-xs/sm'}  leading-relaxed text-charcoal dark:text-[#F8FEFB]`} >
          {description}
        </p>

        <div className="flex flex-wrap ~gap-2/4">
          {technologies?.map((tech: Technology, index) => (
            <Badge
              key={index}
              variant={'customBadge'}
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
