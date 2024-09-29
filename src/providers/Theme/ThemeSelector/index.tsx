'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '..'
import { Moon, Sun } from 'lucide-react'

import { themeLocalStorageKey } from './types'

import type { Theme } from './types'
import { useTranslations } from 'next-intl'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const { setHeaderTheme } = useHeaderTheme()
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')
  const t = useTranslations('Footer')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeLocalStorageKey) as Theme | null
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      setTheme(savedTheme)
      setHeaderTheme(savedTheme)
    }
  }, [setTheme, setHeaderTheme])


  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setHeaderTheme(newTheme)
    setCurrentTheme(newTheme)
    window.localStorage.setItem(themeLocalStorageKey, newTheme)
  }

  return (
    <button onClick={toggleTheme}  className="bg-white text-black transition-all ease-in-out duration-200 justify-center flex items-center gap-2 rounded-[12px] w-[148px] h-[56px] hover:bg-venetian hover:text-white" >
      {currentTheme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className=" text-base">{currentTheme === 'light' ? t('darkMode') : t('lightMode')}</span>
    </button>
  )
}
