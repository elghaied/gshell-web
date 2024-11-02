'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Globe, Menu, X } from 'lucide-react'
import { Logo, MiniLogo, Moon, Sun } from '@/components/Logo/Logo'
import { useTheme } from '@/providers/Theme'
import type { Header as HeaderType } from '@/payload-types'
import LanguageSwitcher from '../LanguagesSwitcher'

export const MobileHeader: React.FC<{ header: HeaderType }> = ({ header }) => {
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
      <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md z-50">
        <div className="flex justify-between items-center px-4 py-2 max-w-screen-xl mx-auto">
          <MiniLogo className="h-8 text-white fill-white max-w-14" />

          <button onClick={toggleTheme} aria-label="Toggle dark mode" className="p-2">
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 fill-white" />
            ) : (
              <Moon className="w-6 h-6 fill-white" />
            )}
          </button>
          <button onClick={toggleMenu} aria-label="Toggle language" className="p-2">
            <Globe className="w-6 h-6 text-white" />
          </button>
          <button onClick={toggleMenu} aria-label="Toggle menu" className="p-2">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-lg z-[60] transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full space-y-6 transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? 'translate-y-0'
              : 'translate-y-full'
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <Logo className="fill-white transition-opacity duration-200 delay-150" />
          {navItems.map(({ link }: NavItemType, i: number) => (
            <Link
              key={i}
              href={link.url}
              className="text-xl font-medium text-white hover:text-gray-300 transition-all transform  duration-200 hover:scale-105"
              style={{ transitionDelay: `${150 + i * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="transition-opacity duration-200 delay-300">
            <LanguageSwitcher mobile={true} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader
