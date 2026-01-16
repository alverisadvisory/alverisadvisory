// Site configuration and metadata
export const SITE_TITLE = 'ALVERIS Advisory GmbH';
export const SITE_DESCRIPTION = 'Accounting Advisory und Finance Digitalisierung';
export const CONTACT_EMAIL = 'hello@alveris.ch';

// Colors - exact hex values
export const COLORS = {
  white: '#FFFFFF',
  lightGray: '#F4F4F4',
  midGray: '#9A9A9A',
  navy: '#13324E',
  gold: '#CF9F41',
  black: '#000000',
};

// Language configuration
export const LANGUAGES = {
  de: { label: 'Deutsch', name: 'DE' },
  en: { label: 'English', name: 'EN' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;
