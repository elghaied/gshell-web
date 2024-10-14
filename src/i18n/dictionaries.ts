import { Locale } from '@/i18n/locales';
import { Dictionary } from 'messages/types';
import 'server-only';


const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../../messages/en.json').then((module) => module.default),
  ar: () => import('../../messages/ar.json').then((module) => module.default),
  fr: () => import('../../messages/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
