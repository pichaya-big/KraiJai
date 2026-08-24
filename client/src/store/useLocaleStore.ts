'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Locale = 'th' | 'en';

interface LocaleState {
  locale: Locale;
}

interface LocaleActions {
  setLocale: (locale: Locale) => void;
}

const initialState: LocaleState = {
  locale: 'th',
};

export const useLocaleStore = create<LocaleState & LocaleActions>()(
  persist(
    (set) => ({
      ...initialState,
      setLocale: (locale: Locale) => {
        set({ locale });
      },
    }),
    {
      name: 'kraijai-locale',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
