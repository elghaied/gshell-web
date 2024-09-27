import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LocaleProvider } from './LocaleProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <LocaleProvider>
        {children}
        </LocaleProvider>
        </HeaderThemeProvider>
    </ThemeProvider>
  )
}
