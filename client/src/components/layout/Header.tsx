'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '@/i18n/useTranslation';

export function Header() {
  const t = useTranslation();

  return (
    <header className="py-4 px-4 md:px-8 w-full max-w-[100vw] mx-auto transition-all duration-300">
      <div className="nm-panel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            KraiJai
          </h1>
          <span className="shadow-nm-inset-sm px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            {t.header.guestMode}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
