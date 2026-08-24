'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/i18n/useTranslation';
import { Sparkles } from 'lucide-react';
import type { AuthUser } from '@/types/auth';

export function GuestBanner() {
  const { isLoggedIn, login } = useAuthStore();
  const t = useTranslation();

  if (isLoggedIn) return null;

  const handleLogin = () => {
    const demoUser: AuthUser = {
      id: 'demo-user-1',
      email: 'demo@example.com',
      name: 'Demo User',
      tier: 'FREE',
    };
    login(demoUser);
  };

  return (
    <div className="mt-4">
      <div className="shadow-nm-inset px-6 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/30 dark:bg-blue-950/10 border border-blue-200/10">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <Sparkles className="size-5 text-blue-500 shrink-0" />
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            {t.guestBanner.message}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="nm-btn-accent text-xs px-4 py-1.5 shrink-0"
        >
          {t.guestBanner.cta}
        </button>
      </div>
    </div>
  );
}
