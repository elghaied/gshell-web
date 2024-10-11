'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {  Globe, Menu, X } from 'lucide-react'
import {  Logo, MiniLogo, Moon, Sun } from '@/components/Logo/Logo'
import { useTheme } from '@/providers/Theme'
import type { Header as HeaderType } from '@/payload-types'
import LanguageSwitcher from '../LanguagesSwitcher'


export const MobileHeader: React.FC<{ header: HeaderType;  }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-smoke dark:bg-gray-800 shadow-lg  z-50">
        <div className="flex justify-between items-center px-4 py-2">

            <MiniLogo className="h-8"/>



          <button onClick={toggleTheme} className="p-2">
            {theme === 'dark' ? <Sun className="w-6 h-6 fill-black dark:fill-white" /> : <Moon className="w-6 h-6 fill-black" />}
          </button>
          <button onClick={toggleMenu} className="p-2">
            <Globe className="w-6 h-6" />
          </button>
          <button onClick={toggleMenu} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 z-[60] overflow-y-auto">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
          <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <Logo/>
            {navItems.map(({ link }: NavItemType, i: number) => (
              <Link
                key={i}
                href={link.url}
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <LanguageSwitcher/>
          </div>
        </div>
      )}
    </>
  )
}
