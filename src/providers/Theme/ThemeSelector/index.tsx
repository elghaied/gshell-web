'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '..'

import { themeLocalStorageKey } from './types'
import Image from 'next/image'
import type { Theme } from './types'
import { useTranslations } from 'next-intl'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Moon, Sun } from '@/components/Logo/Logo'


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
    <button
      onClick={toggleTheme}
       className="group bg-smoke text-[#212121] transition-all ease-in-out duration-200 justify-center flex items-center gap-2 rounded-[12px] p-3 min-w-[148px] h-[56px] hover:bg-venetian hover:text-white"
    >
      {currentTheme === 'light' ? (
         <Moon  className='~w-6/8 ~h-6/8 fill-current group-hover:fill-white'/>
      ) : (
         <Sun  className='~w-6/8 ~h-6/8 fill-current group-hover:fill-white'/>

      )}
      <span className=" ~text-sm/base">
        {currentTheme === 'light' ? t('darkMode') : t('lightMode')}
      </span>
    </button>
  )
}
