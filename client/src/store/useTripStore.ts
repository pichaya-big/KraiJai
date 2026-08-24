'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authAwareStorage } from './conditionalStorage';
import { useMemo } from 'react';
import type { TripState, TripParticipant, TripStop } from '@/types/trip';
import { computeSettlement } from '@/lib/settlement';

interface TripActions {
  setTripTitle: (title: string) => void;
  addParticipant: (name: string) => void;
  removeParticipant: (participantId: string) => void;
  addStop: (input: {
    title: string;
    totalAmount: number;
    participantIds: string[];
    paidByParticipantId: string | null;
  }) => void;
  removeStop: (stopId: string) => void;
  updateStop: (
    stopId: string,
    patch: Partial<Pick<TripStop, 'title' | 'totalAmount'>>
  ) => void;
  toggleStopParticipant: (stopId: string, participantId: string) => void;
  setStopPayer: (stopId: string, participantId: string | null) => void;
  resetTrip: () => void;
}

const initialTripState: TripState = {
  tripId: null,
  title: 'New Trip',
  participants: [],
  stops: [],
};

export const useTripStore = create<TripState & TripActions>()(
  persist(
    (set, get) => ({
      ...initialTripState,
      setTripTitle: (title) => {
        set({ title });
      },
      addParticipant: (name) => {
        const newParticipant: TripParticipant = {
          id: crypto.randomUUID(),
          name,
        };
        set((state) => ({
          participants: [...state.participants, newParticipant],
        }));
      },
      removeParticipant: (participantId) => {
        set((state) => ({
          participants: state.participants.filter((p) => p.id !== participantId),
          stops: state.stops.map((stop) => ({
            ...stop,
            participantIds: stop.participantIds.filter((id) => id !== participantId),
            paidByParticipantId:
              stop.paidByParticipantId === participantId ? null : stop.paidByParticipantId,
          })),
        }));
      },
      addStop: (input) => {
        const newStop: TripStop = {
          id: crypto.randomUUID(),
          title: input.title,
          totalAmount: input.totalAmount,
          paidByParticipantId: input.paidByParticipantId,
          participantIds: input.participantIds,
        };
        set((state) => ({
          stops: [...state.stops, newStop],
        }));
      },
      removeStop: (stopId) => {
        set((state) => ({
          stops: state.stops.filter((stop) => stop.id !== stopId),
        }));
      },
      updateStop: (stopId, patch) => {
        set((state) => ({
          stops: state.stops.map((stop) =>
            stop.id === stopId ? { ...stop, ...patch } : stop
          ),
        }));
      },
      toggleStopParticipant: (stopId, participantId) => {
        set((state) => ({
          stops: state.stops.map((stop) => {
            if (stop.id === stopId) {
              const isAssigned = stop.participantIds.includes(participantId);
              return {
                ...stop,
                participantIds: isAssigned
                  ? stop.participantIds.filter((id) => id !== participantId)
                  : [...stop.participantIds, participantId],
              };
            }
            return stop;
          }),
        }));
      },
      setStopPayer: (stopId, participantId) => {
        set((state) => ({
          stops: state.stops.map((stop) =>
            stop.id === stopId ? { ...stop, paidByParticipantId: participantId } : stop
          ),
        }));
      },
      resetTrip: () => {
        set(initialTripState);
      },
    }),
    {
      name: 'kraijai-trip-storage',
      storage: createJSONStorage(() => authAwareStorage),
      skipHydration: true,
      partialize: (state) => ({
        tripId: state.tripId,
        title: state.title,
        participants: state.participants,
        stops: state.stops,
      }),
    }
  )
);

export function useTripSettlement() {
  const participants = useTripStore((s) => s.participants);
  const stops = useTripStore((s) => s.stops);
  return useMemo(() => computeSettlement(participants, stops), [participants, stops]);
}
