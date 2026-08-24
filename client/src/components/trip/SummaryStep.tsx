'use client';

import React from 'react';
import { useTripStore, useTripSettlement } from '@/store/useTripStore';
import { useTranslation } from '@/i18n/useTranslation';
import { formatCurrency } from '@/lib/format';
import { QrCode, Copy, Share2, DollarSign, X } from 'lucide-react';
import { getInitials, getAvatarColor } from '@/lib/avatar';

interface SummaryStepProps {
  showToast: (msg: string) => void;
  onOpenQr: (payeeName: string, amount: number) => void;
}

export function SummaryStep({ showToast, onOpenQr }: SummaryStepProps) {
  const t = useTranslation();
  const { participants, stops, removeParticipant } = useTripStore();
  const { balances, transactions } = useTripSettlement();

  const totalTripCost = stops.reduce((sum, s) => sum + s.totalAmount, 0);

  const copyShareText = (pName: string, amount: number, toName: string) => {
    const text = t.shareText.transferDetails(pName, toName, formatCurrency(amount));
    navigator.clipboard.writeText(text);
    showToast(t.toast.copiedTransferDetails(pName));
  };

  const copyEntireTripSummary = () => {
    const balanceData = balances.map((b) => {
      const name = participants.find((p) => p.id === b.participantId)?.name || 'Unknown';
      const status =
        b.netBalance > 0
          ? `+${formatCurrency(b.netBalance)}`
          : b.netBalance < 0
            ? formatCurrency(Math.abs(b.netBalance))
            : '0.00';
      return {
        name,
        status,
        fronted: formatCurrency(b.fronted),
        owed: formatCurrency(b.owed),
      };
    });

    const transactionData = transactions.map((t) => ({
      from: participants.find((p) => p.id === t.fromParticipantId)?.name || 'Unknown',
      to: participants.find((p) => p.id === t.toParticipantId)?.name || 'Unknown',
      amount: formatCurrency(t.amount),
    }));

    const title = 'Trip';
    const text = t.shareText.tripSummary(
      title,
      formatCurrency(totalTripCost),
      balanceData,
      transactionData,
      transactions.length === 0
    );

    navigator.clipboard.writeText(text);
    showToast(t.toast.copiedSummary);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="nm-panel p-5 space-y-6">
        {/* Empty State */}
        {stops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
              {t.wizard.noExpensesYetSummary}
            </p>
            <p className="text-xs text-slate-400">{t.wizard.expensesStepHint}</p>
          </div>
        ) : (
          <>
            {/* Balances List */}
            {participants.length === 0 ? (
              <div className="text-center py-6 text-slate-400 dark:text-slate-600 shadow-nm-inset-sm rounded-xl p-4 bg-slate-50/10">
                <p className="text-xs">{t.members.noParticipants}</p>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-3">
                  {t.members.groupMembers}
                </h3>
                <div className="space-y-3">
                  {balances.map((b, idx) => {
                    const p = participants.find((part) => part.id === b.participantId);
                    if (!p) return null;

                    const avatarColor = getAvatarColor(idx);
                    const isOwed = b.netBalance > 0;
                    const owesMoney = b.netBalance < 0;

                    return (
                      <div
                        key={b.participantId}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/30 dark:bg-slate-900/10 border border-slate-200/10 hover:border-slate-200/40 transition-all group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`size-7 rounded-full text-xs font-black flex items-center justify-center ${avatarColor} shrink-0`}
                          >
                            {getInitials(p.name)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block truncate">
                                {p.name}
                              </span>
                              <button
                                onClick={() => removeParticipant(p.id)}
                                className="text-red-400 hover:text-red-600 dark:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105 p-0.5"
                                title={t.members.removeFriend(p.name)}
                              >
                                <X className="size-3" />
                              </button>
                            </div>

                            <span className="text-[9px] text-slate-400 dark:text-slate-500 block truncate">
                              {t.members.paid}: {formatCurrency(b.fronted)} | {t.members.share}:{' '}
                              {formatCurrency(b.owed)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`text-xs font-black font-mono block ${
                              isOwed
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : owesMoney
                                  ? 'text-rose-500'
                                  : 'text-slate-400'
                            }`}
                          >
                            {isOwed ? `+${formatCurrency(b.netBalance)}` : formatCurrency(b.netBalance)}{' '}
                            {t.common.baht}
                          </span>
                          <span className="text-[8px] text-slate-450 dark:text-slate-500 block">
                            {isOwed
                              ? t.members.getsBack
                              : owesMoney
                                ? t.members.owesMoney
                                : t.members.settled}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Settle Transfers / Transactions Card */}
            <div className="border-t border-slate-250/20 pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-emerald-500" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  {t.settle.settleDebts}
                </h3>
              </div>

              {transactions.length === 0 ? (
                <div className="p-4 text-center rounded-xl bg-green-500/5 border border-green-500/10 text-green-600 dark:text-green-400/80 text-[11px] font-semibold leading-relaxed">
                  {t.settle.allSettled}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {transactions.map((tx, idx) => {
                    const fromName =
                      participants.find((p) => p.id === tx.fromParticipantId)?.name ||
                      'Unknown';
                    const toName =
                      participants.find((p) => p.id === tx.toParticipantId)?.name ||
                      'Unknown';

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      >
                        <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          <strong className="text-slate-850 dark:text-slate-100">{fromName}</strong>
                          <span className="text-slate-450 mx-1">{t.settle.pays}</span>
                          <strong className="text-slate-850 dark:text-slate-100">{toName}</strong>
                          <div className="font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-0.5 text-sm">
                            {formatCurrency(tx.amount)} {t.common.baht}
                          </div>
                        </div>

                        <div className="flex gap-1.5 w-full sm:w-auto">
                          <button
                            onClick={() => onOpenQr(toName, tx.amount)}
                            className="nm-btn flex-1 sm:flex-none py-1 px-2.5 text-[10px] font-bold text-blue-500 gap-1 active:scale-95 cursor-pointer"
                          >
                            <QrCode className="size-3.5" />
                            <span>{t.settle.scanQr}</span>
                          </button>
                          <button
                            onClick={() => copyShareText(fromName, tx.amount, toName)}
                            className="nm-btn p-1 text-slate-500"
                            title={t.settle.copyShareDesc}
                          >
                            <Copy className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Summary details */}
            <div className="border-t border-slate-250/20 pt-4 space-y-3">
              <button
                onClick={copyEntireTripSummary}
                className="nm-btn-accent w-full py-2 flex items-center justify-center gap-2 text-xs font-bold"
                disabled={stops.length === 0}
              >
                <Share2 className="size-3.5" />
                {t.settle.copyFullSummary}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
