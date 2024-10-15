
import {getRequestConfig} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';
import { Locale } from './locales';


export default getRequestConfig(async ({locale}) => {

  if (!routing.locales.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,

  };
});
