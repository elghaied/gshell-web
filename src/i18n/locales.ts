// locals.ts
export const locales: string[] = ['en', 'ar', 'fr'];

export type Locale = (typeof locales)[number];

export const localesData = {
  ar: {
    value: 'ar',
    dir: 'rtl',
    label: 'العربية',
    abbreviation: 'AR',
    countryCode: 'SA',
  },

  en: {
    value: 'en',
    dir: 'ltr',
    label: 'English',
    abbreviation: 'EN',
    countryCode: 'GB',
  },
  fr: { // Note the key should be 'fr', not 'tr'.
    value: 'fr',
    dir: 'ltr',
    label: 'Français',
    abbreviation: 'FR',
    countryCode: 'FR',
  },
};
