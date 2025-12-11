"use client";

import { useLocale } from '../lib/locale-context';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center gap-0 bg-neutral-900/60 border border-neutral-700/50 rounded-full p-1 backdrop-blur-sm shadow-sm">
      <button
        onClick={() => setLocale('en')}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 relative ${
          locale === 'en'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
            : 'text-neutral-400 hover:text-neutral-300'
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-neutral-700/50"></div>
      <button
        onClick={() => setLocale('mn')}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 relative ${
          locale === 'mn'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
            : 'text-neutral-400 hover:text-neutral-300'
        }`}
      >
        MN
      </button>
    </div>
  );
}

