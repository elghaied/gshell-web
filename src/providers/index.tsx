import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {

  // const messages = await getMessages();
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        {children}
        </HeaderThemeProvider>
    </ThemeProvider>
  )
}
