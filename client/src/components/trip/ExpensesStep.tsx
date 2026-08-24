'use client';

import React, { useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useTranslation } from '@/i18n/useTranslation';
import { formatCurrency } from '@/lib/format';
import { Plus, Trash2, ShoppingBag } from 'lucide-react';
import { getInitials, getAvatarColor } from '@/lib/avatar';

interface ExpensesStepProps {
  showToast: (msg: string) => void;
}

export function ExpensesStep({ showToast }: ExpensesStepProps) {
  const t = useTranslation();
  const {
    participants,
    stops,
    addStop,
    removeStop,
    toggleStopParticipant,
    setStopPayer,
  } = useTripStore();

  const [stopName, setStopName] = useState('');
  const [stopAmount, setStopAmount] = useState('');
  const [stopPayerId, setStopPayerId] = useState('');

  const totalTripCost = stops.reduce((sum, s) => sum + s.totalAmount, 0);

  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stopName.trim() || !stopAmount || participants.length === 0) return;

    const amount = parseFloat(stopAmount);
    if (isNaN(amount) || amount <= 0) return;

    const defaultParticipantIds = participants.map((p) => p.id);
    const payer = stopPayerId || participants[0]?.id || null;

    addStop({
      title: stopName.trim(),
      totalAmount: amount,
      paidByParticipantId: payer,
      participantIds: defaultParticipantIds,
    });

    setStopName('');
    setStopAmount('');
    showToast(t.toast.added(stopName.trim()));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Streamlined Add Expense Bar */}
      <form
        onSubmit={handleAddStop}
        className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center bg-slate-100/40 dark:bg-slate-900/10 p-2 rounded-xl border border-slate-200/20 mb-6"
      >
        <input
          type="text"
          value={stopName}
          onChange={(e) => setStopName(e.target.value)}
          placeholder={t.addStopForm.placeholder}
          className="nm-input border-0 flex-1 py-1.5 text-sm"
          required
        />
        <div className="flex gap-2 items-center">
          <input
            type="number"
            step="any"
            value={stopAmount}
            onChange={(e) => setStopAmount(e.target.value)}
            placeholder={t.addStopForm.amountPlaceholder}
            className="nm-input border-0 w-24 py-1.5 text-sm"
            required
          />
          <select
            value={stopPayerId}
            onChange={(e) => setStopPayerId(e.target.value)}
            className="nm-input border-0 w-32 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="">{t.addStopForm.payerPlaceholder}</option>
            {participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="nm-btn-accent h-9 w-9 p-0 flex items-center justify-center shrink-0"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </form>

      {/* THE EXPENSES RECEIPT SHEET */}
      <div className="receipt-sheet p-6">
        <div className="flex justify-between text-slate-300 dark:text-slate-700 tracking-widest text-[9px] select-none mb-4">
          <span>* * * * * * * * * * * * * * * * * * * * * * * * * *</span>
        </div>

        <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 mb-4 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.receipt.tripStops}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            {t.receipt.total}: {formatCurrency(totalTripCost)} {t.common.baht}
          </span>
        </div>

        {stops.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <ShoppingBag className="size-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
            <p className="text-xs">{t.receipt.noExpenses}</p>
            <p className="text-[11px] mt-1 text-slate-400">{t.receipt.logStopsAbove}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {stops.map((stop) => {
              const numParticipants = stop.participantIds.length;
              const shareCost =
                numParticipants > 0 ? stop.totalAmount / numParticipants : 0;
              const payerName =
                participants.find((p) => p.id === stop.paidByParticipantId)?.name ||
                'Unassigned';

              return (
                <div key={stop.id} className="py-4 flex flex-col gap-3 group/item">
                  {/* Stop Title, Payer, Price Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 block truncate">
                        {stop.title}
                      </span>

                      {/* Inline Payer Selector */}
                      <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                        {t.receipt.paidBy}:
                        <select
                          value={stop.paidByParticipantId || ''}
                          onChange={(e) => setStopPayer(stop.id, e.target.value || null)}
                          className="bg-transparent text-[10px] text-blue-600 dark:text-blue-400 font-bold outline-none cursor-pointer border-b border-dashed border-blue-400 hover:border-solid py-0.5"
                        >
                          <option value="" disabled>
                            {t.receipt.choosePayer}
                          </option>
                          {participants.map((p) => (
                            <option
                              key={p.id}
                              value={p.id}
                              className="text-slate-850 dark:text-slate-150 bg-background"
                            >
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 font-mono">
                        {formatCurrency(stop.totalAmount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStop(stop.id)}
                        className="text-red-400 hover:text-red-600 dark:text-red-500 opacity-80 md:opacity-0 group-hover/item:opacity-100 transition-opacity p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                        title={t.receipt.removeStop}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Overlapping Avatars for Splits Selection */}
                  <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/40 pt-2">
                    <span className="text-[10px] font-medium text-slate-400">
                      {numParticipants > 0
                        ? t.receipt.split(formatCurrency(shareCost), numParticipants)
                        : t.receipt.selectParticipants}
                    </span>

                    {participants.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        {/* Overlapping Avatars */}
                        <div className="flex -space-x-1.5 hover:space-x-0.5 transition-all duration-200">
                          {participants.map((friend, idx) => {
                            const isAssigned = stop.participantIds.includes(
                              friend.id
                            );
                            const avatarColor = getAvatarColor(idx);

                            return (
                              <button
                                key={friend.id}
                                type="button"
                                onClick={() =>
                                  toggleStopParticipant(stop.id, friend.id)
                                }
                                className={`size-6 rounded-full text-[10px] font-bold flex items-center justify-center border transition-all select-none cursor-pointer ${
                                  isAssigned
                                    ? `${avatarColor} border-white dark:border-slate-950 scale-105 shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-10`
                                    : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-400 hover:bg-slate-200'
                                }`}
                                title={t.receipt.toggle(friend.name)}
                              >
                                {getInitials(friend.name)}
                              </button>
                            );
                          })}
                        </div>

                        {/* All/Clear shortcuts */}
                        <div className="flex gap-1 pl-1.5 border-l border-slate-200 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={() => {
                              participants.forEach((p) => {
                                if (
                                  !stop.participantIds.includes(p.id)
                                ) {
                                  toggleStopParticipant(stop.id, p.id);
                                }
                              });
                            }}
                            className="text-[9px] font-bold text-blue-500 hover:text-blue-600 px-1 rounded hover:bg-slate-100 dark:hover:bg-slate-850"
                          >
                            {t.receipt.all}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              stop.participantIds.forEach((pId) =>
                                toggleStopParticipant(stop.id, pId)
                              );
                            }}
                            className="text-[9px] font-bold text-slate-400 hover:text-slate-500 px-1 rounded hover:bg-slate-100 dark:hover:bg-slate-850"
                          >
                            {t.receipt.clear}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-amber-500 italic">
                        {t.receipt.addFriendsToAssign}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-between text-slate-300 dark:text-slate-700 tracking-widest text-[9px] select-none mt-6 border-t border-dashed border-slate-200 dark:border-slate-800 pt-4">
          <span>* * * * * * * * * * * * * * * * * * * * * * * * * *</span>
        </div>
      </div>
    </div>
  );
}
