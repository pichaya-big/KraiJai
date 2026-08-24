import type { TripParticipant, TripStop } from '@/types/trip';

export interface ParticipantBalance {
  participantId: string;
  fronted: number;
  owed: number;
  netBalance: number;
}

export interface Transaction {
  fromParticipantId: string;
  toParticipantId: string;
  amount: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateBalances(
  participants: TripParticipant[],
  stops: TripStop[]
): ParticipantBalance[] {
  const fronted: Record<string, number> = {};
  const owed: Record<string, number> = {};

  participants.forEach((p) => {
    fronted[p.id] = 0;
    owed[p.id] = 0;
  });

  stops.forEach((stop) => {
    const numParticipants = stop.participantIds.length;

    // Skip stops with no participants (incomplete stops)
    if (numParticipants === 0) {
      return;
    }

    const share = stop.totalAmount / numParticipants;

    stop.participantIds.forEach((pId) => {
      owed[pId] = (owed[pId] || 0) + share;
    });

    if (stop.paidByParticipantId !== null) {
      fronted[stop.paidByParticipantId] = (fronted[stop.paidByParticipantId] || 0) + stop.totalAmount;
    }
  });

  return participants.map((p) => ({
    participantId: p.id,
    fronted: round2(fronted[p.id] || 0),
    owed: round2(owed[p.id] || 0),
    netBalance: round2((fronted[p.id] || 0) - (owed[p.id] || 0)),
  }));
}

export function simplifyDebts(balances: ParticipantBalance[]): Transaction[] {
  // Greedy min-cash-flow algorithm: repeatedly match largest debtor with largest creditor
  // Note: this is a heuristic, not a globally optimal solution (that would be NP-hard)
  const EPSILON = 0.01;

  const debtors = balances
    .filter((b) => b.netBalance < -EPSILON)
    .sort((a, b) => a.netBalance - b.netBalance)
    .map((b) => ({ ...b }));

  const creditors = balances
    .filter((b) => b.netBalance > EPSILON)
    .sort((a, b) => b.netBalance - a.netBalance)
    .map((b) => ({ ...b }));

  const transactions: Transaction[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = round2(Math.min(-debtor.netBalance, creditor.netBalance));

    if (amount > EPSILON) {
      transactions.push({
        fromParticipantId: debtor.participantId,
        toParticipantId: creditor.participantId,
        amount,
      });

      debtor.netBalance += amount;
      creditor.netBalance -= amount;
    }

    if (Math.abs(debtor.netBalance) < EPSILON) {
      i++;
    }
    if (Math.abs(creditor.netBalance) < EPSILON) {
      j++;
    }
  }

  return transactions;
}

export function computeSettlement(participants: TripParticipant[], stops: TripStop[]) {
  const balances = calculateBalances(participants, stops);
  const transactions = simplifyDebts(balances);

  return { balances, transactions };
}
