'use client';

import { useRouter, usePathname } from '@/i18n/routing'; // Import routing from next-intl
import { useLocale } from 'next-intl';
const languages = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'fr', label: 'FR', path: '/fr' },
  { code: 'ar', label: 'AR', path: '/ar' },
];

export default function LanguageSwitcher() {
  const locale = useLocale(); // Get the current locale using next-intl's hook
  const router = useRouter(); // Get the router to handle navigation
  const pathname = usePathname();

  const handleLanguageChange = (languageCode: 'en' | 'fr' | 'ar') => {
    // Switch locale using router and next-intl's functionality
    router.push(pathname, { locale: languageCode });

    // Set the locale cookie for persistence
    document.cookie = `NEXT_LOCALE=${languageCode}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <div className="flex space-x-[30px] p-4 rounded-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as 'en' | 'fr' | 'ar')}
          className={`
            w-[65px] h-[40px] rounded-[8px] font-bold text-lg
            ${locale === lang.code
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-black dark:text-white hover:text-venetian dark:hover:text-venetian'
            }
            transition-colors duration-200 ease-in-out
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
