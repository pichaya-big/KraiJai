'use client';

import React from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { formatCurrency } from '@/lib/format';
import { X } from 'lucide-react';

interface QrModalProps {
  open: boolean;
  payee: { name: string; amount: number } | null;
  onClose: () => void;
}

export function QrModal({ open, payee, onClose }: QrModalProps) {
  const t = useTranslation();

  if (!open || !payee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="nm-panel p-6 max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800">
        {/* Close */}
        <button
          onClick={onClose}
          className="nm-btn p-1.5 absolute top-4 right-4 text-muted-foreground hover:text-slate-800 dark:hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 mt-2">
          <div className="inline-block px-4 py-1 bg-[#003770] rounded-lg text-white font-bold tracking-wider text-xs mb-2">
            {t.qrModal.promptPay}
          </div>
          <p className="text-xs text-muted-foreground">{t.qrModal.scanPayTo(payee.name)}</p>
        </div>

        {/* QR Mockup Card */}
        <div className="nm-panel-inset p-4 flex flex-col items-center justify-center bg-white mb-6 border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="relative p-1">
            {/* QR SVG */}
            <svg className="size-44 text-[#003770]" viewBox="0 0 100 100" fill="currentColor">
              <rect x="0" y="0" width="20" height="20" />
              <rect x="2" y="2" width="16" height="16" fill="white" />
              <rect x="5" y="5" width="10" height="10" />

              <rect x="80" y="0" width="20" height="20" />
              <rect x="82" y="2" width="16" height="16" fill="white" />
              <rect x="85" y="5" width="10" height="10" />

              <rect x="0" y="80" width="20" height="20" />
              <rect x="2" y="82" width="16" height="16" fill="white" />
              <rect x="5" y="85" width="10" height="10" />

              {/* Dot patterns */}
              <rect x="25" y="3" width="6" height="6" />
              <rect x="35" y="0" width="4" height="4" />
              <rect x="45" y="2" width="8" height="6" />
              <rect x="60" y="0" width="12" height="4" />
              <rect x="30" y="12" width="10" height="4" />
              <rect x="50" y="10" width="6" height="10" />
              <rect x="65" y="8" width="8" height="8" />

              <rect x="0" y="25" width="4" height="12" />
              <rect x="8" y="30" width="10" height="6" />
              <rect x="22" y="25" width="12" height="12" />
              <rect x="40" y="28" width="16" height="4" />
              <rect x="60" y="24" width="8" height="8" />
              <rect x="72" y="28" width="6" height="14" />
              <rect x="85" y="25" width="10" height="4" />

              <rect x="0" y="45" width="8" height="10" />
              <rect x="12" y="48" width="12" height="4" />
              <rect x="28" y="44" width="6" height="12" />
              <rect x="40" y="40" width="14" height="14" />
              <rect x="58" y="44" width="10" height="4" />
              <rect x="80" y="45" width="15" height="8" />

              <rect x="24" y="60" width="14" height="6" />
              <rect x="42" y="62" width="8" height="10" />
              <rect x="56" y="60" width="16" height="4" />
              <rect x="76" y="58" width="6" height="12" />
              <rect x="85" y="64" width="12" height="8" />

              <rect x="25" y="75" width="10" height="10" />
              <rect x="40" y="82" width="14" height="4" />
              <rect x="60" y="76" width="6" height="14" />
              <rect x="72" y="84" width="18" height="6" />

              {/* PromptPay Center */}
              <rect x="42" y="42" width="16" height="16" rx="2" fill="#003770" />
              <circle cx="50" cy="50" r="3.5" fill="white" />
            </svg>
          </div>

          {/* Amount Display */}
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-bold block tracking-wider uppercase">
              {t.qrModal.transferAmount}
            </span>
            <span className="text-xl font-black text-slate-800 font-mono">
              {formatCurrency(payee.amount)} {t.common.baht}
            </span>
          </div>
        </div>

        <div className="text-xs space-y-2 text-center text-slate-700 dark:text-slate-350">
          <p>
            {t.qrModal.receiver}: <strong className="text-slate-800 dark:text-slate-100">{payee.name}</strong>
          </p>
          <p className="text-[10px] text-muted-foreground text-center">{t.qrModal.hint}</p>
        </div>

        <div className="mt-5">
          <button type="button" onClick={onClose} className="nm-btn w-full py-2 font-bold text-xs">
            {t.qrModal.done}
          </button>
        </div>
      </div>
    </div>
  );
}
