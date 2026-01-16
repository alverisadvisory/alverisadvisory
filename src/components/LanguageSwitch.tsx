import { useEffect, useState } from 'react';
import { getSwitchedRoute, getLanguageFromPath } from '../lib/i18n';
import { LANGUAGES } from '../lib/siteConfig';
import type { LanguageCode } from '../lib/siteConfig';

interface LanguageSwitchProps {
  currentPath: string;
  className?: string;
  variant?: 'horizontal' | 'dropdown';
}

export function LanguageSwitch({
  currentPath,
  className = '',
  variant = 'horizontal',
}: LanguageSwitchProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('de');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const currentLanguage = getLanguageFromPath(currentPath);
    setCurrentLang(currentLanguage);

    // Check localStorage for user preference
    const savedLang = localStorage.getItem('preferredLanguage') as LanguageCode | null;
    if (savedLang && LANGUAGES[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, [currentPath]);

  const handleLanguageChange = (newLang: LanguageCode) => {
    if (newLang === currentLang) return;

    localStorage.setItem('preferredLanguage', newLang);
    const newRoute = getSwitchedRoute(currentPath, newLang);
    window.location.href = newRoute;
  };

  if (!isClient) return null;

  const otherLang: LanguageCode = currentLang === 'de' ? 'en' : 'de';

  if (variant === 'dropdown') {
    return (
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
        className={`
          px-3 py-2 border border-navy rounded
          bg-white text-navy font-medium
          cursor-pointer transition-colors hover:bg-light-gray
          focus:outline-none focus:ring-2 focus:ring-gold
          ${className}
        `}
        aria-label="Language selection"
      >
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </select>
    );
  }

  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={() => handleLanguageChange('de')}
        className={`
          px-3 py-2 font-medium transition-all duration-200 text-sm
          ${
            currentLang === 'de'
              ? 'text-gold border-b-2 border-gold'
              : 'text-navy hover:text-gold border-b-2 border-transparent'
          }
        `}
        aria-current={currentLang === 'de' ? 'true' : 'false'}
      >
        DE
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`
          px-3 py-2 font-medium transition-all duration-200 text-sm
          ${
            currentLang === 'en'
              ? 'text-gold border-b-2 border-gold'
              : 'text-navy hover:text-gold border-b-2 border-transparent'
          }
        `}
        aria-current={currentLang === 'en' ? 'true' : 'false'}
      >
        EN
      </button>
    </div>
  );
}
