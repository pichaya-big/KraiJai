'use client';

import { useLocaleStore } from '@/store/useLocaleStore';
import { th } from './th';
import { en } from './en';
import type { Translations } from './types';

export function useTranslation(): Translations {
  const locale = useLocaleStore((s) => s.locale);
  return locale === 'th' ? th : en;
}
