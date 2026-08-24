'use client';

import { useEffect } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useLocaleStore } from '@/store/useLocaleStore';

export function StoreHydration() {
  useEffect(() => {
    useTripStore.persist.rehydrate();
    useLocaleStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const locale = useLocaleStore.getState().locale;
    document.documentElement.lang = locale;
  }, []);

  useEffect(() => {
    const unsubscribe = useLocaleStore.subscribe((state) => {
      document.documentElement.lang = state.locale;
    });
    return unsubscribe;
  }, []);

  return null;
}
