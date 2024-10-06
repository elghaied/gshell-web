import { cn } from '@/utilities/cn'
import React from 'react'

interface SectionTitleProps {
  title:string
  classNmae?:string
}
export default function SectionTitle({
  title,classNmae} : SectionTitleProps) {
  return (
    <h2 className={cn("text-venetian ~text-lg/xl border first-letter:capitalize mb-[10px] border-venetian px-4 py-1 rounded-[100%] inline-block",classNmae)}>{title}</h2>
  )
}
