import type { LanguageCode } from './siteConfig';

// Navigation labels per language
export const NAV_LABELS: Record<LanguageCode, Record<string, string>> = {
  de: {
    home: 'Startseite',
    services: 'Leistungen',
    about: 'Über mich',
    contact: 'Kontakt',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  en: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    imprint: 'Imprint',
    privacy: 'Privacy',
  },
};

// Route mapping for language switch (from current page to other language)
export const ROUTE_MAP: Record<string, Record<LanguageCode, string>> = {
  '/de/': { de: '/de/', en: '/en/' },
  '/de/leistungen': { de: '/de/leistungen', en: '/en/services' },
  '/de/ueber-mich': { de: '/de/ueber-mich', en: '/en/about' },
  '/de/kontakt': { de: '/de/kontakt', en: '/en/contact' },
  '/de/impressum': { de: '/de/impressum', en: '/en/imprint' },
  '/de/datenschutz': { de: '/de/datenschutz', en: '/en/privacy' },
  '/en/': { de: '/de/', en: '/en/' },
  '/en/services': { de: '/de/leistungen', en: '/en/services' },
  '/en/about': { de: '/de/ueber-mich', en: '/en/about' },
  '/en/contact': { de: '/de/kontakt', en: '/en/contact' },
  '/en/imprint': { de: '/de/impressum', en: '/en/imprint' },
  '/en/privacy': { de: '/de/datenschutz', en: '/en/privacy' },
};

// Get route in another language
export function getSwitchedRoute(currentPath: string, targetLang: LanguageCode): string {
  return ROUTE_MAP[currentPath]?.[targetLang] || '/de/';
}

// Detect language from pathname
export function getLanguageFromPath(pathname: string): LanguageCode {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/de')) return 'de';
  return 'de';
}
