'use client'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { Theme } from '../Theme/types'

export interface ContextType {
  headerTheme: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: 'light', // Set a default theme
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | null>(initialContext.headerTheme)

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)
