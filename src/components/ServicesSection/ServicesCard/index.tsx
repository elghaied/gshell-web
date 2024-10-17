import React from 'react';
import { Service, Technology } from '../../../payload-types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Code, Palette, Smartphone, ShoppingCart, Megaphone,
  Search, PenTool, Cloud, Shield, BarChart, Users, Wrench,
  LucideIcon
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ServicesCardProps = {
  service: Service;
  locale: string
};

const iconMap: Record<string, LucideIcon> = {
  Code, Palette, Smartphone, ShoppingCart, Megaphone,
  Search, PenTool, Cloud, Shield, BarChart, Users, Wrench
};

export function ServicesCard({ service, locale }: ServicesCardProps) {
  const { title, description, technologies, icon,details } = service;
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
        {details && details.length > 0 && (
          <div className="flex flex-col w-full ~gap-3/4">
            {details.map((detail, index) => (
              <React.Fragment key={detail.id || index}>
                <p className={`${
                  locale === 'ar' ? '~text-sm/base' : '~text-xs/sm'
                } text-charcoal dark:text-[#F8FEFB]`}>
                  {detail.line}
                </p>
                {index < details.length - 1 && (
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
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
