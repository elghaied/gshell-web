import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

interface GButtonProps {
  cta?: string
  className?: string
}
function GButton({cta = "Hire me", className} : GButtonProps) {
  return (
    <Link href="#contactus" className={cn('~px-4/8 ~py-2/4 ~text-sm/xl flex items-center justify-center  ~rounded-[.5rem]/[0.8rem] bg-black hover:bg-venetian text-white ~mt-2/4 ', className)}>{cta}</Link>
  )
}

export default GButton
