'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from '@/i18n/routing'; // Import routing from your defined routes

type Locale = 'en' | 'fr' | 'ar';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Extract the locale from the current pathname
    const pathParts = pathname.split('/');
    const langCode = pathParts[1] as Locale;

    if (['en', 'fr', 'ar'].includes(langCode)) {
      setLocaleState(langCode);
    } else {
      setLocaleState('en'); // Default to English if no locale is found
    }
  }, [pathname]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);

      // Instead of manipulating the path, use router to change the locale
      // The `useRouter` from `next-intl` automatically handles locale-aware navigation
      router.push(pathname, { locale: newLocale });

      // Set the locale cookie for persistence
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    },
    [pathname, router]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to access the locale context
export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
