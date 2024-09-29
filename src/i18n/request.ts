// import { notFound } from 'next/navigation';
// import { getRequestConfig } from 'next-intl/server';
// import { locales, localesData, Locale } from './locales';
// import { getCachedGlobal } from '@/utilities/getGlobals';
// import { Header } from '@/payload-types';

// // Helper function to transform Header to AbstractIntlMessages
// function headerToMessages(header: Header): Record<string, string> {
//   // Implement the logic to transform your Header type to a flat object of key-value pairs
//   // This is just an example, adjust according to your Header structure
//   return {};
// }

// export default getRequestConfig(async ({ locale }) => {
//   // Type guard to validate that `locale` is a valid Locale
//   if (!locales.includes(locale)) {
//     notFound();
//     return; // Ensure the function ends here
//   }

//   // Assert `locale` is a valid Locale after the check
//   const validLocale = locale as Locale;

//   // Fetch the header data based on locale
//   const header: Header = await getCachedGlobal('header', 1, validLocale)();
//   const messages = headerToMessages(header);

//   // Ensure a valid RequestConfig object is always returned
//   return {
//     messages,
//     timeZone: 'Europe/Vienna',
//   };
// });
