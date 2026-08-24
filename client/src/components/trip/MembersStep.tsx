'use client';

import React, { useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useTranslation } from '@/i18n/useTranslation';
import { Plus, Trash2 } from 'lucide-react';
import { getInitials, getAvatarColor } from '@/lib/avatar';

interface MembersStepProps {
  showToast: (msg: string) => void;
}

export function MembersStep({ showToast }: MembersStepProps) {
  const t = useTranslation();
  const { participants, addParticipant, removeParticipant } = useTripStore();
  const [friendName, setFriendName] = useState('');

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;
    addParticipant(friendName.trim());
    setFriendName('');
    showToast(t.toast.added(friendName.trim()));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="nm-panel px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">👥</span>
          </div>
          <h2 className="text-lg font-bold">{t.members.groupMembers}</h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{t.wizard.membersStepHint}</p>

        {/* Add Friend Form */}
        <form onSubmit={handleAddFriend} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.members.addFriendPlaceholder}
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="nm-input flex-1"
              autoFocus
            />
            <button
              type="submit"
              className="nm-btn-accent px-4 py-2 flex items-center gap-2 text-sm font-semibold shrink-0"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">{t.members.add}</span>
            </button>
          </div>
        </form>

        {/* Participants List */}
        {participants.length === 0 ? (
          <div className="nm-panel-inset p-6 text-center rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {t.members.noParticipants}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {participants.map((participant, idx) => (
              <div
                key={participant.id}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/20 border border-slate-200/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarColor(idx)}`}
                  >
                    {getInitials(participant.name)}
                  </div>
                  <span className="font-medium text-slate-850 dark:text-slate-100">
                    {participant.name}
                  </span>
                </div>
                <button
                  onClick={() => removeParticipant(participant.id)}
                  title={t.members.removeFriend(participant.name)}
                  className="nm-btn p-1.5 text-red-500 hover:text-red-600 dark:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
