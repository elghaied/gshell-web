import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { withFluid } from '@fluid-tailwind/tailwind-merge'

const twMerge = extendTailwindMerge(withFluid)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
