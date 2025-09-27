import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import bnTranslations from './locales/bn.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
  bn: {
    translation: bnTranslations,
  },
  // Add more languages as needed
  ta: {
    translation: enTranslations, // Placeholder - use English for now
  },
  te: {
    translation: enTranslations, // Placeholder
  },
  mr: {
    translation: enTranslations, // Placeholder
  },
  gu: {
    translation: enTranslations, // Placeholder
  },
  kn: {
    translation: enTranslations, // Placeholder
  },
  ml: {
    translation: enTranslations, // Placeholder
  },
  pa: {
    translation: enTranslations, // Placeholder
  },
  or: {
    translation: enTranslations, // Placeholder
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;