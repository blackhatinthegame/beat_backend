import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import en from '../locales/en.json';
import mn from '../locales/mn.json';

type Locale = 'en' | 'mn';
type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = { en, mn };

interface LocaleContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('locale') as Locale | null) : null;
    if (stored) setLocale(stored);
  }, []);

  const t = useMemo(() => {
    const dict = dictionaries[locale];
    return (key: string) => dict[key] || key;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale: (lng: Locale) => {
        setLocale(lng);
        if (typeof window !== 'undefined') localStorage.setItem('locale', lng);
      }
    }),
    [locale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('LocaleContext not found');
  return ctx;
}


