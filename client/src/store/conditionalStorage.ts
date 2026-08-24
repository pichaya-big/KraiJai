import type { StateStorage } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

export const authAwareStorage: StateStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    if (useAuthStore.getState().isLoggedIn) return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    if (useAuthStore.getState().isLoggedIn) return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};
