'use client';

import { useLocaleStore, type Locale } from '@/store/useLocaleStore';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="flex p-0.5 rounded-full shadow-nm-inset bg-slate-200/30 dark:bg-slate-900/10">
      <button
        onClick={() => setLocale('th')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          locale === 'th'
            ? 'shadow-nm-flat bg-background text-blue-600 dark:text-blue-400'
            : 'text-muted-foreground hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        ไทย
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          locale === 'en'
            ? 'shadow-nm-flat bg-background text-blue-600 dark:text-blue-400'
            : 'text-muted-foreground hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
